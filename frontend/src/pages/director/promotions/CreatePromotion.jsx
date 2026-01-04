import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { NIVEAUX_ETUDES } from "@/utils/constants";

const CreatePromotion = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    code: "",
    annee_academique: new Date().getFullYear(),
    niveau_etudes: "",
    date_debut: "",
    date_fin: "",
    capacite_max: "",
    description: "",
    est_active: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Promotion créée:", formData);
    navigate("/director/promotions");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/director/promotions")}
          icon={ArrowLeft}
        >
          Retour
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Créer une Promotion
          </h1>
          <p className="text-gray-600 mt-1">Nouvelle promotion académique</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card title="Informations de Base">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nom de la Promotion"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
            <Input
              label="Code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="WD2024"
              required
            />
            <Input
              label="Année Académique"
              name="annee_academique"
              type="number"
              value={formData.annee_academique}
              onChange={handleChange}
              required
            />
            <Select
              label="Niveau d'Études"
              name="niveau_etudes"
              value={formData.niveau_etudes}
              onChange={handleChange}
              options={NIVEAUX_ETUDES}
              required
            />
            <Input
              label="Date de Début"
              name="date_debut"
              type="date"
              value={formData.date_debut}
              onChange={handleChange}
              required
            />
            <Input
              label="Date de Fin"
              name="date_fin"
              type="date"
              value={formData.date_fin}
              onChange={handleChange}
              required
            />
            <Input
              label="Capacité Maximale"
              name="capacite_max"
              type="number"
              value={formData.capacite_max}
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
            onClick={() => navigate("/director/promotions")}
          >
            Annuler
          </Button>
          <Button type="submit" loading={loading} icon={Save}>
            Créer la Promotion
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePromotion;
