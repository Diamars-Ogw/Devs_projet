import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  TrendingUp,
  Calendar,
  MessageSquare,
  History,
  BarChart3,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Select from "@/components/ui/Select";

export default function MyGrades() {
  const [filter, setFilter] = useState("all");

  const [stats] = useState({
    average: 15.8,
    trend: "+0.8",
    total: 12,
    best: 18,
  });

  const [grades] = useState([
    {
      id: 1,
      work: "Projet React E-commerce",
      course: "React Avancé",
      grade: 18,
      date: "2024-01-10",
      comment:
        "Excellent travail ! L'application est complète et bien structurée. Le code est propre et les bonnes pratiques sont respectées.",
      teacher: "Sophie Martin",
    },
    {
      id: 2,
      work: "TP SQL Avancé",
      course: "Base de données",
      grade: 17,
      date: "2024-01-08",
      comment:
        "Très bon niveau. Les requêtes sont optimisées et performantes. Attention à la gestion des index.",
      teacher: "Jean Dupont",
    },
    {
      id: 3,
      work: "Mini-projet TypeScript",
      course: "TypeScript",
      grade: 16,
      date: "2024-01-05",
      comment:
        "Bien ! Bonne utilisation des types. Quelques points à améliorer sur les interfaces génériques.",
      teacher: "Marie Dubois",
    },
    {
      id: 4,
      work: "Application Next.js",
      course: "Next.js",
      grade: 15,
      date: "2024-01-03",
      comment:
        "Correct. L'application fonctionne bien mais pourrait être optimisée. Pensez au SSR.",
      teacher: "Pierre Laurent",
    },
    {
      id: 5,
      work: "TP Node.js API",
      course: "Node.js API",
      grade: 14,
      date: "2023-12-28",
      comment:
        "Passable. L'API fonctionne mais manque de gestion d'erreurs robuste.",
      teacher: "Sophie Martin",
    },
  ]);

  const courseAverages = [
    { course: "React Avancé", average: 16.5, count: 3 },
    { course: "TypeScript", average: 17.2, count: 4 },
    { course: "Node.js API", average: 15.0, count: 2 },
    { course: "Next.js", average: 14.8, count: 2 },
  ];

  const gradeDistribution = [
    { name: "16-20", value: 5, color: "#10b981" },
    { name: "14-15", value: 4, color: "#3b82f6" },
    { name: "12-13", value: 2, color: "#f59e0b" },
    { name: "0-11", value: 1, color: "#ef4444" },
  ];

  const filteredGrades = grades.filter((grade) => {
    if (filter === "all") return true;
    return grade.course === filter;
  });

  const getGradeColor = (grade) => {
    if (grade >= 16) return "text-green-600 bg-green-100";
    if (grade >= 14) return "text-blue-600 bg-blue-100";
    if (grade >= 12) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  const getGradeLabel = (grade) => {
    if (grade >= 16) return "Excellent";
    if (grade >= 14) return "Bien";
    if (grade >= 12) return "Passable";
    return "Insuffisant";
  };

  return (
    <div className="space-y-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mes Notes
          </h1>
          <p className="text-gray-600 mt-1">
            Consultez vos évaluations et votre progression
          </p>
        </div>
        <Link to="/student/grades/history">
          <Button
            variant="outline"
            className="border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <History className="w-4 h-4 mr-2" />
            Historique complet
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-white border-green-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Moyenne Générale
              </p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                {stats.average}/20
              </h3>
              <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {stats.trend}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Notes</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                {stats.total}
              </h3>
              <p className="text-blue-600 text-sm mt-2">Ce semestre</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Meilleure Note
              </p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                {stats.best}/20
              </h3>
              <p className="text-purple-600 text-sm mt-2">React E-commerce</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Dernière Note</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">18/20</h3>
              <p className="text-orange-600 text-sm mt-2">Il y a 2 jours</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grades List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filter */}
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <Award className="w-5 h-5 text-gray-600" />
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="flex-1"
              >
                <option value="all">Toutes les matières</option>
                {courseAverages.map((course, idx) => (
                  <option key={idx} value={course.course}>
                    {course.course}
                  </option>
                ))}
              </Select>
            </div>
          </Card>

          {/* Grades */}
          <div className="space-y-4">
            {filteredGrades.map((grade) => (
              <Card
                key={grade.id}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {grade.work}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{grade.course}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(grade.date).toLocaleDateString("fr-FR")}
                      </span>
                      <span>•</span>
                      <span>Prof. {grade.teacher}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className={`text-3xl font-bold px-4 py-2 rounded-xl ${getGradeColor(
                        grade.grade
                      )}`}
                    >
                      {grade.grade}/20
                    </div>
                    <Badge
                      variant={
                        grade.grade >= 16
                          ? "success"
                          : grade.grade >= 14
                          ? "info"
                          : "warning"
                      }
                      className="mt-2"
                    >
                      {getGradeLabel(grade.grade)}
                    </Badge>
                  </div>
                </div>

                {/* Comment */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900 mb-1">
                        Commentaire du formateur
                      </p>
                      <p className="text-sm text-gray-700">{grade.comment}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          {/* Course Averages */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Moyennes par Matière
            </h3>
            <div className="space-y-4">
              {courseAverages.map((course, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {course.course}
                    </span>
                    <span
                      className={`text-lg font-bold ${
                        getGradeColor(course.average).split(" ")[0]
                      }`}
                    >
                      {course.average}/20
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: `${(course.average / 20) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {course.count} note{course.count > 1 ? "s" : ""}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Grade Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Distribution des Notes
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
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
