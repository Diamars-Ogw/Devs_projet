// frontend/src/services/auth.service.js
import api from './api';

/**
 * Service d'authentification
 */
export const authService = {
  /**
   * Connexion
   */
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, mot_de_passe: password });
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Déconnexion
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Obtenir l'utilisateur connecté
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * Mot de passe oublié
   */
  forgotPassword: async (email) => {
    return api.post('/auth/forgot-password', { email });
  },

  /**
   * Réinitialiser le mot de passe
   */
  resetPassword: async (token, newPassword) => {
    return api.post('/auth/reset-password', { token, mot_de_passe: newPassword });
  },

  /**
   * Changer le mot de passe
   */
  changePassword: async (oldPassword, newPassword) => {
    return api.post('/auth/change-password', { 
      ancien_mot_de_passe: oldPassword, 
      nouveau_mot_de_passe: newPassword 
    });
  },

  /**
   * Rafraîchir le token
   */
  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  }
};

export default authService;