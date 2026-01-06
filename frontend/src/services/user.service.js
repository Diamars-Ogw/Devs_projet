// ============================================
// SERVICE API - GESTION DES UTILISATEURS
// ============================================

import api from './api';

/**
 * SERVICE UTILISATEURS
 * Gère toutes les opérations CRUD sur les utilisateurs
 */
const userService = {
  /**
   * Récupérer tous les utilisateurs
   * @param {string} role - Filtrer par rôle (optionnel)
   * @returns {Promise<Array>}
   */
  getAll: async (role = null) => {
    const url = role ? `/users?role=${role}` : '/users';
    const response = await api.get(url);
    return response.data;
  },

  /**
   * Récupérer un utilisateur par ID
   * @param {number} id - ID de l'utilisateur
   * @returns {Promise<Object>}
   */
  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  /**
   * Créer un nouvel utilisateur
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Promise<Object>}
   */
  create: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Erreur create user:', error);
      throw error;
    }
  },

  /**
   * Mettre à jour un utilisateur
   * @param {number} id - ID de l'utilisateur
   * @param {Object} userData - Données à mettre à jour
   * @returns {Promise<Object>}
   */
  update: async (id, userData) => {
    const response = await api.patch(`/users/${id}`, userData);
    return response.data;
  },

  /**
   * Supprimer un utilisateur
   * @param {number} id - ID de l'utilisateur
   * @returns {Promise<Object>}
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur delete user:', error);
      throw error;
    }
  },

  /**
   * Récupérer les statistiques des utilisateurs
   * @returns {Promise<Object>}
   */
  getStatistics: async () => {
    try {
      const response = await api.get('/users/statistics');
      return response.data;
    } catch (error) {
      console.error('Erreur getStatistics:', error);
      throw error;
    }
  },

  /**
   * Récupérer les comptes inactifs
   * @returns {Promise<Array>}
   */
  getInactiveAccounts: async () => {
    try {
      const response = await api.get('/users/inactive');
      return response.data;
    } catch (error) {
      console.error('Erreur getInactiveAccounts:', error);
      throw error;
    }
  },

  /**
   * Récupérer tous les étudiants
   * @returns {Promise<Array>}
   */
  getStudents: async () => {
    try {
      const response = await api.get('/users?role=ETUDIANT');
      return response.data;
    } catch (error) {
      console.error('Erreur getStudents:', error);
      throw error;
    }
  },

  /**
   * Récupérer tous les formateurs
   * @returns {Promise<Array>}
   */
  getFormateurs: async () => {
    try {
      const response = await api.get('/users?role=FORMATEUR');
      return response.data;
    } catch (error) {
      console.error('Erreur getFormateurs:', error);
      throw error;
    }
  },

  /**
   * Récupérer tous les directeurs
   * @returns {Promise<Array>}
   */
  getDirecteurs: async () => {
    try {
      const response = await api.get('/users?role=DIRECTEUR');
      return response.data;
    } catch (error) {
      console.error('Erreur getDirecteurs:', error);
      throw error;
    }
  },

  /**
   * Récupérer tous les techniciens
   * @returns {Promise<Array>}
   */
  getTechniciens: async () => {
    try {
      const response = await api.get('/users?role=TECHNICIEN');
      return response.data;
    } catch (error) {
      console.error('Erreur getTechniciens:', error);
      throw error;
    }
  },
};

export default userService;