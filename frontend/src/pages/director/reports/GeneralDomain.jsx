import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import Loader from "@/components/ui/Loader";
import { CHART_COLORS } from "@/utils/constants";

const MOCK_DATA = {
  moyenne_generale: 15.2,
  taux_reussite: 87,
  notes_distribution: [
    { range: "16-20", count: 18 },
    { range: "12-15", count: 24 },
    { range: "10-11", count: 8 },
    { range: "0-9", count: 2 },
  ],
  matieres: [
    { nom: "React", moyenne: 17.5 },
    { nom: "Node.js", moyenne: 15.5 },
    { nom: "TypeScript", moyenne: 16.0 },
  ],
};

const GeneralDomain = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [selectedPromotion, setSelectedPromotion] = useState("1");

  useEffect(() => {
    setTimeout(() => {
      setData(MOCK_DATA);
      setLoading(false);
    }, 500);
  }, [selectedPromotion]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Rapports & Statistiques
          </h1>
          <p className="text-gray-600 mt-1">Vue globale des performances</p>
        </div>
        <Select
          value={selectedPromotion}
          onChange={(e) => setSelectedPromotion(e.target.value)}
          options={[
            { value: "1", label: "Web Dev 2024" },
            { value: "2", label: "Data Science 2024" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Moyenne Générale">
          <div className="text-center">
            <div className="text-5xl font-bold text-gradient">
              {data.moyenne_generale}/20
            </div>
            <p className="text-gray-600 mt-2">Moyenne de la promotion</p>
          </div>
        </Card>

        <Card title="Taux de Réussite">
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600">
              {data.taux_reussite}%
            </div>
            <p className="text-gray-600 mt-2">Étudiants ayant la moyenne</p>
          </div>
        </Card>

        <Card title="Total Étudiants">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600">45</div>
            <p className="text-gray-600 mt-2">Inscrits dans la promotion</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Distribution des Notes">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.notes_distribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill={CHART_COLORS.purple} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Moyennes par Matière">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.matieres}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nom" />
              <YAxis domain={[0, 20]} />
              <Tooltip />
              <Bar dataKey="moyenne" fill={CHART_COLORS.blue} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default GeneralDomain;
