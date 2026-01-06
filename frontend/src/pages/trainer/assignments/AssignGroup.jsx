import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Search, CheckSquare, Square, UserCheck } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Badge from "@/components/ui/Badge";

export default function AssignGroup() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    work: "",
    space: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Mock data - groupes disponibles
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
    {
      id: 4,
      name: "Team Alpha",
      work: "Application Next.js",
      members: [
        { name: "Laura Blanc", initials: "LB" },
        { name: "Marc Rousseau", initials: "MR" },
        { name: "Nina Garcia", initials: "NG" },
      ],
      createdBy: "formateur",
    },
  ]);

  const colors = [
    "from-purple-400 to-pink-400",
    "from-blue-400 to-cyan-400",
    "from-green-400 to-emerald-400",
    "from-orange-400 to-amber-400",
  ];

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.work.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleGroup = (groupId) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedGroups([]);
    } else {
      setSelectedGroups(filteredGroups.map((g) => g.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Assignment data:", {
      ...formData,
      groups: selectedGroups,
    });
    // TODO: API call
    navigate("/trainer/assignments");
  };

  const getTotalStudents = () => {
    return selectedGroups.reduce((total, groupId) => {
      const group = groups.find((g) => g.id === groupId);
      return total + (group?.members.length || 0);
    }, 0);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/trainer/assignments")}
          className="hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Assignation Collective
          </h1>
          <p className="text-gray-600 mt-1">Assigner un travail à des groupes</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Work Selection */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Informations</h2>
              
              <div className="space-y-4">
                <Select
                  label="Espace pédagogique"
                  name="space"
                  value={formData.space}
                  onChange={(e) => setFormData({ ...formData, space: e.target.value })}
                  required
                >
                  <option value="">Sélectionner un espace</option>
                  <option value="1">React Avancé</option>
                  <option value="2">Node.js API</option>
                  <option value="3">TypeScript</option>
                  <option value="4">Next.js</option>
                </Select>

                <Select
                  label="Travail à assigner"
                  name="work"
                  value={formData.work}
                  onChange={(e) => setFormData({ ...formData, work: e.target.value })}
                  required
                >
                  <option value="">Sélectionner un travail</option>
                  <option value="1">Projet React E-commerce</option>
                  <option value="2">TP Node.js API REST</option>
                  <option value="3">Mini-projet TypeScript</option>
                  <option value="4">Application Next.js</option>
                </Select>

                {/* Selected Stats */}
                <div className="mt-6 space-y-3">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Groupes sélectionnés</span>
                      <Badge variant="primary" className="text-lg px-3 py-1">
                        {selectedGroups.length}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">
                      {selectedGroups.length === 0
                        ? "Aucun groupe sélectionné"
                        : `${selectedGroups.length} groupe${selectedGroups.length > 1 ? "s" : ""} sélectionné${selectedGroups.length > 1 ? "s" : ""}`}
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Total étudiants</span>
                      <Badge variant="info" className="text-lg px-3 py-1">
                        {getTotalStudents()}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">
                      Nombre d'étudiants concernés
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg mt-6"
                  disabled={selectedGroups.length === 0 || !formData.work}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Assigner aux {selectedGroups.length} groupe{selectedGroups.length > 1 ? "s" : ""}
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column - Groups List */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Liste des Groupes ({filteredGroups.length})
                </h2>
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                >
                  {selectAll ? (
                    <CheckSquare className="w-5 h-5" />
                  ) : (
                    <Square className="w-5 h-5" />
                  )}
                  {selectAll ? "Tout désélectionner" : "Tout sélectionner"}
                </button>
              </div>

              {/* Search */}
              <div className="mb-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom de groupe ou travail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Groups Grid */}
              <div className="max-h-[600px] overflow-y-auto space-y-3">
                {filteredGroups.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Search className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>Aucun groupe trouvé</p>
                  </div>
                ) : (
                  filteredGroups.map((group, idx) => {
                    const isSelected = selectedGroups.includes(group.id);
                    return (
                      <button
                        key={group.id}
                        type="button"
                        onClick={() => toggleGroup(group.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all ${
                          isSelected
                            ? "bg-purple-50 border-purple-500"
                            : "bg-white border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            {/* Checkbox */}
                            <div
                              className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-all flex-shrink-0 mt-1 ${
                                isSelected
                                  ? "bg-purple-600 border-purple-600"
                                  : "bg-white border-gray-300"
                              }`}
                            >
                              {isSelected && (
                                <svg
                                  className="w-4 h-4 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>

                            {/* Group Info */}
                            <div className="flex-1 text-left">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-bold text-gray-900">{group.name}</h3>
                                <Badge variant={group.createdBy === "formateur" ? "primary" : "success"}>
                                  {group.createdBy === "formateur" ? "Formateur" : "Étudiant"}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{group.work}</p>

                              {/* Members */}
                              <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                  {group.members.slice(0, 3).map((member, mIdx) => (
                                    <div
                                      key={mIdx}
                                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${
                                        colors[mIdx % colors.length]
                                      } flex items-center justify-center text-white font-bold text-xs border-2 border-white shadow-md`}
                                      title={member.name}
                                    >
                                      {member.initials}
                                    </div>
                                  ))}
                                  {group.members.length > 3 && (
                                    <div className="w-8 h-8 rounded-lg bg-gray-400 flex items-center justify-center text-white font-bold text-xs border-2 border-white shadow-md">
                                      +{group.members.length - 3}
                                    </div>
                                  )}
                                </div>
                                <span className="text-sm text-gray-600 flex items-center gap-1">
                                  <UserCheck className="w-4 h-4" />
                                  {group.members.length} membre{group.members.length > 1 ? "s" : ""}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Status indicator */}
                          {isSelected && (
                            <div className="text-purple-600 ml-4">
                              <CheckSquare className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </Card>
          </div>
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