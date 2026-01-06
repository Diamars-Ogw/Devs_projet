import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, CheckCircle, AlertCircle, Upload, FileText } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Select from "@/components/ui/Select";

export default function MyWorks() {
  const [filter, setFilter] = useState("all");

  const [works] = useState([
    {
      id: 1,
      title: "Projet React E-commerce",
      course: "React Avancé",
      type: "Individuel",
      deadline: "2024-01-15",
      status: "pending",
      daysLeft: 3,
      description: "Créer une application e-commerce complète avec React",
    },
    {
      id: 2,
      title: "TP Node.js API REST",
      course: "Node.js API",
      type: "Individuel",
      deadline: "2024-01-20",
      status: "pending",
      daysLeft: 8,
      description: "Développer une API REST avec Node.js et Express",
    },
    {
      id: 3,
      title: "Mini-projet TypeScript",
      course: "TypeScript",
      type: "Collectif",
      deadline: "2024-01-25",
      status: "submitted",
      submittedAt: "2024-01-12",
      description: "Application TypeScript avec interfaces et types avancés",
    },
    {
      id: 4,
      title: "Application Next.js",
      course: "Next.js",
      type: "Individuel",
      deadline: "2024-01-18",
      status: "graded",
      grade: 18,
      submittedAt: "2024-01-10",
      description: "Créer une application avec Next.js et Server Components",
    },
    {
      id: 5,
      title: "TP SQL Avancé",
      course: "Base de données",
      type: "Individuel",
      deadline: "2024-01-08",
      status: "graded",
      grade: 17,
      submittedAt: "2024-01-07",
      description: "Requêtes complexes et optimisation SQL",
    },
  ]);

  const filteredWorks = works.filter((work) => {
    if (filter === "all") return true;
    if (filter === "pending") return work.status === "pending";
    if (filter === "submitted") return work.status === "submitted";
    if (filter === "graded") return work.status === "graded";
    return true;
  });

  const getStatusBadge = (work) => {
    if (work.status === "pending") {
      if (work.daysLeft <= 3) {
        return (
          <Badge variant="danger" className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Urgent - {work.daysLeft}j
          </Badge>
        );
      }
      return (
        <Badge variant="warning" className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {work.daysLeft} jours
        </Badge>
      );
    }
    if (work.status === "submitted") {
      return (
        <Badge variant="info" className="flex items-center gap-1">
          <Upload className="w-3 h-3" />
          Soumis
        </Badge>
      );
    }
    if (work.status === "graded") {
      return (
        <Badge variant="success" className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Noté - {work.grade}/20
        </Badge>
      );
    }
  };

  const pendingCount = works.filter((w) => w.status === "pending").length;

  return (
    <div className="space-y-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mes Travaux
          </h1>
          <p className="text-gray-600 mt-1">Consultez et soumettez vos travaux</p>
        </div>
        {pendingCount > 0 && (
          <Badge variant="warning" className="text-base px-4 py-2">
            {pendingCount} à rendre
          </Badge>
        )}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <FileText className="w-5 h-5 text-gray-600" />
          <Select value={filter} onChange={(e) => setFilter(e.target.value)} className="w-64">
            <option value="all">Tous les travaux</option>
            <option value="pending">À rendre</option>
            <option value="submitted">Soumis</option>
            <option value="graded">Notés</option>
          </Select>
        </div>
      </Card>

      {/* Works List */}
      <div className="space-y-4">
        {filteredWorks.map((work) => (
          <Card
            key={work.id}
            className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
              work.status === "pending" && work.daysLeft <= 3
                ? "border-l-4 border-red-500"
                : work.status === "pending"
                ? "border-l-4 border-orange-500"
                : "border-l-4 border-blue-500"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{work.title}</h3>
                      <Badge variant={work.type === "Individuel" ? "info" : "success"}>
                        {work.type}
                      </Badge>
                      {getStatusBadge(work)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{work.course}</p>
                    <p className="text-sm text-gray-700">{work.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>Échéance: {new Date(work.deadline).toLocaleDateString("fr-FR")}</span>
                  </div>
                  {work.submittedAt && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Soumis le {new Date(work.submittedAt).toLocaleDateString("fr-FR")}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="ml-6">
                {work.status === "pending" && (
                  <Link to={`/student/submit/${work.id}`}>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Upload className="w-4 h-4 mr-2" />
                      Soumettre
                    </Button>
                  </Link>
                )}
                {work.status === "submitted" && (
                  <Button variant="outline" disabled>
                    <Clock className="w-4 h-4 mr-2" />
                    En attente
                  </Button>
                )}
                {work.status === "graded" && (
                  <Link to={`/student/grades`}>
                    <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Voir la note
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredWorks.length === 0 && (
        <Card className="p-12 text-center">
          <div className="text-gray-400 mb-4">
            <FileText className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-gray-600 mb-2">Aucun travail</h3>
          <p className="text-gray-500">Aucun travail ne correspond à vos critères</p>
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