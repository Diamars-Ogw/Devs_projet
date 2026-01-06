import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  FileText,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import Badge from "@/components/ui/Badge";

export default function SubmitWork() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [work, setWork] = useState(null);
  const [submission, setSubmission] = useState({
    content: "",
    files: [],
  });
  const [isDraft, setIsDraft] = useState(true);

  useEffect(() => {
    // TODO: Fetch work by ID
    // Mock data
    setWork({
      id: 1,
      title: "Projet React E-commerce",
      course: "React Avancé",
      type: "Individuel",
      deadline: "2024-01-15",
      daysLeft: 3,
      instructions:
        "Créer une application e-commerce complète avec React. L'application doit inclure:\n\n- Un système d'authentification\n- Un catalogue de produits avec filtres\n- Un panier d'achat fonctionnel\n- Une page de checkout\n- Une gestion des commandes\n\nUtilisez React Router pour la navigation et Context API pour la gestion d'état.",
      maxFileSize: "50 MB",
      allowedFormats: [".zip", ".pdf", ".docx"],
    });
  }, [id]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setSubmission({
      ...submission,
      files: [...submission.files, ...selectedFiles],
    });
  };

  const removeFile = (index) => {
    setSubmission({
      ...submission,
      files: submission.files.filter((_, i) => i !== index),
    });
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", submission);
    // TODO: API call
    alert("Brouillon enregistré !");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!submission.content && submission.files.length === 0) {
      alert("Veuillez ajouter du contenu ou des fichiers avant de soumettre");
      return;
    }

    console.log("Submitting work:", submission);
    // TODO: API call
    navigate("/student/works");
  };

  if (!work) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getDeadlineColor = () => {
    if (work.daysLeft <= 3) return "text-red-600 bg-red-50 border-red-200";
    if (work.daysLeft <= 7)
      return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-blue-600 bg-blue-50 border-blue-200";
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/student/works")}
          className="hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Soumettre un Travail
          </h1>
          <p className="text-gray-600 mt-1">
            Complétez et soumettez votre travail
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Instructions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Work Info */}
          <Card className="p-6 sticky top-24">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {work.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{work.course}</p>
                <Badge
                  variant={work.type === "Individuel" ? "info" : "success"}
                >
                  {work.type}
                </Badge>
              </div>

              {/* Deadline Alert */}
              <div className={`p-4 rounded-lg border-2 ${getDeadlineColor()}`}>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-semibold">Échéance</span>
                </div>
                <p className="text-sm mb-1">
                  {new Date(work.deadline).toLocaleDateString("fr-FR")}
                </p>
                <p className="text-xs font-bold">
                  {work.daysLeft <= 1
                    ? `${work.daysLeft} jour restant`
                    : `${work.daysLeft} jours restants`}
                </p>
              </div>

              {/* Instructions */}
              <div>
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Consignes
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {work.instructions}
                </div>
              </div>

              {/* File Requirements */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">
                  Fichiers acceptés
                </h4>
                <p className="text-xs text-gray-600 mb-1">
                  Formats: {work.allowedFormats.join(", ")}
                </p>
                <p className="text-xs text-gray-600">
                  Taille max: {work.maxFileSize}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Submission Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Text Content */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Contenu de votre Travail
              </h3>
              <Textarea
                value={submission.content}
                onChange={(e) =>
                  setSubmission({ ...submission, content: e.target.value })
                }
                placeholder="Décrivez votre travail, ajoutez vos explications, liens, etc..."
                rows={12}
                className="font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                {submission.content.length} caractères
              </p>
            </Card>

            {/* File Upload */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Fichiers joints
              </h3>

              {/* Upload Area */}
              <label className="block">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-1">
                    Cliquez pour télécharger ou glissez-déposez vos fichiers
                  </p>
                  <p className="text-xs text-gray-500">
                    {work.allowedFormats.join(", ")} - Max {work.maxFileSize}
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept={work.allowedFormats.join(",")}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* Files List */}
              {submission.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">
                    Fichiers sélectionnés ({submission.files.length})
                  </h4>
                  {submission.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 text-sm truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors flex-shrink-0"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Warning */}
            <Card className="p-4 bg-orange-50 border-orange-200">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-orange-800">
                  <p className="font-semibold mb-1">Attention</p>
                  <p>
                    Une fois soumis, vous ne pourrez plus modifier votre
                    travail. Assurez-vous que tout est correct avant de
                    soumettre.
                  </p>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4">
              <Button type="button" variant="outline" onClick={handleSaveDraft}>
                Enregistrer le brouillon
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Soumettre définitivement
              </Button>
            </div>
          </form>
        </div>
      </div>

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
