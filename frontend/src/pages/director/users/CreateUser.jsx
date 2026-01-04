// ============================================
// CRÉATION D'UTILISATEUR - PAGE COMPLÈTE
// Fichier: src/pages/director/users/CreateUser.jsx
// ============================================

import { useState } from "react";
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
import Textarea from "@/components/ui/Textarea";
import {
  ROLES,
  GRADES_FORMATEUR,
  GENRES,
  NIVEAUX_ETUDES,
} from "@/utils/constants";

const CreateUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    role: "ETUDIANT",
    telephone: "",
    // Champs Étudiant
    matricule: "",
    promotion_id: "",
    date_naissance: "",
    genre: "",
    annee_inscription: new Date().getFullYear(),
    // Champs Formateur
    specialite: "",
    grade: "",
    departement: "",
    bureau: "",
    // Champs Technicien
    service: "",
    poste: "",
    permissions_speciales: "",
  });

  const [errors, setErrors] = useState({});

  // Gestion du changement de valeur
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation du formulaire
  const validate = () => {
    const newErrors = {};

    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }

    // Validation selon le rôle
    if (formData.role === "ETUDIANT") {
      if (!formData.matricule.trim())
        newErrors.matricule = "Le matricule est requis";
      if (!formData.promotion_id)
        newErrors.promotion_id = "La promotion est requise";
    }

    if (formData.role === "FORMATEUR") {
      if (!formData.specialite.trim())
        newErrors.specialite = "La spécialité est requise";
    }

    if (formData.role === "TECHNICIEN") {
      if (!formData.service.trim()) newErrors.service = "Le service est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      // TODO: Appel API
      // await userService.create(formData);

      // Simulation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Utilisateur créé:", formData);

      // Redirection vers la liste
      navigate("/director/users");
    } catch (error) {
      console.error("Erreur création:", error);
      setErrors({ submit: "Erreur lors de la création" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center gap-4 animate-slide-up">
        <Button
          variant="ghost"
          onClick={() => navigate("/director/users")}
          icon={ArrowLeft}
        >
          Retour
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Créer un Utilisateur
          </h1>
          <p className="text-gray-600 mt-1">
            Remplissez les informations pour créer un nouveau compte
          </p>
        </div>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations de base */}
        <Card
          title="Informations de Base"
          className="animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              type="tel"
              value={formData.telephone}
              onChange={handleChange}
              icon={Phone}
              placeholder="06 12 34 56 78"
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

        {/* Champs spécifiques ÉTUDIANT */}
        {formData.role === "ETUDIANT" && (
          <Card
            title="Informations Étudiant"
            className="animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Matricule"
                name="matricule"
                value={formData.matricule}
                onChange={handleChange}
                error={errors.matricule}
                placeholder="ETU2024001"
                required
              />

              <Select
                label="Promotion"
                name="promotion_id"
                value={formData.promotion_id}
                onChange={handleChange}
                error={errors.promotion_id}
                options={[
                  { value: "1", label: "Web Dev Full Stack 2024" },
                  { value: "2", label: "Data Science & IA 2024" },
                  { value: "3", label: "DevOps & Cloud 2024" },
                  { value: "4", label: "Mobile Development 2024" },
                ]}
                required
              />

              <Input
                label="Date de Naissance"
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
                options={GENRES}
              />

              <Input
                label="Année d'Inscription"
                name="annee_inscription"
                type="number"
                value={formData.annee_inscription}
                onChange={handleChange}
                min="2020"
                max="2030"
              />
            </div>
          </Card>
        )}

        {/* Champs spécifiques FORMATEUR */}
        {formData.role === "FORMATEUR" && (
          <Card
            title="Informations Formateur"
            className="animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Spécialité"
                name="specialite"
                value={formData.specialite}
                onChange={handleChange}
                error={errors.specialite}
                icon={GraduationCap}
                placeholder="Informatique, Mathématiques..."
                required
              />

              <Select
                label="Grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                options={GRADES_FORMATEUR}
                icon={Award}
              />

              <Input
                label="Département"
                name="departement"
                value={formData.departement}
                onChange={handleChange}
                icon={Building}
                placeholder="Sciences Informatiques"
              />

              <Input
                label="Bureau"
                name="bureau"
                value={formData.bureau}
                onChange={handleChange}
                placeholder="Bâtiment A, Bureau 205"
              />
            </div>
          </Card>
        )}

        {/* Champs spécifiques TECHNICIEN */}
        {formData.role === "TECHNICIEN" && (
          <Card
            title="Informations Technicien"
            className="animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                error={errors.service}
                placeholder="Support Informatique"
                required
              />

              <Input
                label="Poste"
                name="poste"
                value={formData.poste}
                onChange={handleChange}
                placeholder="Technicien Réseau"
              />

              <div className="md:col-span-2">
                <Textarea
                  label="Permissions Spéciales"
                  name="permissions_speciales"
                  value={formData.permissions_speciales}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Décrivez les permissions spéciales si nécessaire..."
                />
              </div>
            </div>
          </Card>
        )}

        {/* Message d'erreur global */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-slide-down">
            {errors.submit}
          </div>
        )}

        {/* Boutons d'action */}
        <div
          className="flex justify-end gap-4 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/director/users")}
          >
            Annuler
          </Button>
          <Button type="submit" loading={loading} icon={Save}>
            Créer l'Utilisateur
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
