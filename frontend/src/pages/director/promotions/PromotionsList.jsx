import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit2, Trash2, Users, BookOpen, Calendar } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import Loader from "@/components/ui/Loader";
import Toast from "@/components/ui/Toast";
import { promotionService } from "@/services/promotion.service";

const PromotionsList = () => {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    promotion: null,
  });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    loadPromotions();
  }, []);

  const loadPromotions = async () => {
    try {
      const data = await promotionService.getAll();
      setPromotions(data.promotions || []);
      setLoading(false);
    } catch (error) {
      console.error("Erreur chargement promotions:", error);
      showToast("Erreur lors du chargement", "error");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await promotionService.delete(id);
      setPromotions(promotions.filter((p) => p.id !== id));
      setDeleteModal({ isOpen: false, promotion: null });
      showToast("Promotion supprimée avec succès", "success");
    } catch (error) {
      console.error("Erreur suppression:", error);
      showToast(
        error.response?.data?.error || "Erreur lors de la suppression",
        "error",
      );
    }
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  if (loading) return <Loader text="Chargement des promotions..." />;

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50">
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast({ show: false, message: "", type: "" })}
          />
        </div>
      )}

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

      {promotions.length === 0 ? (
        <Card>
          <div className="text-center py-12 text-gray-500">
            <p>Aucune promotion trouvée</p>
            <Button
              onClick={() => navigate("/director/promotions/create")}
              className="mt-4"
            >
              Créer la première promotion
            </Button>
          </div>
        </Card>
      ) : (
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
                  <Badge variant={promo.estActive ? "success" : "danger"}>
                    {promo.estActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{promo.nombreEtudiants || 0} étudiants</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>{promo.nombreEspaces || 0} espaces</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Année {promo.anneeAcademique}</span>
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
                      title="Modifier"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setDeleteModal({ isOpen: true, promotion: promo })
                      }
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

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
