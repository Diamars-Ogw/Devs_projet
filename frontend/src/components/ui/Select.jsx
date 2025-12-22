// frontend/src/components/ui/Select.jsx
import React from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Composant Select réutilisable
 * @param {string} label - Label du select
 * @param {array} options - Options du select [{value, label}]
 * @param {string} value - Valeur sélectionnée
 * @param {function} onChange - Handler du changement
 * @param {string} placeholder - Placeholder
 * @param {string} error - Message d'erreur
 * @param {boolean} required - Champ requis
 * @param {boolean} disabled - Désactiver le select
 */
const Select = ({ 
  label, 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Sélectionner...', 
  error,
  required = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full px-4 py-2 pr-10 border rounded-lg appearance-none
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'}
            focus:outline-none focus:ring-2 
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-all duration-200
            bg-white
          `}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Select;