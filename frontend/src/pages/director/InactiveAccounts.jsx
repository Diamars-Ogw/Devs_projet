import { useState, useEffect } from "react";
import { Mail, Trash2, Send } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Loader from "@/components/ui/Loader";

const MOCK_INACTIVE = [
  {
    id: 4,
    nom: "Bernard",
    prenom: "Pierre",
    email: "pierre.bernard@academie.fr",
    role: "ETUDIANT",
    jours_restants: 23,
  },
  {
    id: 6,
    nom: "Roux",
    prenom: "Laura",
    email: "laura.roux@academie.fr",
    role: "ETUDIANT",
    jours_restants: 15,
  },
];

const InactiveAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setAccounts(MOCK_INACTIVE);
      setLoading(false);
    }, 500);
  }, []);

  const handleSendReminder = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert("Email de relance envoyé !");
  };

  const handleBulkSend = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert(`${selected.length} emails envoyés !`);
    setSelected([]);
  };

  const handleDelete = async (id) => {
    if (confirm("Supprimer ce compte ?")) {
      setAccounts(accounts.filter((a) => a.id !== id));
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Comptes Inactifs</h1>
          <p className="text-gray-600 mt-1">Gérer les comptes non activés</p>
        </div>
        {selected.length > 0 && (
          <Button onClick={handleBulkSend} icon={Send}>
            Envoyer à {selected.length} compte(s)
          </Button>
        )}
      </div>

      <Card>
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelected(
                      e.target.checked ? accounts.map((a) => a.id) : []
                    )
                  }
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Utilisateur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Rôle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Jours Restants
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {accounts.map((account) => (
              <tr key={account.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selected.includes(account.id)}
                    onChange={(e) =>
                      setSelected((prev) =>
                        e.target.checked
                          ? [...prev, account.id]
                          : prev.filter((id) => id !== account.id)
                      )
                    }
                  />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {account.nom} {account.prenom}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {account.email}
                </td>
                <td className="px-6 py-4">
                  <Badge variant="warning">{account.role}</Badge>
                </td>
                <td className="px-6 py-4 text-sm text-red-600 font-medium">
                  {account.jours_restants} jours
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleSendReminder(account.id)}
                    className="text-purple-600 hover:text-purple-900 mr-3"
                  >
                    <Mail className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(account.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default InactiveAccounts;
