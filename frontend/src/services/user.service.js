// frontend/src/services/user.service.js
import api from './api';

/**
 * Service de gestion des utilisateurs
 */
export const userService = {
  /**
   * Récupérer tous les utilisateurs
   */
  getAll: (params = {}) => {
    return api.get('/users', { params });
  },

  /**
   * Récupérer un utilisateur par ID
   */
  getById: (id) => {
    return api.get(`/users/${id}`);
  },

  /**
   * Créer un utilisateur
   */
  create: (data) => {
    return api.post('/users', data);
  },

  /**
   * Mettre à jour un utilisateur
   */
  update: (id, data) => {
    return api.put(`/users/${id}`, data);
  },

  /**
   * Supprimer un utilisateur
   */
  delete: (id) => {
    return api.delete(`/users/${id}`);
  },

  /**
   * Activer un compte
   */
  activate: (id) => {
    return api.patch(`/users/${id}/activate`);
  },

  /**
   * Désactiver un compte
   */
  deactivate: (id) => {
    return api.patch(`/users/${id}/deactivate`);
  },

  /**
   * Récupérer les comptes inactifs
   */
  getInactive: () => {
    return api.get('/users/inactive');
  },

  /**
   * Envoyer un email de relance
   */
  sendReminder: (id) => {
    return api.post(`/users/${id}/remind`);
  },

  /**
   * Envoyer des emails de relance en masse
   */
  sendBulkReminders: (ids) => {
    return api.post('/users/remind-bulk', { ids });
  },

  /**
   * Statistiques des utilisateurs
   */
  getStats: () => {
    return api.get('/users/stats');
  }
};

export default userService;