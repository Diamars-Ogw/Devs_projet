// ============================================
// SERVICE API - GESTION DES ESPACES PÉDAGOGIQUES
// ============================================

import api from './api';

const spaceService = {
  // Récupère tous les espaces pédagogiques
  async getAll(filters = {}) {
    const response = await api.get('/spaces', { params: filters });
    return response.data;
  },

  // Récupère un espace par ID
  async getById(id) {
    const response = await api.get(`/spaces/${id}`);
    return response.data;
  },

  // Crée un nouvel espace pédagogique
  async create(spaceData) {
    const response = await api.post('/spaces', spaceData);
    return response.data;
  },

  // Met à jour un espace (PATCH au lieu de PUT)
  async update(id, spaceData) {
    const response = await api.patch(`/spaces/${id}`, spaceData);
    return response.data;
  },

  // Supprime un espace
  async delete(id) {
    const response = await api.delete(`/spaces/${id}`);
    return response.data;
  },

  // Inscrit des étudiants dans un espace (Mode individuel)
  async enrollStudents(id, studentIds) {
    const response = await api.post(`/spaces/${id}/enroll`, {
      etudiant_ids: studentIds, // ⚠️ Backend attend "etudiant_ids"
    });
    return response.data;
  },

  // Inscrit toute une promotion (Mode masse)
  async enrollPromotion(espaceId, promotionId) {
    const response = await api.post(`/spaces/${espaceId}/enroll-promotion`, {
      promotion_id: promotionId,
    });
    return response.data;
  },

  // Retire un étudiant d'un espace
  async unenrollStudent(spaceId, studentId) {
    const response = await api.delete(`/spaces/${spaceId}/students/${studentId}`);
    return response.data;
  },

  // Récupère les étudiants inscrits
  async getEnrolledStudents(id) {
    const response = await api.get(`/spaces/${id}/students`);
    return response.data;
  },

  // Récupère les statistiques des espaces
  async getStatistics() {
    const response = await api.get('/spaces/statistics');
    return response.data;
  },

  // ============================================
  // GESTION DES MATIÈRES
  // ============================================

  // Récupère toutes les matières
  async getAllMatieres() {
    const response = await api.get('/spaces/matieres/all');
    return response.data;
  },

  // Récupère une matière par ID
  async getMatiereById(id) {
    const response = await api.get(`/spaces/matieres/${id}`);
    return response.data;
  },

  // Crée une nouvelle matière
  async createMatiere(matiereData) {
    const response = await api.post('/spaces/matieres', matiereData);
    return response.data;
  },
};

export default spaceService;