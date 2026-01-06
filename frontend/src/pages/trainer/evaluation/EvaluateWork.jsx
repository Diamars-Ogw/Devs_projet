import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Download, FileText, Star } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Badge from "@/components/ui/Badge";

export default function EvaluateWork() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [submission, setSubmission] = useState(null);
  const [evaluation, setEvaluation] = useState({
    grade: "",
    comment: "",
  });

  useEffect(() => {
    // TODO: Fetch submission by ID
    // Mock data
    setSubmission({
      id: 1,
      student: "Marie Dupont",
      matricule: "ETU2024001",
      work: "Projet React E-commerce",
      workDescription: "Créer une application e-commerce complète avec React, incluant panier, authentification et paiement.",
      submittedAt: "2024-01-14 14:30",
      content: "J'ai créé une application e-commerce avec React. Elle comprend un système de gestion de panier, l'authentification des utilisateurs, et l'intégration avec une API de paiement simulée. J'ai également implémenté un système de filtres et de recherche pour les produits.",
      files: [
        { name: "projet-ecommerce.zip", size: "2.4 MB" },
      ],
      status: "pending",
      initials: "MD",
      color: "from-purple-400 to-pink-400",
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Evaluation:", evaluation);
    // TODO: API call
    navigate("/trainer/submissions");
  };

  if (!submission) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const gradeColor = (grade) => {
    if (grade >= 16) return "text-green-600";
    if (grade >= 12) return "text-blue-600";
    if (grade >= 10) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/trainer/submissions")}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Évaluer le Travail
            </h1>
            <p className="text-gray-600 mt-1">Consulter et noter la soumission</p>
          </div>
        </div>
        {submission.status === "evaluated" && (
          <Badge variant="success" className="text-base px-4 py-2">
            Déjà évalué
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Submission Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Student Info */}
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${submission.color} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}
              >
                {submission.initials}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{submission.student}</h2>
                <p className="text-sm text-gray-600">{submission.matricule}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Rendu le {new Date(submission.submittedAt).toLocaleString("fr-FR")}
                </p>
              </div>
            </div>
          </Card>

          {/* Work Details */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-900">Travail : {submission.work}</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Consignes :</p>
              <p className="text-gray-600">{submission.workDescription}</p>
            </div>
          </Card>

          {/* Submission Content */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contenu de la Soumission</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 whitespace-pre-wrap">{submission.content}</p>
            </div>
          </Card>

          {/* Files */}
          {submission.files && submission.files.length > 0 && (
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fichiers Joints</h3>
              <div className="space-y-2">
                {submission.files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-600">{file.size}</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Download className="w-4 h-4 mr-1" />
                      Télécharger
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Column - Evaluation Form */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <h3 className="text-xl font-bold text-gray-900">Évaluation</h3>
                </div>

                {/* Grade Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Note <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      min="0"
                      max="20"
                      step="0.5"
                      value={evaluation.grade}
                      onChange={(e) =>
                        setEvaluation({ ...evaluation, grade: e.target.value })
                      }
                      placeholder="0"
                      required
                      className={`text-3xl font-bold text-center ${
                        evaluation.grade ? gradeColor(parseFloat(evaluation.grade)) : ""
                      }`}
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-gray-400">
                      /20
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Note sur 20 (décimales autorisées)</p>
                </div>

                {/* Grade Indicator */}
                {evaluation.grade && (
                  <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">Appréciation</p>
                    <p className={`text-lg font-bold ${gradeColor(parseFloat(evaluation.grade))}`}>
                      {parseFloat(evaluation.grade) >= 16 && "Excellent"}
                      {parseFloat(evaluation.grade) >= 12 &&
                        parseFloat(evaluation.grade) < 16 &&
                        "Bien"}
                      {parseFloat(evaluation.grade) >= 10 &&
                        parseFloat(evaluation.grade) < 12 &&
                        "Passable"}
                      {parseFloat(evaluation.grade) < 10 && "Insuffisant"}
                    </p>
                  </div>
                )}

                {/* Comment */}
                <div className="mt-6">
                  <Textarea
                    label="Commentaire"
                    value={evaluation.comment}
                    onChange={(e) =>
                      setEvaluation({ ...evaluation, comment: e.target.value })
                    }
                    placeholder="Votre appréciation détaillée..."
                    rows={8}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Fournissez un feedback constructif à l'étudiant
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
              >
                Enregistrer l'Évaluation
              </Button>
            </form>
          </Card>
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