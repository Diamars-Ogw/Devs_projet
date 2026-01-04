// ============================================
// SERVICE D'AUTHENTIFICATION (VERSION MOCK)
// Fonctionne SANS backend pour le développement
// ============================================

import { STORAGE_KEYS } from "@/utils/constants";

// Faux utilisateurs pour la démonstration
const MOCK_USERS = [
  {
    id: 1,
    email: "director@academie.fr",
    password: "password123",
    nom: "Dupont",
    prenom: "Jean",
    role: "DIRECTEUR",
  },
  {
    id: 2,
    email: "teacher@academie.fr",
    password: "password123",
    nom: "Martin",
    prenom: "Sophie",
    role: "FORMATEUR",
  },
  {
    id: 3,
    email: "student@academie.fr",
    password: "password123",
    nom: "Durand",
    prenom: "Marie",
    role: "ETUDIANT",
  },
];

const authService = {
  /**
   * Connexion MOCK (simule une API)
   */
  async login(email, password) {
    // Simule un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Cherche l'utilisateur
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw {
        response: {
          data: {
            message: "Email ou mot de passe incorrect",
          },
        },
      };
    }

    // Crée un faux token
    const token = `mock-token-${user.id}-${Date.now()}`;

    // Sauvegarde dans localStorage
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify({
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
      })
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
      },
    };
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
   * Récupération de mot de passe (MOCK)
   */
  async forgotPassword(email) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { message: "Email de récupération envoyé" };
  },

  /**
   * Réinitialisation mot de passe (MOCK)
   */
  async resetPassword(token, newPassword) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { message: "Mot de passe réinitialisé" };
  },

  /**
   * Changement mot de passe (MOCK)
   */
  async changePassword(oldPassword, newPassword) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { message: "Mot de passe changé" };
  },
};

export default authService;
