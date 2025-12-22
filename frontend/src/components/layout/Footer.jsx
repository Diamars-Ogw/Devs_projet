// frontend/src/components/layout/Footer.jsx
import React from 'react';

/**
 * Composant Footer optionnel
 */
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} EduPlatform. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">
              Aide
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">
              Documentation
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;