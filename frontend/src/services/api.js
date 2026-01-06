// ============================================
// CONFIGURATION AXIOS POUR L'API
// Fichier: src/services/api.js
// ============================================

import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '@/utils/constants';

// Instance Axios configurée
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur de requêtes - Ajoute le token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponses - Gestion des erreurs
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Erreur réseau
    if (!error.response) {
      console.error('Erreur réseau:', error);
      return Promise.reject({
        message: 'Erreur de connexion au serveur',
        type: 'NETWORK_ERROR',
      });
    }

    // Token expiré ou invalide
    if (error.response.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      
      // Redirection vers login si pas déjà sur la page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      
      return Promise.reject({
        message: 'Session expirée, veuillez vous reconnecter',
        type: 'UNAUTHORIZED',
      });
    }

    // Accès refusé
    if (error.response.status === 403) {
      return Promise.reject({
        message: 'Accès refusé',
        type: 'FORBIDDEN',
      });
    }

    // Ressource non trouvée
    if (error.response.status === 404) {
      return Promise.reject({
        message: 'Ressource non trouvée',
        type: 'NOT_FOUND',
      });
    }

    // Erreur serveur
    if (error.response.status >= 500) {
      return Promise.reject({
        message: 'Erreur serveur, veuillez réessayer',
        type: 'SERVER_ERROR',
      });
    }

    // Autres erreurs (validation, etc.)
    return Promise.reject({
      message: error.response.data?.message || 'Une erreur est survenue',
      type: 'API_ERROR',
      details: error.response.data,
    });
  }
);

export default api;