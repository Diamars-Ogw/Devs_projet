// ============================================
// SERVICE DASHBOARD
// ============================================

import api from './api';

const dashboardService = {
  /**
   * Récupère les statistiques du dashboard directeur
   */
  async getDirectorStats() {
    try {
      const response = await api.get('/dashboard/director');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Récupère les statistiques du dashboard formateur
   */
  async getTeacherStats() {
    try {
      const response = await api.get('/dashboard/teacher');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Récupère les statistiques du dashboard étudiant
   */
  async getStudentStats() {
    try {
      const response = await api.get('/dashboard/student');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Récupère les activités récentes
   */
  async getRecentActivities(limit = 10) {
    try {
      const response = await api.get('/dashboard/activities', {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default dashboardService;