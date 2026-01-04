import api from './api';

const evaluationService = {
  // Crée une évaluation
  async create(evaluationData) {
    const response = await api.post('/evaluations', evaluationData);
    return response.data;
  },

  // Met à jour une évaluation (pour le directeur)
  async update(id, evaluationData) {
    const response = await api.put(`/evaluations/${id}`, evaluationData);
    return response.data;
  },

  // Récupère les évaluations d'un étudiant
  async getByStudent(studentId) {
    const response = await api.get(`/students/${studentId}/evaluations`);
    return response.data;
  },

  // Récupère l'historique des modifications d'une évaluation
  async getHistory(id) {
    const response = await api.get(`/evaluations/${id}/history`);
    return response.data;
  },
};

export default evaluationService;