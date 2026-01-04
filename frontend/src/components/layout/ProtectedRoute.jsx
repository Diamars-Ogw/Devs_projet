import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/ui/Loader";

/**
 * Composant pour protéger les routes
 * Redirige vers /login si non authentifié
 * Redirige vers / si le rôle n'est pas autorisé
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading, isAuthenticated } = useAuth();

  // Attendre le chargement
  if (loading) {
    return <Loader fullScreen text="Vérification..." />;
  }

  // Pas authentifié → redirection login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Vérifier le rôle si spécifié
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  // OK, afficher le contenu
  return children;
};

export default ProtectedRoute;
