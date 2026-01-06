// ============================================
// SERVICE API - GESTION DES PROMOTIONS
// ============================================

import api from './api';

const promotionService = {
  // Récupère toutes les promotions
  async getAll(filters = {}) {
    const response = await api.get('/promotions', { params: filters });
    return response.data;
  },

  // Récupère une promotion par ID
  async getById(id) {
    const response = await api.get(`/promotions/${id}`);
    return response.data;
  },

  // Crée une nouvelle promotion
  async create(promotionData) {
    const response = await api.post('/promotions', promotionData);
    return response.data;
  },

  // Met à jour une promotion (PATCH au lieu de PUT)
  async update(id, promotionData) {
    const response = await api.patch(`/promotions/${id}`, promotionData);
    return response.data;
  },

  // Supprime une promotion
  async delete(id) {
    const response = await api.delete(`/promotions/${id}`);
    return response.data;
  },

  // Récupère les étudiants d'une promotion
  async getStudents(id) {
    const response = await api.get(`/promotions/${id}/students`);
    return response.data;
  },

  // Récupère les statistiques des promotions
  async getStatistics() {
    const response = await api.get('/promotions/statistics');
    return response.data;
  },
};

export default promotionService;