import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Loader from "@/components/ui/Loader";

const EditSpace = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setFormData({
        nom: "React Avancé",
        promotion_id: "1",
        matiere_id: "1",
        formateur_id: "1",
        description: "Cours avancé sur React",
        semestre: "1",
        volume_horaire_total: 40,
        date_debut: "2024-09-01",
        date_fin: "2024-12-31",
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate("/director/spaces");
  };

  if (loading) return <Loader />;

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
            Modifier l'Espace
          </h1>
          <p className="text-gray-600 mt-1">{formData.nom}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card title="Informations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
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
            />
            <Input
              label="Volume Horaire"
              name="volume_horaire_total"
              type="number"
              value={formData.volume_horaire_total}
              onChange={handleChange}
            />
            <div className="md:col-span-2">
              <Textarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
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
          <Button type="submit" loading={saving} icon={Save}>
            Enregistrer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditSpace;
