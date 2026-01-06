import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Download, Clock, CheckCircle, Filter } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Select from "@/components/ui/Select";

export default function SubmissionsList() {
  const [filter, setFilter] = useState("all");
  
  const [submissions] = useState([
    {
      id: 1,
      student: "Marie Dupont",
      work: "Projet React E-commerce",
      submittedAt: "2024-01-14 14:30",
      status: "pending",
      hasFile: true,
      initials: "MD",
      color: "from-purple-400 to-pink-400",
    },
    {
      id: 2,
      student: "Jean Martin",
      work: "TP Node.js API REST",
      submittedAt: "2024-01-09 09:15",
      status: "pending",
      hasFile: true,
      initials: "JM",
      color: "from-blue-400 to-cyan-400",
    },
    {
      id: 3,
      student: "Sophie Bernard",
      work: "Projet React E-commerce",
      submittedAt: "2024-01-13 16:45",
      status: "evaluated",
      grade: 18,
      hasFile: true,
      initials: "SB",
      color: "from-green-400 to-emerald-400",
    },
    {
      id: 4,
      student: "Pierre Laurent",
      work: "TP SQL Avancé",
      submittedAt: "2024-01-12 11:20",
      status: "evaluated",
      grade: 16,
      hasFile: true,
      initials: "PL",
      color: "from-orange-400 to-amber-400",
    },
    {
      id: 5,
      student: "Emma Dubois",
      work: "Mini-projet TypeScript",
      submittedAt: "2024-01-15 08:30",
      status: "pending",
      hasFile: true,
      initials: "ED",
      color: "from-red-400 to-rose-400",
    },
  ]);

  const filteredSubmissions = submissions.filter((sub) => {
    if (filter === "all") return true;
    if (filter === "pending") return sub.status === "pending";
    if (filter === "evaluated") return sub.status === "evaluated";
    return true;
  });

  const pendingCount = submissions.filter((s) => s.status === "pending").length;

  return (
    <div className="space-y-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Soumissions des Travaux
          </h1>
          <p className="text-gray-600 mt-1">Consulter et évaluer les travaux rendus</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="warning" className="text-base px-4 py-2">
            {pendingCount} à corriger
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-64"
          >
            <option value="all">Toutes les soumissions</option>
            <option value="pending">À corriger</option>
            <option value="evaluated">Corrigées</option>
          </Select>
        </div>
      </Card>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.map((sub) => (
          <Card
            key={sub.id}
            className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                {/* Avatar */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${sub.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                >
                  {sub.initials}
                </div>

                {/* Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-gray-900">{sub.student}</h3>
                    {sub.status === "evaluated" ? (
                      <Badge variant="success" className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Corrigé - {sub.grade}/20
                      </Badge>
                    ) : (
                      <Badge variant="warning" className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        En attente
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-gray-600">{sub.work}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Rendu le {new Date(sub.submittedAt).toLocaleString("fr-FR")}</span>
                    </div>
                    {sub.hasFile && (
                      <span className="flex items-center gap-1 text-blue-600">
                        <Download className="w-4 h-4" />
                        Fichier joint
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                {sub.hasFile && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Télécharger
                  </Button>
                )}
                <Link to={`/trainer/submissions/evaluate/${sub.id}`}>
                  <Button
                    size="sm"
                    className={
                      sub.status === "evaluated"
                        ? "bg-gray-600 hover:bg-gray-700"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    }
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    {sub.status === "evaluated" ? "Voir" : "Évaluer"}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredSubmissions.length === 0 && (
        <Card className="p-12 text-center">
          <div className="text-gray-400 mb-4">
            <CheckCircle className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-gray-600 mb-2">Aucune soumission</h3>
          <p className="text-gray-500">Aucune soumission ne correspond à vos critères de filtre</p>
        </Card>
      )}

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