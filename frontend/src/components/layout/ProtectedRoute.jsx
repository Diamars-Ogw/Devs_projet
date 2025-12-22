// frontend/src/components/layout/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../ui/Loader';

/**
 * Composant pour protéger les routes nécessitant une authentification
 * @param {ReactNode} children - Composants enfants
 * @param {array} allowedRoles - Rôles autorisés (optionnel)
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen text="Chargement..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">403</h1>
          <p className="text-xl text-gray-600 mb-4">Accès non autorisé</p>
          <p className="text-gray-500">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;