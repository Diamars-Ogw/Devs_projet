// ============================================
// SERVICE D'AUTHENTIFICATION - BACKEND RÉEL
// Connexion à l'API NestJS
// ============================================

import api from "./api";
import { STORAGE_KEYS } from "@/utils/constants";

const authService = {
  /**
   * Connexion avec le backend réel
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<Object>} - { token, user }
   */
  async login(email, password) {
    try {
      // 🔥 APPEL API RÉEL au backend NestJS
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { access_token, user } = response.data;

      // Sauvegarde dans localStorage
      localStorage.setItem(STORAGE_KEYS.TOKEN, access_token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

      return {
        token: access_token,
        user,
      };
    } catch (error) {
      console.error("Erreur login:", error);
      throw error;
    }
  },

  /**
   * Déconnexion
   */
  logout() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  /**
   * Récupère l'utilisateur depuis localStorage
   */
  getCurrentUser() {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error("Erreur parsing user:", error);
      return null;
    }
  },

  /**
   * Vérifie si l'utilisateur est authentifié
   */
  isAuthenticated() {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    return !!token;
  },

  /**
   * Vérifie le rôle
   */
  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.role === role;
  },

  /**
   * Récupération de mot de passe
   */
  async forgotPassword(email) {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      console.error("Erreur forgot password:", error);
      throw error;
    }
  },

  /**
   * Réinitialisation mot de passe
   */
  async resetPassword(token, newPassword) {
    try {
      const response = await api.post("/auth/reset-password", {
        token,
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.error("Erreur reset password:", error);
      throw error;
    }
  },

  /**
   * Changement mot de passe
   */
  async changePassword(oldPassword, newPassword) {
    try {
      const response = await api.post("/auth/change-password", {
        oldPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.error("Erreur change password:", error);
      throw error;
    }
  },
};

export default authService;