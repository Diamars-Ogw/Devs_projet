import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit2, Users, BookOpen } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Loader from "@/components/ui/Loader";

const MOCK_SPACES = [
  {
    id: 1,
    nom: "React Avancé",
    promotion: "Web Dev 2024",
    formateur: "Jean Martin",
    nb_etudiants: 45,
    semestre: 1,
  },
  {
    id: 2,
    nom: "Machine Learning",
    promotion: "Data Science",
    formateur: "Sophie Bernard",
    nb_etudiants: 38,
    semestre: 1,
  },
  {
    id: 3,
    nom: "Kubernetes",
    promotion: "DevOps 2024",
    formateur: "Pierre Laurent",
    nb_etudiants: 32,
    semestre: 2,
  },
];

const SpacesList = () => {
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSpaces(MOCK_SPACES);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Espaces Pédagogiques
          </h1>
          <p className="text-gray-600 mt-1">
            Gérer les cours et espaces d'enseignement
          </p>
        </div>
        <Button icon={Plus} onClick={() => navigate("/director/spaces/create")}>
          Créer un Espace
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.map((space) => (
          <Card key={space.id} className="card-hover">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {space.nom}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{space.promotion}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{space.nb_etudiants} étudiants</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BookOpen className="w-4 h-4" />
                  <span>Formateur: {space.formateur}</span>
                </div>
                <Badge variant="info">Semestre {space.semestre}</Badge>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button
                  size="sm"
                  variant="outline"
                  fullWidth
                  onClick={() => navigate(`/director/spaces/edit/${space.id}`)}
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
                <Button
                  size="sm"
                  fullWidth
                  onClick={() =>
                    navigate(`/director/spaces/${space.id}/enroll`)
                  }
                >
                  <Users className="w-4 h-4 mr-2" />
                  Inscrire
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SpacesList;
