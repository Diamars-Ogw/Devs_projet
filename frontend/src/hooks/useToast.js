// ============================================
// HOOK TOAST POUR NOTIFICATIONS
// Fichier: src/hooks/useToast.js
// ============================================

import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-suppression après 5 secondes
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback((message) => addToast(message, 'success'), [addToast]);
  const error = useCallback((message) => addToast(message, 'error'), [addToast]);
  const warning = useCallback((message) => addToast(message, 'warning'), [addToast]);
  const info = useCallback((message) => addToast(message, 'info'), [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };
};

export default useToast;