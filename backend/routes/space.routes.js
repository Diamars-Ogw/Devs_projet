// routes/space.routes.js
import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

router.use(authenticateToken);

// ============================================
// LISTE DES MATIÈRES
// ============================================

router.get("/matieres", async (req, res, next) => {
  try {
    const matieres = await prisma.matiere.findMany({
      orderBy: {
        nom: "asc",
      },
    });

    res.json({
      total: matieres.length,
      matieres,
    });
  } catch (error) {
    next(error);
  }
});

// ============================================
// CRÉER UNE MATIÈRE (Directeur)
// ============================================

router.post(
  "/matieres",
  authorizeRoles("DIRECTEUR"),
  async (req, res, next) => {
    try {
      const { nom, code, description, nombreCredits } = req.body;

      if (!nom || !code) {
        return res.status(400).json({
          error: "Nom et code requis",
        });
      }

      const matiere = await prisma.matiere.create({
        data: {
          nom,
          code: code.toUpperCase(),
          description,
          nombreCredits: nombreCredits ? parseInt(nombreCredits) : 0,
        },
      });

      res.status(201).json({
        message: "Matière créée avec succès",
        matiere,
      });
    } catch (error) {
      next(error);
    }
  },
);

// ============================================
// LISTE DES ESPACES PÉDAGOGIQUES
// ============================================

router.get("/", async (req, res, next) => {
  try {
    const { role, userId } = req.user;
    const { promotionId, estActif } = req.query;

    let where = {};

    // Filtrer selon le rôle
    if (role === "FORMATEUR") {
      const formateur = await prisma.formateur.findUnique({
        where: { compteId: userId },
      });

      if (!formateur) {
        return res.status(404).json({ error: "Profil formateur non trouvé" });
      }

      where.OR = [
        { formateurId: formateur.id },
        { formateursSecondaires: { some: { formateurId: formateur.id } } },
      ];
    } else if (role === "ETUDIANT") {
      const etudiant = await prisma.etudiant.findUnique({
        where: { compteId: userId },
      });

      if (!etudiant) {
        return res.status(404).json({ error: "Profil étudiant non trouvé" });
      }

      where.inscriptions = {
        some: { etudiantId: etudiant.id },
      };
    }

    // Filtres supplémentaires
    if (promotionId) {
      where.promotionId = parseInt(promotionId);
    }
    if (estActif !== undefined) {
      where.estActif = estActif === "true";
    }

    const espaces = await prisma.espacePedagogique.findMany({
      where,
      include: {
        promotion: true,
        matiere: true,
        formateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            specialite: true,
          },
        },
        formateursSecondaires: {
          include: {
            formateur: {
              select: {
                id: true,
                nom: true,
                prenom: true,
              },
            },
          },
        },
        _count: {
          select: {
            inscriptions: true,
            travaux: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      total: espaces.length,
      espaces: espaces.map((e) => ({
        ...e,
        nombreInscrits: e._count.inscriptions,
        nombreTravaux: e._count.travaux,
      })),
    });
  } catch (error) {
    next(error);
  }
});

// ============================================
// CRÉER UN ESPACE PÉDAGOGIQUE (Directeur)
// ============================================

router.post("/", authorizeRoles("DIRECTEUR"), async (req, res, next) => {
  try {
    const {
      nom,
      promotionId,
      matiereId,
      formateurId,
      description,
      semestre,
      volumeHoraireTotal,
      dateDebut,
      dateFin,
      formateursSecondaires,
    } = req.body;

    if (!nom || !promotionId || !matiereId || !formateurId) {
      return res.status(400).json({
        error: "Nom, promotion, matière et formateur principal requis",
      });
    }

    const espace = await prisma.$transaction(async (tx) => {
      // Créer l'espace
      const newEspace = await tx.espacePedagogique.create({
        data: {
          nom,
          promotionId: parseInt(promotionId),
          matiereId: parseInt(matiereId),
          formateurId: parseInt(formateurId),
          description,
          semestre: semestre ? parseInt(semestre) : null,
          volumeHoraireTotal: volumeHoraireTotal
            ? parseInt(volumeHoraireTotal)
            : null,
          dateDebut: dateDebut ? new Date(dateDebut) : null,
          dateFin: dateFin ? new Date(dateFin) : null,
          estActif: true,
        },
      });

      // Ajouter les formateurs secondaires si fournis
      if (formateursSecondaires && Array.isArray(formateursSecondaires)) {
        await Promise.all(
          formateursSecondaires.map((formateurSecId) =>
            tx.formateurSecondaire.create({
              data: {
                espacePedagogiqueId: newEspace.id,
                formateurId: parseInt(formateurSecId),
              },
            }),
          ),
        );
      }

      return newEspace;
    });

    res.status(201).json({
      message: "Espace pédagogique créé avec succès",
      espace,
    });
  } catch (error) {
    next(error);
  }
});

// ============================================
// DÉTAILS D'UN ESPACE PÉDAGOGIQUE
// ============================================

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const espace = await prisma.espacePedagogique.findUnique({
      where: { id: parseInt(id) },
      include: {
        promotion: true,
        matiere: true,
        formateur: true,
        formateursSecondaires: {
          include: {
            formateur: true,
          },
        },
        inscriptions: {
          include: {
            etudiant: {
              include: {
                compte: {
                  select: {
                    email: true,
                    estActif: true,
                  },
                },
              },
            },
          },
        },
        travaux: {
          where: { estActif: true },
          orderBy: { dateDebut: "desc" },
        },
      },
    });

    if (!espace) {
      return res.status(404).json({
        error: "Espace pédagogique non trouvé",
      });
    }

    res.json(espace);
  } catch (error) {
    next(error);
  }
});

