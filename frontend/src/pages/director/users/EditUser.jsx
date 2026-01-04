// ============================================
// MODIFICATION D'UTILISATEUR - PAGE COMPLÈTE
// Fichier: src/pages/director/users/EditUser.jsx
// ============================================

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import Loader from "@/components/ui/Loader";
import { GRADES_FORMATEUR, GENRES } from "@/utils/constants";

// Données MOCK pour la démo
const MOCK_USER = {
  id: 2,
  nom: "Martin",
  prenom: "Sophie",
  email: "sophie.martin@academie.fr",
  role: "FORMATEUR",
  telephone: "06 23 45 67 89",
  specialite: "Informatique",
  grade: "Prof.",
  departement: "Sciences",
  bureau: "Bâtiment A, Bureau 205",
};

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});

  // Charger les données de l'utilisateur
  useEffect(() => {
    const loadUser = async () => {
      try {
        // TODO: Appel API
        // const data = await userService.getById(id);

        // Simulation
        setTimeout(() => {
          setFormData(MOCK_USER);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Erreur chargement utilisateur:", error);
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSaving(true);

    try {
      // TODO: Appel API
      // await userService.update(id, formData);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Utilisateur modifié:", formData);
      navigate("/director/users");
    } catch (error) {
      console.error("Erreur modification:", error);
      setErrors({ submit: "Erreur lors de la modification" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader text="Chargement de l'utilisateur..." />;
  }

  if (!formData) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Utilisateur introuvable</p>
        <Button onClick={() => navigate("/director/users")} className="mt-4">
          Retour à la liste
        </Button>
      </div>
    );
  }

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
            Modifier l'Utilisateur
          </h1>
          <p className="text-gray-600 mt-1">
            {formData.nom} {formData.prenom} - {formData.role}
          </p>
        </div>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card title="Informations de Base" className="animate-slide-up">
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
            />

            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">
                <strong>Rôle :</strong> {formData.role} (non modifiable)
              </p>
            </div>
          </div>
        </Card>

        {/* Champs spécifiques FORMATEUR */}
        {formData.role === "FORMATEUR" && (
          <Card title="Informations Formateur" className="animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Spécialité"
                name="specialite"
                value={formData.specialite || ""}
                onChange={handleChange}
                icon={GraduationCap}
              />

              <Select
                label="Grade"
                name="grade"
                value={formData.grade || ""}
                onChange={handleChange}
                options={GRADES_FORMATEUR}
                icon={Award}
              />

              <Input
                label="Département"
                name="departement"
                value={formData.departement || ""}
                onChange={handleChange}
                icon={Building}
              />

              <Input
                label="Bureau"
                name="bureau"
                value={formData.bureau || ""}
                onChange={handleChange}
              />
            </div>
          </Card>
        )}

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {errors.submit}
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/director/users")}
          >
            Annuler
          </Button>
          <Button type="submit" loading={saving} icon={Save}>
            Enregistrer les Modifications
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
