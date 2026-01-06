import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  FileText,
  Clock,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Plus,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function TrainerDashboard() {
  // Données mockées
  const [stats] = useState({
    espaces: 4,
    espacesTrend: "+1%",
    travaux: 8,
    travauxTrend: "+2%",
    aCorrect: 15,
    correctTrend: "3%",
    corrected: 42,
    correctedTrend: "+8%",
  });

  const [recentSubmissions] = useState([
    {
      id: 1,
      student: "Marie Dupont",
      work: "Projet React E-commerce",
      time: "Il y a 2h",
      initials: "MD",
      color: "from-purple-400 to-pink-400",
    },
    {
      id: 2,
      student: "Jean Martin",
      work: "TP Node.js API REST",
      time: "Il y a 4h",
      initials: "JM",
      color: "from-blue-400 to-cyan-400",
    },
    {
      id: 3,
      student: "Sophie Bernard",
      work: "Projet React",
      time: "Il y a 1j",
      initials: "SB",
      color: "from-green-400 to-emerald-400",
      grade: "18/20",
      status: "Corrigé",
    },
    {
      id: 4,
      student: "Pierre Laurent",
      work: "TP SQL Avancé",
      time: "Il y a 2j",
      initials: "PL",
      color: "from-orange-400 to-amber-400",
      grade: "16/20",
      status: "Corrigé",
    },
  ]);

  const [spaceProgress] = useState([
    {
      name: "React Avancé",
      students: 45,
      works: 3,
      progress: 78,
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Node.js API",
      students: 45,
      works: 2,
      progress: 92,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "TypeScript",
      students: 42,
      works: 4,
      progress: 65,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      name: "Next.js",
      students: 38,
      works: 2,
      progress: 85,
      color: "from-teal-500 to-teal-600",
    },
  ]);

  const activityData = [
    { month: "Sep", corrections: 32 },
    { month: "Oct", corrections: 42 },
    { month: "Nov", corrections: 38 },
    { month: "Déc", corrections: 45 },
  ];

  const gradesDistribution = [
    { range: "16-20", count: 18, color: "#10b981" },
    { range: "12-15", count: 22, color: "#3b82f6" },
    { range: "10-11", count: 7, color: "#f59e0b" },
    { range: "0-9", count: 2, color: "#ef4444" },
  ];

  return (
    <div className="space-y-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Dashboard Formateur
          </h1>
          <p className="text-gray-600 mt-1">
            Vue d'ensemble de vos cours et travaux à corriger
          </p>
        </div>
        <Link to="/trainer/works/create">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Plus className="w-5 h-5 mr-2" />
            Créer un Travail
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Mes Espaces</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                {stats.espaces}
              </h3>
              <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {stats.espacesTrend}
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Travaux en Cours
              </p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                {stats.travaux}
              </h3>
              <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {stats.travauxTrend}
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <FileText className="w-7 h-7 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">À Corriger</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                {stats.aCorrect}
              </h3>
              <p className="text-orange-600 text-sm mt-2 flex items-center gap-1">
                <span className="font-semibold">{stats.correctTrend}</span>
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
              <Clock className="w-7 h-7 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-white border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Corrigés</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                {stats.corrected}
              </h3>
              <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {stats.correctedTrend}
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Derniers Rendus */}
        <Card className="hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-bold text-gray-900">
                Derniers Rendus
              </h3>
            </div>
            <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
              {recentSubmissions.filter((s) => !s.status).length} à corriger
            </span>
          </div>

          <div className="space-y-3">
            {recentSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sub.color} flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform`}
                  >
                    {sub.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{sub.student}</p>
                    <p className="text-sm text-gray-600">{sub.work}</p>
                    <p className="text-xs text-gray-500">{sub.time}</p>
                  </div>
                </div>
                {sub.status ? (
                  <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-lg">
                    {sub.grade}
                  </span>
                ) : (
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Corriger
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Progression par Espace */}
        <Card className="hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-900">
              Progression par Espace
            </h3>
          </div>

          <div className="space-y-4">
            {spaceProgress.map((space, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{space.name}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        {space.students} étudiants
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {space.works} travaux
                      </span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {space.progress}%
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${space.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${space.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-900">
              Activité de Correction
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="corrections"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: "#8b5cf6", r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">
              Distribution des Notes
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gradesDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="range" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]}>
                {gradesDistribution.map((entry, index) => (
                  <Bar key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
