// ============================================
// CONTEXT D'AUTHENTIFICATION
// Gère l'état global de l'utilisateur connecté
// ============================================

import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '@/services/auth.service';

// Créer le context
export const AuthContext = createContext(null);

/**
 * Provider qui enveloppe toute l'application
 * Fournit les informations d'authentification à tous les composants
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Au chargement, récupérer l'utilisateur depuis localStorage
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  /**
   * Fonction de connexion
   * @param {string} email
   * @param {string} password
   */
  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      setUser(data.user);
      
      // Redirection selon le rôle
      const routes = {
        DIRECTEUR: '/director/dashboard',
        FORMATEUR: '/trainer/dashboard',
        ETUDIANT: '/student/dashboard',
        TECHNICIEN: '/director/dashboard', // Par défaut
      };
      
      navigate(routes[data.user.role] || '/');
      
      return data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Fonction de déconnexion
   */
  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  /**
   * Vérifie si l'utilisateur est authentifié
   */
  const isAuthenticated = !!user;

  /**
   * Vérifie si l'utilisateur a un rôle spécifique
   */
  const hasRole = (role) => {
    return user && user.role === role;
  };

  // Valeur fournie à tous les composants enfants
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};