import { useState } from "react";
import { Link } from "react-router-dom";
import { UserCheck, Users as UsersIcon, Trash2, Calendar } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";

export default function AssignmentsList() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const [assignments] = useState([
    {
      id: 1,
      work: "Projet React E-commerce",
      type: "Collectif",
      assigned: 15,
      total: 15,
      date: "2024-01-01",
      assignedTo: "3 groupes",
    },
    {
      id: 2,
      work: "TP Node.js API REST",
      type: "Individuel",
      assigned: 45,
      total: 45,
      date: "2024-01-02",
      assignedTo: "45 étudiants",
    },
    {
      id: 3,
      work: "Mini-projet TypeScript",
      type: "Collectif",
      assigned: 10,
      total: 14,
      date: "2024-01-05",
      assignedTo: "5 groupes (en cours)",
    },
  ]);

  const handleDelete = (assignment) => {
    setSelectedAssignment(assignment);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("Deleting assignment:", selectedAssignment);
    // TODO: API call
    setShowDeleteModal(false);
    setSelectedAssignment(null);
  };

  return (
    <div className="space-y-6 animate-slideUp">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Gestion des Assignations
        </h1>
        <p className="text-gray-600 mt-1">
          Assigner des travaux aux étudiants ou groupes
        </p>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <Card
            key={assignment.id}
            className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {assignment.work}
                  </h3>
                  <Badge
                    variant={
                      assignment.type === "Individuel" ? "info" : "success"
                    }
                  >
                    {assignment.type}
                  </Badge>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span>
                      Assigné le{" "}
                      {new Date(assignment.date).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-4 h-4 text-blue-600" />
                    <span>{assignment.assignedTo}</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progression</span>
                    <span className="font-semibold text-gray-900">
                      {assignment.assigned}/{assignment.total}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        assignment.assigned === assignment.total
                          ? "bg-green-500"
                          : "bg-purple-500"
                      }`}
                      style={{
                        width: `${
                          (assignment.assigned / assignment.total) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 ml-6">
                <Button
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(assignment)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/trainer/assignments/individual">
          <Card className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-purple-300 bg-gradient-to-br from-purple-50 to-white">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <UserCheck className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Assigner en Individuel
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Assigner un travail à des étudiants
                </p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/trainer/assignments/group">
          <Card className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-blue-300 bg-gradient-to-br from-blue-50 to-white">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <UsersIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Assigner en Collectif
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Assigner un travail à des groupes
                </p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmer la suppression"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Êtes-vous sûr de vouloir supprimer l'assignation du travail{" "}
            <strong>{selectedAssignment?.work}</strong> ?
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-orange-800">
              ⚠️ Cette action supprimera toutes les assignations de ce travail.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Annuler
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={confirmDelete}
            >
              Supprimer
            </Button>
          </div>
        </div>
      </Modal>

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
