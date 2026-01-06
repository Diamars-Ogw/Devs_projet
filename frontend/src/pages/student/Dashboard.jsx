import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Clock, TrendingUp, Award, Calendar, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function StudentDashboard() {
  const [stats] = useState({
    courses: 4,
    pendingWorks: 3,
    average: 15.8,
    completedWorks: 12,
  });

  const [upcomingDeadlines] = useState([
    {
      id: 1,
      title: "Projet React E-commerce",
      course: "React Avancé",
      deadline: "2024-01-15",
      daysLeft: 3,
      status: "urgent",
    },
    {
      id: 2,
      title: "TP Node.js API REST",
      course: "Node.js API",
      deadline: "2024-01-20",
      daysLeft: 8,
      status: "warning",
    },
    {
      id: 3,
      title: "Mini-projet TypeScript",
      course: "TypeScript",
      deadline: "2024-01-25",
      daysLeft: 13,
      status: "normal",
    },
  ]);

  const [recentGrades] = useState([
    { id: 1, work: "TP SQL Avancé", course: "Base de données", grade: 18, date: "2024-01-10" },
    { id: 2, work: "Projet PHP", course: "Développement Web", grade: 16, date: "2024-01-08" },
    { id: 3, work: "TP JavaScript", course: "JavaScript", grade: 17, date: "2024-01-05" },
  ]);

  const progressData = [
    { month: "Sep", moyenne: 13 },
    { month: "Oct", moyenne: 14 },
    { month: "Nov", moyenne: 15 },
    { month: "Déc", moyenne: 15.8 },
  ];

  const skillsData = [
    { subject: "React", score: 85 },
    { subject: "Node.js", score: 78 },
    { subject: "TypeScript", score: 72 },
    { subject: "SQL", score: 90 },
    { subject: "CSS", score: 80 },
  ];

  const getStatusColor = (status) => {
    if (status === "urgent") return "text-red-600 bg-red-50 border-red-200";
    if (status === "warning") return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-blue-600 bg-blue-50 border-blue-200";
  };

  const getGradeColor = (grade) => {
    if (grade >= 16) return "text-green-600 bg-green-100";
    if (grade >= 14) return "text-blue-600 bg-blue-100";
    if (grade >= 12) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="space-y-6 animate-slideUp">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard Étudiant
        </h1>
        <p className="text-gray-600 mt-1">Bienvenue sur votre espace personnel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Mes Cours</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.courses}</h3>
              <p className="text-blue-600 text-sm mt-2">Actifs</p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">À Rendre</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingWorks}</h3>
              <p className="text-orange-600 text-sm mt-2">Travaux</p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
              <Clock className="w-7 h-7 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-white border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Moyenne Générale</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.average}/20</h3>
              <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +0.8
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
              <Award className="w-7 h-7 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Travaux Rendus</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.completedWorks}</h3>
              <p className="text-purple-600 text-sm mt-2">Ce semestre</p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
              <FileText className="w-7 h-7 text-white" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <Card className="hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-bold text-gray-900">Prochaines Échéances</h3>
          </div>

          <div className="space-y-3">
            {upcomingDeadlines.map((deadline) => (
              <div
                key={deadline.id}
                className={`p-4 rounded-xl border-2 ${getStatusColor(deadline.status)} transition-all hover:shadow-md`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{deadline.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{deadline.course}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>Échéance: {new Date(deadline.deadline).toLocaleDateString("fr-FR")}</span>
                    </div>
                  </div>
                  <Badge variant={deadline.status === "urgent" ? "danger" : "warning"}>
                    {deadline.daysLeft}j
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <Link to="/student/works">
            <Button variant="outline" fullWidth className="mt-4 border-blue-200 text-blue-600 hover:bg-blue-50">
              Voir tous les travaux
            </Button>
          </Link>
        </Card>

        {/* Recent Grades */}
        <Card className="hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-bold text-gray-900">Dernières Notes</h3>
          </div>

          <div className="space-y-3">
            {recentGrades.map((grade) => (
              <div
                key={grade.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{grade.work}</h4>
                  <p className="text-sm text-gray-600">{grade.course}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(grade.date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${getGradeColor(grade.grade)}`}>
                  {grade.grade}/20
                </div>
              </div>
            ))}
          </div>

          <Link to="/student/grades">
            <Button variant="outline" fullWidth className="mt-4 border-green-200 text-green-600 hover:bg-green-50">
              Voir toutes mes notes
            </Button>
          </Link>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Évolution de ma Moyenne</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" domain={[0, 20]} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
              <Line type="monotone" dataKey="moyenne" stroke="#3b82f6" strokeWidth={3} dot={{ fill: "#3b82f6", r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-900">Mes Compétences</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={skillsData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" stroke="#6b7280" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6b7280" />
              <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
            </RadarChart>
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