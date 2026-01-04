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

  // Met à jour une promotion
  async update(id, promotionData) {
    const response = await api.put(`/promotions/${id}`, promotionData);
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

  // Récupère les statistiques d'une promotion
  async getStats(id) {
    const response = await api.get(`/promotions/${id}/stats`);
    return response.data;
  },
};

export default promotionService;