// ============================================
// MODIFIER UN ESPACE PÉDAGOGIQUE (Directeur)
// ============================================

router.put("/:id", authorizeRoles("DIRECTEUR"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      nom,
      promotionId,
      matiereId,
      formateurId,
      description,
      semestre,
      volumeHoraireTotal,
      dateDebut,
      dateFin,
      estActif,
      formateursSecondaires,
    } = req.body;

    const espace = await prisma.$transaction(async (tx) => {
      const updated = await tx.espacePedagogique.update({
        where: { id: parseInt(id) },
        data: {
          ...(nom && { nom }),
          ...(promotionId && { promotionId: parseInt(promotionId) }),
          ...(matiereId && { matiereId: parseInt(matiereId) }),
          ...(formateurId && { formateurId: parseInt(formateurId) }),
          ...(description !== undefined && { description }),
          ...(semestre !== undefined && {
            semestre: semestre ? parseInt(semestre) : null,
          }),
          ...(volumeHoraireTotal !== undefined && {
            volumeHoraireTotal: volumeHoraireTotal
              ? parseInt(volumeHoraireTotal)
              : null,
          }),
          ...(dateDebut && { dateDebut: new Date(dateDebut) }),
          ...(dateFin && { dateFin: new Date(dateFin) }),
          ...(estActif !== undefined && { estActif }),
        },
      });

      // Mettre à jour les formateurs secondaires si fournis
      if (
        formateursSecondaires !== undefined &&
        Array.isArray(formateursSecondaires)
      ) {
        // Supprimer les anciens
        await tx.formateurSecondaire.deleteMany({
          where: { espacePedagogiqueId: parseInt(id) },
        });

        // Ajouter les nouveaux
        if (formateursSecondaires.length > 0) {
          await Promise.all(
            formateursSecondaires.map((formateurSecId) =>
              tx.formateurSecondaire.create({
                data: {
                  espacePedagogiqueId: parseInt(id),
                  formateurId: parseInt(formateurSecId),
                },
              }),
            ),
          );
        }
      }

      return updated;
    });

    res.json({
      message: "Espace pédagogique modifié avec succès",
      espace,
    });
  } catch (error) {
    next(error);
  }
});

// ============================================
// SUPPRIMER UN ESPACE PÉDAGOGIQUE (Directeur)
// ============================================

router.delete("/:id", authorizeRoles("DIRECTEUR"), async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.espacePedagogique.delete({
      where: { id: parseInt(id) },
    });

    res.json({
      message: "Espace pédagogique supprimé avec succès",
    });
  } catch (error) {
    next(error);
  }
});

// ============================================
// INSCRIRE DES ÉTUDIANTS (Directeur)
// ============================================

router.post(
  "/:id/enroll",
  authorizeRoles("DIRECTEUR"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { etudiantIds } = req.body;

      if (!etudiantIds || !Array.isArray(etudiantIds)) {
        return res.status(400).json({
          error: "Liste d'IDs étudiants requise",
        });
      }

      // Vérifier que l'espace existe
      const espace = await prisma.espacePedagogique.findUnique({
        where: { id: parseInt(id) },
      });

      if (!espace) {
        return res.status(404).json({
          error: "Espace pédagogique non trouvé",
        });
      }

      // Inscrire les étudiants
      const inscriptions = await prisma.$transaction(
        etudiantIds.map(
          (etudiantId) =>
            prisma.inscriptionEtudiant
              .create({
                data: {
                  espacePedagogiqueId: parseInt(id),
                  etudiantId: parseInt(etudiantId),
                },
              })
              .catch(() => null), // Ignorer les doublons
        ),
      );

      const successCount = inscriptions.filter((i) => i !== null).length;

      res.json({
        message: `${successCount} étudiant(s) inscrit(s) avec succès`,
        inscriptions: inscriptions.filter((i) => i !== null),
      });
    } catch (error) {
      next(error);
    }
  },
);

// ============================================
// DÉSINSCRIRE UN ÉTUDIANT (Directeur)
// ============================================

router.delete(
  "/:id/unenroll/:etudiantId",
  authorizeRoles("DIRECTEUR"),
  async (req, res, next) => {
    try {
      const { id, etudiantId } = req.params;

      await prisma.inscriptionEtudiant.deleteMany({
        where: {
          espacePedagogiqueId: parseInt(id),
          etudiantId: parseInt(etudiantId),
        },
      });

      res.json({
        message: "Étudiant désinscrit avec succès",
      });
    } catch (error) {
      next(error);
    }
  },
);

// ============================================
// LISTE DES ÉTUDIANTS DISPONIBLES POUR INSCRIPTION
// ============================================

router.get(
  "/:id/available-students",
  authorizeRoles("DIRECTEUR"),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const espace = await prisma.espacePedagogique.findUnique({
        where: { id: parseInt(id) },
        include: {
          inscriptions: {
            select: { etudiantId: true },
          },
        },
      });

      if (!espace) {
        return res.status(404).json({
          error: "Espace pédagogique non trouvé",
        });
      }

      const inscritsIds = espace.inscriptions.map((i) => i.etudiantId);

      const etudiants = await prisma.etudiant.findMany({
        where: {
          promotionId: espace.promotionId,
          id: {
            notIn: inscritsIds,
          },
          compte: {
            estActif: true,
          },
        },
        include: {
          compte: {
            select: {
              email: true,
            },
          },
        },
      });

      res.json({
        total: etudiants.length,
        etudiants,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
