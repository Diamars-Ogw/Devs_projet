// ============================================
// CRÉATION D'UTILISATEUR - PAGE COMPLÈTE
// Version connectée au backend NestJS
// ============================================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Mail,
  User,
  Phone,
  GraduationCap,
  Award,
  Building,
} from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

import { GRADES_FORMATEUR, GENRES } from "@/utils/constants";
import userService from "@/services/user.service";
import promotionService from "@/services/promotion.service";
import { SUCCESS_MESSAGES } from "@/utils/constants";

const CreateUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [promotions, setPromotions] = useState([]);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    role: "ETUDIANT",
    telephone: "",

    // Étudiant
    matricule: "",
    promotion_id: "",
    date_naissance: "",
    genre: "",
    annee_inscription: new Date().getFullYear(),

    // Formateur
    specialite: "",
    grade: "",
    departement: "",
    bureau: "",

    // Technicien
    service: "",
    poste: "",
    permissions_speciales: "",
  });

  // Charger les promotions au montage
  useEffect(() => {
    const loadPromotions = async () => {
      try {
        const data = await promotionService.getAll();
        setPromotions(data);
      } catch (error) {
        console.error("Erreur chargement promotions:", error);
      }
    };
    loadPromotions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";

    if (formData.role === "ETUDIANT") {
      if (!formData.matricule) newErrors.matricule = "Matricule requis";
      if (!formData.promotion_id) newErrors.promotion_id = "Promotion requise";
    }

    if (formData.role === "FORMATEUR") {
      if (!formData.specialite)
        newErrors.specialite = "Spécialité requise";
    }

    if (formData.role === "TECHNICIEN") {
      if (!formData.service) newErrors.service = "Service requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // Préparer les données selon le rôle
      const dataToSend = {
        email: formData.email,
        role: formData.role,
        nom: formData.nom,
        prenom: formData.prenom,
        telephone: formData.telephone,
      };

      // Ajouter les champs spécifiques selon le rôle
      if (formData.role === "ETUDIANT") {
        dataToSend.matricule = formData.matricule;
        dataToSend.promotion_id = parseInt(formData.promotion_id);
        dataToSend.date_naissance = formData.date_naissance;
        dataToSend.genre = formData.genre;
        dataToSend.annee_inscription = parseInt(formData.annee_inscription);
      }

      if (formData.role === "FORMATEUR") {
        dataToSend.specialite = formData.specialite;
        dataToSend.grade = formData.grade;
        dataToSend.departement = formData.departement;
        dataToSend.bureau = formData.bureau;
      }

      if (formData.role === "TECHNICIEN") {
        dataToSend.service = formData.service;
        dataToSend.poste = formData.poste;
        dataToSend.permissions_speciales = formData.permissions_speciales;
      }

      await userService.create(dataToSend);
      alert(SUCCESS_MESSAGES.USER_CREATED);
      navigate("/director/users");
    } catch (error) {
      console.error("Erreur création:", error);
      const errorMessage = error.response?.data?.message || "Erreur lors de la création de l'utilisateur";
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" icon={ArrowLeft} onClick={() => navigate(-1)}>
          Retour
        </Button>
        <h1 className="text-3xl font-bold">Créer un Utilisateur</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card title="Informations de Base">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              error={errors.nom}
              icon={User}
              required
            />
            <Input
              label="Prénom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              error={errors.prenom}
              icon={User}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={Mail}
              required
            />
            <Input
              label="Téléphone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              icon={Phone}
            />

            <Select
              label="Rôle"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={[
                { value: "ETUDIANT", label: "Étudiant" },
                { value: "FORMATEUR", label: "Formateur" },
                { value: "DIRECTEUR", label: "Directeur" },
                { value: "TECHNICIEN", label: "Technicien" },
              ]}
              required
            />
          </div>
        </Card>

        {/* Section Étudiant */}
        {formData.role === "ETUDIANT" && (
          <Card title="Informations Étudiant">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Matricule"
                name="matricule"
                value={formData.matricule}
                onChange={handleChange}
                error={errors.matricule}
                required
              />
              <Select
                label="Promotion"
                name="promotion_id"
                value={formData.promotion_id}
                onChange={handleChange}
                error={errors.promotion_id}
                options={[
                  { value: "", label: "Sélectionner une promotion" },
                  ...promotions.map((p) => ({
                    value: p.id,
                    label: `${p.nom} (${p.code})`,
                  })),
                ]}
                required
              />
              <Input
                label="Date de naissance"
                name="date_naissance"
                type="date"
                value={formData.date_naissance}
                onChange={handleChange}
              />
              <Select
                label="Genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                options={[
                  { value: "", label: "Sélectionner" },
                  ...GENRES,
                ]}
              />
              <Input
                label="Année d'inscription"
                name="annee_inscription"
                type="number"
                value={formData.annee_inscription}
                onChange={handleChange}
              />
            </div>
          </Card>
        )}

        {/* Section Formateur */}
        {formData.role === "FORMATEUR" && (
          <Card title="Informations Formateur">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Spécialité"
                name="specialite"
                value={formData.specialite}
                onChange={handleChange}
                error={errors.specialite}
                icon={GraduationCap}
                required
              />
              <Select
                label="Grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                options={[
                  { value: "", label: "Sélectionner un grade" },
                  ...GRADES_FORMATEUR,
                ]}
                icon={Award}
              />
              <Input
                label="Département"
                name="departement"
                value={formData.departement}
                onChange={handleChange}
                icon={Building}
              />
              <Input
                label="Bureau"
                name="bureau"
                value={formData.bureau}
                onChange={handleChange}
              />
            </div>
          </Card>
        )}

        {/* Section Technicien */}
        {formData.role === "TECHNICIEN" && (
          <Card title="Informations Technicien">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                error={errors.service}
                required
              />
              <Input
                label="Poste"
                name="poste"
                value={formData.poste}
                onChange={handleChange}
              />
              <Input
                label="Permissions spéciales"
                name="permissions_speciales"
                value={formData.permissions_speciales}
                onChange={handleChange}
              />
            </div>
          </Card>
        )}

        {errors.submit && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg">
            {errors.submit}
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Annuler
          </Button>
          <Button type="submit" icon={Save} loading={loading}>
            Créer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;