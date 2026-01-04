import api from './api';

const workService = {
  // Récupère tous les travaux
  async getAll(filters = {}) {
    const response = await api.get('/works', { params: filters });
    return response.data;
  },

  // Récupère un travail par ID
  async getById(id) {
    const response = await api.get(`/works/${id}`);
    return response.data;
  },

  // Crée un nouveau travail
  async create(workData) {
    const response = await api.post('/works', workData);
    return response.data;
  },

  // Met à jour un travail
  async update(id, workData) {
    const response = await api.put(`/works/${id}`, workData);
    return response.data;
  },

  // Supprime un travail
  async delete(id) {
    const response = await api.delete(`/works/${id}`);
    return response.data;
  },

  // Récupère les travaux d'un espace
  async getBySpace(spaceId) {
    const response = await api.get(`/spaces/${spaceId}/works`);
    return response.data;
  },

  // Récupère les travaux d'un étudiant
  async getByStudent(studentId) {
    const response = await api.get(`/students/${studentId}/works`);
    return response.data;
  },
};

export default workService;