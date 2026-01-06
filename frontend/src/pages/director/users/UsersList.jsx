// ============================================
// GESTION DES UTILISATEURS - LISTE COMPLÈTE
// Version connectée au backend NestJS
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

import { getInitials } from "@/utils/helpers";
import userService from "@/services/user.service";
import { SUCCESS_MESSAGES } from "@/utils/constants";

const UsersList = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    user: null,
  });

  // ======================
  // CHARGEMENT UTILISATEURS
  // ======================
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAll();
      
      // Transformer les données pour le frontend
      const transformedUsers = data.map(user => ({
        id: user.id,
        email: user.email,
        role: user.role,
        est_actif: user.est_actif,
        nom: user.directeur?.nom || user.formateur?.nom || user.etudiant?.nom || user.technicien?.nom || '',
        prenom: user.directeur?.prenom || user.formateur?.prenom || user.etudiant?.prenom || user.technicien?.prenom || '',
        matricule: user.etudiant?.matricule || null,
        telephone: user.directeur?.telephone || user.formateur?.telephone || user.etudiant?.telephone || user.technicien?.telephone || '',
        promotion: user.etudiant?.promotion?.nom || null,
        specialite: user.formateur?.specialite || null,
        date_creation: user.date_creation,
      }));

      setUsers(transformedUsers);
    } catch (error) {
      console.error("Erreur chargement utilisateurs:", error);
      alert("Erreur lors du chargement des utilisateurs");
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // FILTRAGE
  // ======================
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

  // ======================
  // STATISTIQUES
  // ======================
  const stats = {
    total: users.length,
    actifs: users.filter((u) => u.est_actif).length,
    inactifs: users.filter((u) => !u.est_actif).length,
    etudiants: users.filter((u) => u.role === "ETUDIANT").length,
  };

  // ======================
  // SUPPRESSION
  // ======================
  const handleDelete = async (userId) => {
    try {
      await userService.delete(userId);
      alert(SUCCESS_MESSAGES.USER_DELETED);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      setDeleteModal({ isOpen: false, user: null });
    } catch (error) {
      console.error("Erreur suppression utilisateur:", error);
      alert("Erreur lors de la suppression");
    }
  };

  // ======================
  // BADGE RÔLE
  // ======================
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestion des Utilisateurs
          </h1>
          <p className="text-gray-600 mt-1">
            Créer et gérer les comptes utilisateurs
          </p>
        </div>
        <Button
          icon={Plus}
          onClick={() => navigate("/director/users/create")}
        >
          Créer un compte
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total" value={stats.total} icon="👥" color="blue" />
        <StatCard title="Actifs" value={stats.actifs} icon="✅" color="green" />
        <StatCard
          title="Inactifs"
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
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />

          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            icon={Filter}
            options={[
              { value: "", label: "Tous les rôles" },
              { value: "DIRECTEUR", label: "Directeur" },
              { value: "FORMATEUR", label: "Formateur" },
              { value: "ETUDIANT", label: "Étudiant" },
              { value: "TECHNICIEN", label: "Technicien" },
            ]}
          />

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: "", label: "Tous les statuts" },
              { value: "actif", label: "Actifs" },
              { value: "inactif", label: "Inactifs" },
            ]}
          />
        </div>
      </Card>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left">Utilisateur</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Rôle</th>
                <th className="px-6 py-3 text-left">Promotion / Spécialité</th>
                <th className="px-6 py-3 text-left">Statut</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-gray-500">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-semibold">
                        {getInitials(user.prenom, user.nom)}
                      </div>
                      <div>
                        <div className="font-medium">
                          {user.nom} {user.prenom}
                        </div>
                        {user.matricule && (
                          <div className="text-sm text-gray-500">
                            {user.matricule}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {user.email}
                    </td>

                    <td className="px-6 py-4">
                      <Badge variant={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {user.promotion || user.specialite || "-"}
                    </td>

                    <td className="px-6 py-4">
                      {user.est_actif ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" /> Actif
                        </span>
                      ) : (
                        <span className="flex items-center text-red-600">
                          <XCircle className="w-4 h-4 mr-1" /> Inactif
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          navigate(`/director/users/edit/${user.id}`)
                        }
                        className="text-purple-600 mr-3"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          setDeleteModal({ isOpen: true, user })
                        }
                        className="text-red-600"
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

      {/* Modal suppression */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, user: null })}
        title="Confirmer la suppression"
        size="sm"
      >
        {deleteModal.user && (
          <div className="space-y-4">
            <p>
              Supprimer{" "}
              <strong>
                {deleteModal.user.nom} {deleteModal.user.prenom}
              </strong>{" "}
              ?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() =>
                  setDeleteModal({ isOpen: false, user: null })
                }
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

// ======================
// STAT CARD
// ======================
const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    red: "from-red-500 to-red-600",
    purple: "from-purple-500 to-purple-600",
  };

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center text-2xl`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default UsersList;