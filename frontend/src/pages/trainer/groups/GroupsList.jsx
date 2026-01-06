import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Users, Edit, Trash2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function GroupsList() {
  const [groups] = useState([
    {
      id: 1,
      name: "Groupe A",
      work: "Projet React E-commerce",
      members: [
        { name: "Marie Dupont", initials: "MD" },
        { name: "Jean Martin", initials: "JM" },
        { name: "Sophie Bernard", initials: "SB" },
      ],
      createdBy: "formateur",
    },
    {
      id: 2,
      name: "Groupe B",
      work: "Projet React E-commerce",
      members: [
        { name: "Pierre Laurent", initials: "PL" },
        { name: "Emma Dubois", initials: "ED" },
        { name: "Lucas Martin", initials: "LM" },
      ],
      createdBy: "formateur",
    },
    {
      id: 3,
      name: "Les Codeurs",
      work: "Mini-projet TypeScript",
      members: [
        { name: "Alice Moreau", initials: "AM" },
        { name: "Thomas Petit", initials: "TP" },
      ],
      createdBy: "etudiant",
    },
  ]);

  const colors = [
    "from-purple-400 to-pink-400",
    "from-blue-400 to-cyan-400",
    "from-green-400 to-emerald-400",
    "from-orange-400 to-amber-400",
  ];

  return (
    <div className="space-y-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Gestion des Groupes
          </h1>
          <p className="text-gray-600 mt-1">
            Créer et gérer les groupes d'étudiants
          </p>
        </div>
        <Link to="/trainer/groups/create">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg">
            <Plus className="w-5 h-5 mr-2" />
            Créer un Groupe
          </Button>
        </Link>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group, idx) => (
          <Card
            key={group.id}
            className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {group.name}
                    </h3>
                    <Badge
                      variant={
                        group.createdBy === "formateur" ? "primary" : "success"
                      }
                    >
                      {group.createdBy === "formateur"
                        ? "Formateur"
                        : "Étudiant"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{group.work}</p>
                </div>
              </div>

              {/* Members */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="font-medium">
                    {group.members.length} membres
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.members.map((member, mIdx) => (
                    <div
                      key={mIdx}
                      className="group relative cursor-pointer"
                      title={member.name}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                          colors[mIdx % colors.length]
                        } flex items-center justify-center text-white font-bold text-sm shadow-md hover:scale-110 transition-transform`}
                      >
                        {member.initials}
                      </div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {member.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Modifier
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
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
