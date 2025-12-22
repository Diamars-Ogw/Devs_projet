// frontend/src/App.jsx
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/ui/Toast';
import router from './routes';
import MainLayout from './components/layout/MainLayout';

/**
 * Composant principal de l'application
 * Configure le routing et les providers globaux
 */
function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <MainLayout/>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;