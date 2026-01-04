// ============================================
// GESTION DES UTILISATEURS - LISTE COMPLÈTE
// Fichier: src/pages/director/users/UsersList.jsx
// ============================================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Mail,
  CheckCircle,
  XCircle,
  Filter,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import Loader from "@/components/ui/Loader";
import { ROLES } from "@/utils/constants";
import { getInitials, classNames } from "@/utils/helpers";

// DONNÉES MOCK (sera remplacé par les vrais appels API)
const MOCK_USERS = [
  {
    id: 1,
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@academie.fr",
    role: "DIRECTEUR",
    matricule: null,
    promotion: null,
    telephone: "06 12 34 56 78",
    est_actif: true,
    date_creation: new Date("2024-01-15"),
  },
  {
    id: 2,
    nom: "Martin",
    prenom: "Sophie",
    email: "sophie.martin@academie.fr",
    role: "FORMATEUR",
    matricule: null,
    promotion: null,
    specialite: "Informatique",
    grade: "Prof.",
    telephone: "06 23 45 67 89",
    est_actif: true,
    date_creation: new Date("2024-02-10"),
  },
  {
    id: 3,
    nom: "Durand",
    prenom: "Marie",
    email: "marie.durand@academie.fr",
    role: "ETUDIANT",
    matricule: "ETU2024001",
    promotion: "Web Dev 2024",
    telephone: "06 34 56 78 90",
    est_actif: true,
    date_creation: new Date("2024-09-01"),
  },
  {
    id: 4,
    nom: "Bernard",
    prenom: "Pierre",
    email: "pierre.bernard@academie.fr",
    role: "ETUDIANT",
    matricule: "ETU2024002",
    promotion: "Data Science",
    telephone: "06 45 67 89 01",
    est_actif: false,
    date_creation: new Date("2024-09-01"),
  },
  {
    id: 5,
    nom: "Petit",
    prenom: "Julie",
    email: "julie.petit@academie.fr",
    role: "FORMATEUR",
    matricule: null,
    promotion: null,
    specialite: "Mathématiques",
    grade: "Dr.",
    telephone: "06 56 78 90 12",
    est_actif: true,
    date_creation: new Date("2024-03-20"),
  },
];

const UsersList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, user: null });

  // Charger les utilisateurs
  useEffect(() => {
    const loadUsers = async () => {
      try {
        // TODO: Remplacer par l'appel API réel
        // const data = await userService.getAll();
        setTimeout(() => {
          setUsers(MOCK_USERS);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Erreur chargement utilisateurs:", error);
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Filtrer les utilisateurs
  const filteredUsers = users.filter((user) => {
    const matchesSearch = `${user.nom} ${user.prenom} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesStatus =
      !statusFilter ||
      (statusFilter === "actif" ? user.est_actif : !user.est_actif);
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Statistiques
  const stats = {
    total: users.length,
    actifs: users.filter((u) => u.est_actif).length,
    inactifs: users.filter((u) => !u.est_actif).length,
    etudiants: users.filter((u) => u.role === "ETUDIANT").length,
  };

  // Supprimer un utilisateur
  const handleDelete = async (userId) => {
    try {
      // TODO: Appel API
      // await userService.delete(userId);
      setUsers(users.filter((u) => u.id !== userId));
      setDeleteModal({ isOpen: false, user: null });
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  };

  // Couleur du badge selon le rôle
  const getRoleBadgeColor = (role) => {
    const colors = {
      DIRECTEUR: "info",
      FORMATEUR: "purple",
      ETUDIANT: "success",
      TECHNICIEN: "warning",
    };
    return colors[role] || "info";
  };

  if (loading) {
    return <Loader text="Chargement des utilisateurs..." />;
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestion des Utilisateurs
          </h1>
          <p className="text-gray-600 mt-1">
            Créer et gérer les comptes utilisateurs de la plateforme
          </p>
        </div>
        <Button
          icon={Plus}
          onClick={() => navigate("/director/users/create")}
          className="shadow-lg"
        >
          Créer un Compte
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Utilisateurs"
          value={stats.total}
          icon="👥"
          color="blue"
        />
        <StatCard
          title="Comptes Actifs"
          value={stats.actifs}
          icon="✅"
          color="green"
        />
        <StatCard
          title="Comptes Inactifs"
          value={stats.inactifs}
          icon="⏳"
          color="red"
        />
        <StatCard
          title="Étudiants"
          value={stats.etudiants}
          icon="🎓"
          color="purple"
        />
      </div>

      {/* Filtres */}
      <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Rechercher par nom, prénom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />

          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            options={[
              { value: "", label: "Tous les rôles" },
              { value: "DIRECTEUR", label: "Directeur" },
              { value: "FORMATEUR", label: "Formateur" },
              { value: "ETUDIANT", label: "Étudiant" },
              { value: "TECHNICIEN", label: "Technicien" },
            ]}
            icon={Filter}
          />

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: "", label: "Tous les statuts" },
              { value: "actif", label: "Actifs uniquement" },
              { value: "inactif", label: "Inactifs uniquement" },
            ]}
          />
        </div>
      </Card>

      {/* Liste des utilisateurs */}
      <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Promotion / Spécialité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                          {getInitials(user.prenom, user.nom)}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {user.nom} {user.prenom}
                          </div>
                          {user.matricule && (
                            <div className="text-sm text-gray-500">
                              {user.matricule}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.promotion || user.specialite || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.est_actif ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">Actif</span>
                        </span>
                      ) : (
                        <span className="flex items-center text-red-600">
                          <XCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">Inactif</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() =>
                          navigate(`/director/users/edit/${user.id}`)
                        }
                        className="text-purple-600 hover:text-purple-900 mr-3 transition-colors"
                        title="Modifier"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setDeleteModal({ isOpen: true, user })}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal de confirmation de suppression */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, user: null })}
        title="Confirmer la suppression"
        size="sm"
      >
        {deleteModal.user && (
          <div className="space-y-4">
            <p className="text-gray-600">
              Êtes-vous sûr de vouloir supprimer l'utilisateur{" "}
              <strong>
                {deleteModal.user.nom} {deleteModal.user.prenom}
              </strong>{" "}
              ?
            </p>
            <p className="text-sm text-red-600">
              ⚠️ Cette action est irréversible.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setDeleteModal({ isOpen: false, user: null })}
              >
                Annuler
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(deleteModal.user.id)}
              >
                Supprimer
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// Composant StatCard
const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    red: "from-red-500 to-red-600",
    purple: "from-purple-500 to-purple-600",
  };

  return (
    <Card className="card-hover animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div
          className={`w-14 h-14 bg-gradient-to-br ${colors[color]} rounded-xl flex items-center justify-center text-2xl shadow-lg`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default UsersList;
