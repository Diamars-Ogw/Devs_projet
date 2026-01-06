import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

export default function CreateWork() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    space: "",
    type: "INDIVIDUEL",
    groupMode: "NON_APPLICABLE",
    startDate: "",
    endDate: "",
    instructions: "",
    file: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    // TODO: API call
    navigate("/trainer/works");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset groupMode if type changes to INDIVIDUEL
      ...(name === "type" && value === "INDIVIDUEL" ? { groupMode: "NON_APPLICABLE" } : {}),
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/trainer/works")}
          className="hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Créer un Travail
          </h1>
          <p className="text-gray-600 mt-1">Définir un nouveau travail pour vos étudiants</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card className="p-8">
          <div className="space-y-6">
            {/* Section: Informations du Travail */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Informations du Travail</h2>
              <div className="space-y-4">
                <Input
                  label="Titre du travail"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex: Projet React E-commerce"
                  required
                />

                <Select
                  label="Espace pédagogique"
                  name="space"
                  value={formData.space}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner un espace</option>
                  <option value="1">React Avancé</option>
                  <option value="2">Node.js API</option>
                  <option value="3">TypeScript</option>
                  <option value="4">Next.js</option>
                </Select>

                {/* Type de travail */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Type de travail
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value="INDIVIDUEL"
                        checked={formData.type === "INDIVIDUEL"}
                        onChange={handleChange}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700">Travail Individuel</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value="COLLECTIF"
                        checked={formData.type === "COLLECTIF"}
                        onChange={handleChange}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700">Travail Collectif</span>
                    </label>
                  </div>
                </div>

                {/* Mode de formation des groupes (si collectif) */}
                {formData.type === "COLLECTIF" && (
                  <div className="space-y-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <label className="block text-sm font-medium text-gray-700">
                      Mode de formation des groupes (si collectif)
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="groupMode"
                          value="FORMATEUR"
                          checked={formData.groupMode === "FORMATEUR"}
                          onChange={handleChange}
                          className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-gray-700">Groupes définis par le formateur</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="groupMode"
                          value="ETUDIANT"
                          checked={formData.groupMode === "ETUDIANT"}
                          onChange={handleChange}
                          className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-gray-700">Groupes formés par les étudiants</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="date"
                    label="Date de début"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="date"
                    label="Date de fin"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Consignes */}
                <Textarea
                  label="Consignes"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  placeholder="Décrivez les consignes du travail..."
                  rows={6}
                  required
                />

                {/* Upload fichier */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fichier de consignes (optionnel)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Cliquez pour télécharger un fichier ou glissez-déposez
                    </p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOCX, ZIP (max. 10MB)</p>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.docx,.zip"
                      onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/trainer/works")}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Créer le Travail
          </Button>
        </div>
      </form>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}