// ============================================
// HOOK PERSONNALISÉ POUR L'AUTHENTIFICATION
// Facilite l'accès au contexte d'auth
// ============================================

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

/**
 * Hook pour utiliser le contexte d'authentification
 * @returns {Object} - user, login, logout, isAuthenticated, hasRole
 *
 * Exemple d'utilisation:
 * const { user, logout } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }

  return context;
};
