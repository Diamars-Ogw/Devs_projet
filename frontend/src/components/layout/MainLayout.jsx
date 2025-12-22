// frontend/src/components/layout/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Header from './Header';
import Sidebar from './Sidebar';

/**
 * Layout principal de l'application
 * Intègre le Header, la Sidebar et le contenu principal
 */
const MainLayout = () => {
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Sidebar */}
      <Sidebar role={user?.role} user={user} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        {/* Header */}
        <Header user={user} onLogout={handleLogout} />
        
        {/* Page Content (Outlet pour React Router) */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        
      </div>
      
    </div>
  );
};

export default MainLayout;