import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

const CreateSpace = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    promotion_id: "",
    matiere_id: "",
    formateur_id: "",
    description: "",
    semestre: "",
    volume_horaire_total: "",
    date_debut: "",
    date_fin: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate("/director/spaces");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/director/spaces")}
          icon={ArrowLeft}
        >
          Retour
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Créer un Espace Pédagogique
          </h1>
          <p className="text-gray-600 mt-1">
            Nouveau cours ou espace d'enseignement
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card title="Informations Générales">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nom de l'Espace"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
            <Select
              label="Promotion"
              name="promotion_id"
              value={formData.promotion_id}
              onChange={handleChange}
              options={[
                { value: "1", label: "Web Dev 2024" },
                { value: "2", label: "Data Science 2024" },
              ]}
              required
            />
            <Select
              label="Matière"
              name="matiere_id"
              value={formData.matiere_id}
              onChange={handleChange}
              options={[
                { value: "1", label: "React Avancé" },
                { value: "2", label: "Node.js" },
              ]}
              required
            />
            <Select
              label="Formateur Principal"
              name="formateur_id"
              value={formData.formateur_id}
              onChange={handleChange}
              options={[
                { value: "1", label: "Jean Martin" },
                { value: "2", label: "Sophie Bernard" },
              ]}
              required
            />
            <Select
              label="Semestre"
              name="semestre"
              value={formData.semestre}
              onChange={handleChange}
              options={[
                { value: "1", label: "Semestre 1" },
                { value: "2", label: "Semestre 2" },
              ]}
              required
            />
            <Input
              label="Volume Horaire"
              name="volume_horaire_total"
              type="number"
              value={formData.volume_horaire_total}
              onChange={handleChange}
            />
            <Input
              label="Date Début"
              name="date_debut"
              type="date"
              value={formData.date_debut}
              onChange={handleChange}
            />
            <Input
              label="Date Fin"
              name="date_fin"
              type="date"
              value={formData.date_fin}
              onChange={handleChange}
            />
            <div className="md:col-span-2">
              <Textarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/director/spaces")}
          >
            Annuler
          </Button>
          <Button type="submit" loading={loading} icon={Save}>
            Créer l'Espace
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateSpace;
