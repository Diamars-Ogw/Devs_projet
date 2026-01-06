// ============================================
// MODIFICATION UTILISATEUR - PAGE COMPLÈTE
// Fichier: src/pages/director/users/EditUser.jsx
// ============================================

import { useEffect, useState } from "react";
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
import Loader from "@/components/ui/Loader";

import { GRADES_FORMATEUR } from "@/utils/constants";
// import userService from "@/services/user.service"; // ⬅️ API réelle

// 🧪 MOCK (désactivé)
// const MOCK_USER = { ... };

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadUser = async () => {
      try {
        // 🔗 API réelle
        // const data = await userService.getById(id);
        // setFormData(data);

        // 🧪 MOCK (désactivé)
        // setFormData(MOCK_USER);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // await userService.update(id, formData);
      navigate("/director/users");
    } catch (error) {
      setErrors({ submit: "Erreur lors de la modification" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader text="Chargement..." />;
  if (!formData) return <p className="text-center text-red-600">Utilisateur introuvable</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" icon={ArrowLeft} onClick={() => navigate(-1)}>
          Retour
        </Button>
        <h1 className="text-3xl font-bold">Modifier l'Utilisateur</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card title="Informations de Base">
          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Nom" name="nom" value={formData.nom} onChange={handleChange} icon={User} />
            <Input label="Prénom" name="prenom" value={formData.prenom} onChange={handleChange} icon={User} />
            <Input label="Email" name="email" value={formData.email} onChange={handleChange} icon={Mail} />
            <Input label="Téléphone" name="telephone" value={formData.telephone} onChange={handleChange} icon={Phone} />
          </div>
        </Card>

        {formData.role === "FORMATEUR" && (
          <Card title="Informations Formateur">
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Spécialité" name="specialite" value={formData.specialite || ""} onChange={handleChange} icon={GraduationCap} />
              <Select label="Grade" name="grade" value={formData.grade || ""} onChange={handleChange} options={GRADES_FORMATEUR} icon={Award} />
              <Input label="Département" name="departement" value={formData.departement || ""} onChange={handleChange} icon={Building} />
              <Input label="Bureau" name="bureau" value={formData.bureau || ""} onChange={handleChange} />
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
          <Button type="submit" icon={Save} loading={saving}>
            Enregistrer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
