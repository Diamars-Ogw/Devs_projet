import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Eye, Calendar, Users, FileText } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function WorksList() {
  const [works] = useState([
    {
      id: 1,
      title: "Projet React E-commerce",
      space: "React Avancé",
      type: "Collectif",
      deadline: "2024-01-15",
      submitted: 12,
      total: 15,
      status: "active",
    },
    {
      id: 2,
      title: "TP Node.js API REST",
      space: "Node.js API",
      type: "Individuel",
      deadline: "2024-01-10",
      submitted: 42,
      total: 45,
      status: "active",
    },
    {
      id: 3,
      title: "Mini-projet TypeScript",
      space: "TypeScript",
      type: "Collectif",
      deadline: "2024-01-20",
      submitted: 8,
      total: 14,
      status: "active",
    },
    {
      id: 4,
      title: "Application Next.js",
      space: "Next.js",
      type: "Individuel",
      deadline: "2024-01-05",
      submitted: 38,
      total: 38,
      status: "completed",
    },
  ]);

  const getProgressColor = (submitted, total) => {
    const percentage = (submitted / total) * 100;
    if (percentage === 100) return "bg-green-500";
    if (percentage >= 70) return "bg-blue-500";
    if (percentage >= 40) return "bg-purple-500";
    return "bg-orange-500";
  };

  const getProgressPercentage = (submitted, total) => {
    return Math.round((submitted / total) * 100);
  };

  return (
    <div className="space-y-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Liste des Travaux
          </h1>
          <p className="text-gray-600 mt-1">Gérer et évaluer les travaux</p>
        </div>
        <Link to="/trainer/works/create">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg">
            <Plus className="w-5 h-5 mr-2" />
            Créer un Travail
          </Button>
        </Link>
      </div>

      {/* Works List */}
      <div className="space-y-4">
        {works.map((work) => {
          const progress = getProgressPercentage(work.submitted, work.total);
          const progressColor = getProgressColor(work.submitted, work.total);

          return (
            <Card
              key={work.id}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-purple-500"
            >
              <div className="flex items-center justify-between">
                {/* Left Section */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-900">{work.title}</h3>
                    <Badge variant={work.type === "Individuel" ? "info" : "success"}>
                      {work.type}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600">{work.space}</p>

                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span>Échéance: {new Date(work.deadline).toLocaleDateString("fr-FR")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>
                        {work.submitted}/{work.total} rendus
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progression</span>
                      <span className="font-semibold text-gray-900">{progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${progressColor} transition-all duration-1000 rounded-full`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Right Section - Actions */}
                <div className="flex items-center gap-3 ml-6">
                  <Link to={`/trainer/submissions?workId=${work.id}`}>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Eye className="w-4 h-4 mr-2" />
                      Évaluer
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
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