// frontend/src/routes/index.jsx
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/layout/ProtectedRoute';

// Auth pages
import Login from '../pages/auth/Login';

// Director pages
import DirectorDashboard from '../pages/director/Dashboard';
// import UsersList from '../pages/director/users/UsersList';
// import CreateUser from '../pages/director/users/CreateUser';
// ... autres imports

// Trainer pages
// import TrainerDashboard from '../pages/trainer/Dashboard';
// ... autres imports

// Student pages
// import StudentDashboard from '../pages/student/Dashboard';
// ... autres imports

/**
 * Configuration des routes de l'application
 * Utilise React Router v6
 */
const router = createBrowserRouter([
  
  // Routes publiques (sans layout)
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/forgot-password',
    element: <div>Page Mot de passe oublié</div> // TODO
  },
  
  // Routes Directeur (avec layout)
  {
    path: '/director',
    element: (
      <ProtectedRoute allowedRoles={['DIRECTEUR']}>
        <MainLayout role="DIRECTEUR" />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <DirectorDashboard />
      },
      {
        path: 'users',
        element: <div>Liste Utilisateurs</div> // TODO: UsersList
      },
      {
        path: 'users/create',
        element: <div>Créer Utilisateur</div> // TODO: CreateUser
      },
      {
        path: 'promotions',
        element: <div>Liste Promotions</div> // TODO: PromotionsList
      },
      {
        path: 'promotions/create',
        element: <div>Créer Promotion</div> // TODO: CreatePromotion
      },
      {
        path: 'spaces',
        element: <div>Liste Espaces</div> // TODO: SpacesList
      },
      {
        path: 'spaces/create',
        element: <div>Créer Espace</div> // TODO: CreateSpace
      },
      {
        path: 'reports',
        element: <div>Rapports</div> // TODO: Reports
      }
    ]
  },
  
  // Routes Formateur
  {
    path: '/trainer',
    element: <MainLayout role="FORMATEUR" user={{ nom: 'Jean Martin', role: 'Formateur' }} />,
    children: [
      {
        path: 'dashboard',
        element: <div>Dashboard Formateur</div> // TODO: TrainerDashboard
      },
      {
        path: 'spaces',
        element: <div>Mes Espaces</div> // TODO: MySpaces
      },
      {
        path: 'works',
        element: <div>Mes Travaux</div> // TODO: WorksList
      },
      {
        path: 'works/create',
        element: <div>Créer Travail</div> // TODO: CreateWork
      }
    ]
  },
  
  // Routes Étudiant
  {
    path: '/student',
    element: <MainLayout role="ETUDIANT" user={{ nom: 'Marie Dupont', role: 'Étudiant' }} />,
    children: [
      {
        path: 'dashboard',
        element: <div>Dashboard Étudiant</div> // TODO: StudentDashboard
      },
      {
        path: 'spaces',
        element: <div>Mes Cours</div> // TODO: MySpaces
      },
      {
        path: 'works',
        element: <div>Mes Travaux</div> // TODO: MyWorks
      },
      {
        path: 'grades',
        element: <div>Mes Notes</div> // TODO: MyGrades
      }
    ]
  },
  
  // Redirection par défaut
  {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  
  // 404
  {
    path: '*',
    element: <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600">Page non trouvée</p>
      </div>
    </div>
  }
  
]);

export default router;