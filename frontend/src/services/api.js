// ============================================
// CONFIGURATION AXIOS PRINCIPALE
// ============================================

import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '@/utils/constants';

// Créer une instance Axios avec la config de base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 secondes
});

/**
 * INTERCEPTEUR DE REQUÊTE
 * Ajoute automatiquement le token JWT à chaque requête
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Erreur requête:', error);
    return Promise.reject(error);
  }
);

/**
 * INTERCEPTEUR DE RÉPONSE
 * Gère les erreurs globalement
 */
api.interceptors.response.use(
  (response) => {
    // Retourne directement la réponse si tout va bien
    return response;
  },
  (error) => {
    // Gestion des erreurs par code HTTP
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Token expiré ou invalide → déconnexion
          console.error('Session expirée');
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER);
          window.location.href = '/login';
          break;
          
        case 403:
          // Accès interdit
          console.error('Accès interdit');
          break;
          
        case 404:
          // Ressource non trouvée
          console.error('Ressource non trouvée');
          break;
          
        case 500:
          // Erreur serveur
          console.error('Erreur serveur');
          break;
          
        default:
          console.error('Erreur API:', data);
      }
    } else if (error.request) {
      // La requête a été envoyée mais pas de réponse
      console.error('Pas de réponse du serveur');
    } else {
      // Erreur lors de la configuration de la requête
      console.error('Erreur:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;