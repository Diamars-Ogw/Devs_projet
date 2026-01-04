import api from './api';

const userService = {
  // Récupère tous les utilisateurs (avec filtres optionnels)
  async getAll(filters = {}) {
    const response = await api.get('/users', { params: filters });
    return response.data;
  },

  // Récupère un utilisateur par ID
  async getById(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Crée un nouvel utilisateur
  async create(userData) {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // Met à jour un utilisateur
  async update(id, userData) {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  // Supprime un utilisateur
  async delete(id) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // Récupère les utilisateurs inactifs
  async getInactive() {
    const response = await api.get('/users/inactive');
    return response.data;
  },

  // Envoie un email de relance à un utilisateur
  async sendReminder(userId) {
    const response = await api.post(`/users/${userId}/send-reminder`);
    return response.data;
  },

  // Envoie des emails de relance groupés
  async sendBulkReminders(userIds) {
    const response = await api.post('/users/send-bulk-reminders', { userIds });
    return response.data;
  },

  // Active un compte utilisateur
  async activateAccount(userId) {
    const response = await api.post(`/users/${userId}/activate`);
    return response.data;
  },

  // Désactive un compte utilisateur
  async deactivateAccount(userId) {
    const response = await api.post(`/users/${userId}/deactivate`);
    return response.data;
  },

  // Récupère tous les formateurs
  async getTeachers() {
    const response = await api.get('/users/teachers');
    return response.data;
  },

  // Récupère tous les étudiants (filtrés par promotion optionnellement)
  async getStudents(promotionId = null) {
    const params = promotionId ? { promotionId } : {};
    const response = await api.get('/users/students', { params });
    return response.data;
  },
};

export default userService;