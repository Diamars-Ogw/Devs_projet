// ============================================
// CONSTANTES GLOBALES DE L'APPLICATION
// ============================================

// URL de l'API backend
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Clés localStorage
export const STORAGE_KEYS = {
  TOKEN: 'eduplatform_token',
  USER: 'eduplatform_user',
  THEME: 'eduplatform_theme',
};

// Rôles des utilisateurs
export const ROLES = {
  DIRECTEUR: 'DIRECTEUR',
  FORMATEUR: 'FORMATEUR',
  ETUDIANT: 'ETUDIANT',
  TECHNICIEN: 'TECHNICIEN',
};

export const USER_ROLES = ROLES; // Alias pour compatibilité

// Niveaux d'études
export const NIVEAUX_ETUDES = [
  { value: 'L1', label: 'Licence 1' },
  { value: 'L2', label: 'Licence 2' },
  { value: 'L3', label: 'Licence 3' },
  { value: 'M1', label: 'Master 1' },
  { value: 'M2', label: 'Master 2' },
];

export const STUDY_LEVELS = NIVEAUX_ETUDES; // Alias

// Grades des formateurs
export const GRADES_FORMATEUR = [
  { value: 'M.', label: 'M.' },
  { value: 'Mme', label: 'Mme' },
  { value: 'Dr.', label: 'Dr.' },
  { value: 'Prof.', label: 'Prof.' },
  { value: 'Prof. Dr.', label: 'Prof. Dr.' },
];

export const GRADES = GRADES_FORMATEUR; // Alias

// Genres
export const GENRES = [
  { value: 'Masculin', label: 'Masculin' },
  { value: 'Feminin', label: 'Féminin' },
  { value: 'Autre', label: 'Autre' },
];

export const GENDERS = GENRES; // Alias

// Semestres
export const SEMESTRES = [
  { value: 1, label: 'Semestre 1' },
  { value: 2, label: 'Semestre 2' },
];

export const SEMESTERS = SEMESTRES; // Alias

// Types de travail
export const TYPES_TRAVAIL = {
  INDIVIDUEL: 'INDIVIDUEL',
  COLLECTIF: 'COLLECTIF',
};

export const WORK_TYPES = {
  INDIVIDUAL: 'INDIVIDUEL',
  COLLECTIVE: 'COLLECTIF',
};

// Modes de formation de groupes
export const MODES_GROUPE = {
  FORMATEUR: 'FORMATEUR',
  ETUDIANT: 'ETUDIANT',
  NON_APPLICABLE: 'NON_APPLICABLE',
};

export const GROUP_MODES = MODES_GROUPE; // Alias

// Statuts de livraison
export const STATUTS_LIVRAISON = {
  EN_COURS: 'EN_COURS',
  LIVRE: 'LIVRE',
  EN_RETARD: 'EN_RETARD',
};

export const SUBMISSION_STATUS = STATUTS_LIVRAISON; // Alias

// Configuration pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
};

// Taille max fichiers (50 MB)
export const MAX_FILE_SIZE = 50 * 1024 * 1024;

// Formats de fichiers acceptés
export const ACCEPTED_FILE_TYPES = {
  documents: '.pdf,.doc,.docx,.txt,.zip',
  images: '.jpg,.jpeg,.png,.gif',
  all: '.pdf,.doc,.docx,.txt,.zip,.jpg,.jpeg,.png,.gif',
};

// Types de toast
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Couleurs pour les graphiques
export const CHART_COLORS = {
  primary: '#ff5c1a',
  purple: '#a855f7',
  blue: '#3b82f6',
  green: '#10b981',
  yellow: '#f59e0b',
  red: '#ef4444',
  cyan: '#06b6d4',
  pink: '#ec4899',
};

// Comptes de démonstration (affichés sur la page de login)
export const DEMO_ACCOUNTS = [
  {
    email: 'jean.dupont@academie.fr',
    role: 'Directeur',
    color: 'blue',
  },
  {
    email: 'jean.martin@academie.fr',
    role: 'Formateur',
    color: 'pink',
  },
  {
    email: 'marie.durand@academie.fr',
    role: 'Étudiant',
    color: 'purple',
  },
];

// Messages de succès
export const SUCCESS_MESSAGES = {
  USER_CREATED: 'Utilisateur créé avec succès',
  USER_UPDATED: 'Utilisateur modifié avec succès',
  USER_DELETED: 'Utilisateur supprimé avec succès',
  PROMOTION_CREATED: 'Promotion créée avec succès',
  PROMOTION_UPDATED: 'Promotion modifiée avec succès',
  PROMOTION_DELETED: 'Promotion supprimée avec succès',
  SPACE_CREATED: 'Espace pédagogique créé avec succès',
  SPACE_UPDATED: 'Espace pédagogique modifié avec succès',
  SPACE_DELETED: 'Espace pédagogique supprimé avec succès',
  STUDENTS_ENROLLED: 'Étudiants inscrits avec succès',
  STUDENT_UNENROLLED: 'Étudiant désinscrit avec succès',
};

// Messages d'erreur
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion au serveur',
  UNAUTHORIZED: 'Session expirée, veuillez vous reconnecter',
  FORBIDDEN: 'Vous n\'avez pas les droits nécessaires',
  NOT_FOUND: 'Ressource non trouvée',
  SERVER_ERROR: 'Erreur serveur, veuillez réessayer',
  VALIDATION_ERROR: 'Données invalides',
  UNKNOWN_ERROR: 'Une erreur est survenue',
};

// Statuts des comptes
export const ACCOUNT_STATUS = {
  ACTIVE: true,
  INACTIVE: false,
};

// Timeouts
export const TIMEOUTS = {
  API_REQUEST: 30000,
  TOAST_DURATION: 3000,
  DEBOUNCE: 500,
};

// Routes de navigation
export const ROUTES = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DIRECTOR_DASHBOARD: '/director/dashboard',
  DIRECTOR_USERS: '/director/users',
  DIRECTOR_CREATE_USER: '/director/users/create',
  DIRECTOR_EDIT_USER: '/director/users/edit/:id',
  DIRECTOR_PROMOTIONS: '/director/promotions',
  DIRECTOR_CREATE_PROMOTION: '/director/promotions/create',
  DIRECTOR_EDIT_PROMOTION: '/director/promotions/edit/:id',
  DIRECTOR_SPACES: '/director/spaces',
  DIRECTOR_CREATE_SPACE: '/director/spaces/create',
  DIRECTOR_EDIT_SPACE: '/director/spaces/edit/:id',
  DIRECTOR_ENROLL_STUDENTS: '/director/spaces/:id/enroll',
  DIRECTOR_INACTIVE_ACCOUNTS: '/director/inactive-accounts',
  TRAINER_DASHBOARD: '/trainer/dashboard',
  STUDENT_DASHBOARD: '/student/dashboard',
};