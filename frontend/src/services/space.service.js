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

  // Met à jour un espace
  async update(id, spaceData) {
    const response = await api.put(`/spaces/${id}`, spaceData);
    return response.data;
  },

  // Supprime un espace
  async delete(id) {
    const response = await api.delete(`/spaces/${id}`);
    return response.data;
  },

  // Inscrit des étudiants dans un espace
  async enrollStudents(id, studentIds) {
    const response = await api.post(`/spaces/${id}/enroll`, { studentIds });
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

  // Ajoute un formateur secondaire
  async addSecondaryTeacher(spaceId, teacherId) {
    const response = await api.post(`/spaces/${spaceId}/teachers/${teacherId}`);
    return response.data;
  },

  // Retire un formateur secondaire
  async removeSecondaryTeacher(spaceId, teacherId) {
    const response = await api.delete(`/spaces/${spaceId}/teachers/${teacherId}`);
    return response.data;
  },
};

export default spaceService;