// ============================================
// PAGE DE CONNEXION - AVEC BACKEND RÉEL
// Fichier: src/pages/auth/Login.jsx
// ============================================

import { useState } from "react";
import { GraduationCap, Mail, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

// 🔐 COMPTES RÉELS DE LA BASE DE DONNÉES
// ⚠️ Ces comptes existent dans ta DB (backend/database/seed.sql)
const DEMO_ACCOUNTS = [
  {
    email: "jean.dupont@academie.fr",
    password: "password123", // Hash bcrypt dans la DB
    role: "Directeur",
    color: "blue",
  },
  {
    email: "jean.martin@academie.fr",
    password: "password123",
    role: "Formateur",
    color: "pink",
  },
  {
    email: "marie.durand@academie.fr",
    password: "password123",
    role: "Étudiant",
    color: "purple",
  },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      // La redirection est gérée automatiquement par le AuthContext
    } catch (err) {
      setError(
        err.response?.data?.message || "Email ou mot de passe incorrect"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fonction pour pré-remplir EMAIL + MOT DE PASSE (comptes de démo)
  const fillDemoAccount = (account) => {
    setEmail(account.email);
    setPassword(account.password); // ✅ Remplit aussi le mot de passe
    setError(""); // Efface les erreurs précédentes
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card principale */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-slide-up">
          {/* Logo animé avec étoile qui tourne */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-primary-500 rounded-2xl flex items-center justify-center animate-pulse-slow shadow-lg">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              {/* Étoile animée */}
              <div className="absolute -top-1 -right-1 text-2xl animate-spin-slow">
                ⭐
              </div>
            </div>
          </div>

          {/* Titre avec gradient */}
          <h1 className="text-3xl font-bold text-center text-gradient mb-2">
            EduPlatform
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Connectez-vous pour accéder à votre espace
          </p>

          {/* Formulaire de connexion */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="exemple@academie.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              required
            />

            <Input
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              required
            />

            {/* Message d'erreur */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm animate-slide-down">
                {error}
              </div>
            )}

            {/* Lien mot de passe oublié */}
            <div className="text-right">
              <a
                href="#"
                className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
              >
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton de connexion */}
            <Button
              type="submit"
              fullWidth
              loading={loading}
              className="shadow-lg"
            >
              Se connecter
            </Button>
          </form>

          {/* Comptes de démonstration */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-3 font-medium">
              COMPTES DE DÉMONSTRATION
            </p>
            <div className="space-y-2">
              {DEMO_ACCOUNTS.map((account) => (
                <button
                  key={account.email}
                  onClick={() => fillDemoAccount(account)}
                  type="button"
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all group"
                >
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {account.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      Mot de passe: password123
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium bg-${account.color}-100 text-${account.color}-700`}
                  >
                    {account.role}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          © 2025 EduPlatform - Tous droits réservés
        </p>
      </div>
    </div>
  );
};

export default Login;