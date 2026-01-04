import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit2,
  Trash2,
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import Loader from "@/components/ui/Loader";

const MOCK_PROMOTIONS = [
  {
    id: 1,
    nom: "Web Dev Full Stack 2024",
    code: "WD2024",
    annee_academique: 2024,
    niveau_etudes: "L3",
    nb_etudiants: 45,
    nb_espaces: 8,
    date_debut: "2024-09-01",
    date_fin: "2025-06-30",
    est_active: true,
  },
  {
    id: 2,
    nom: "Data Science & IA 2024",
    code: "DSIA2024",
    annee_academique: 2024,
    niveau_etudes: "M1",
    nb_etudiants: 38,
    nb_espaces: 6,
    date_debut: "2024-09-01",
    date_fin: "2025-06-30",
    est_active: true,
  },
  {
    id: 3,
    nom: "DevOps & Cloud 2024",
    code: "DC2024",
    annee_academique: 2024,
    niveau_etudes: "L3",
    nb_etudiants: 32,
    nb_espaces: 7,
    date_debut: "2024-09-01",
    date_fin: "2025-06-30",
    est_active: true,
  },
  {
    id: 4,
    nom: "Mobile Development 2024",
    code: "MD2024",
    annee_academique: 2024,
    niveau_etudes: "L2",
    nb_etudiants: 28,
    nb_espaces: 5,
    date_debut: "2024-09-01",
    date_fin: "2025-06-30",
    est_active: true,
  },
];

const PromotionsList = () => {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    promotion: null,
  });

  useEffect(() => {
    setTimeout(() => {
      setPromotions(MOCK_PROMOTIONS);
      setLoading(false);
    }, 500);
  }, []);

  const handleDelete = async (id) => {
    setPromotions(promotions.filter((p) => p.id !== id));
    setDeleteModal({ isOpen: false, promotion: null });
  };

  if (loading) return <Loader text="Chargement des promotions..." />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestion des Promotions
          </h1>
          <p className="text-gray-600 mt-1">
            Créer et gérer les promotions académiques
          </p>
        </div>
        <Button
          icon={Plus}
          onClick={() => navigate("/director/promotions/create")}
        >
          Créer une Promotion
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <Card key={promo.id} className="card-hover animate-slide-up">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {promo.nom}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Code: {promo.code}
                  </p>
                </div>
                <Badge variant={promo.est_active ? "success" : "danger"}>
                  {promo.est_active ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{promo.nb_etudiants} étudiants</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BookOpen className="w-4 h-4" />
                  <span>{promo.nb_espaces} espaces</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Année {promo.annee_academique}</span>
              </div>

              <div className="flex justify-between gap-2 pt-4 border-t">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    navigate(`/director/promotions/${promo.id}/students`)
                  }
                >
                  Voir les étudiants
                </Button>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/director/promotions/edit/${promo.id}`)
                    }
                    className="p-2 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setDeleteModal({ isOpen: true, promotion: promo })
                    }
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, promotion: null })}
        title="Confirmer la suppression"
        size="sm"
      >
        {deleteModal.promotion && (
          <div className="space-y-4">
            <p>
              Voulez-vous vraiment supprimer la promotion{" "}
              <strong>{deleteModal.promotion.nom}</strong> ?
            </p>
            <p className="text-sm text-red-600">
              Cette action est irréversible.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() =>
                  setDeleteModal({ isOpen: false, promotion: null })
                }
              >
                Annuler
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(deleteModal.promotion.id)}
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

export default PromotionsList;
