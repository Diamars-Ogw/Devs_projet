import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Users } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

const MOCK_STUDENTS = [
  {
    id: 1,
    nom: "Durand",
    prenom: "Marie",
    matricule: "ETU001",
    inscrit: false,
  },
  {
    id: 2,
    nom: "Bernard",
    prenom: "Pierre",
    matricule: "ETU002",
    inscrit: true,
  },
  { id: 3, nom: "Petit", prenom: "Julie", matricule: "ETU003", inscrit: false },
];

const EnrollStudents = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setStudents(MOCK_STUDENTS);
      setSelectedIds(MOCK_STUDENTS.filter((s) => s.inscrit).map((s) => s.id));
      setLoading(false);
    }, 500);
  }, [id]);

  const toggleStudent = (studentId) => {
    setSelectedIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate("/director/spaces");
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/director/spaces")}
          icon={ArrowLeft}
        >
          Retour
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Inscrire des Étudiants
          </h1>
          <p className="text-gray-600 mt-1">
            Sélectionnez les étudiants à inscrire
          </p>
        </div>
      </div>

      <Card title="Liste des Étudiants">
        <div className="space-y-2">
          {students.map((student) => (
            <label
              key={student.id}
              className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(student.id)}
                onChange={() => toggleStudent(student.id)}
                className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {student.nom} {student.prenom}
                </p>
                <p className="text-sm text-gray-500">{student.matricule}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {selectedIds.length} étudiant(s) sélectionné(s)
          </p>
          <Button onClick={handleSubmit} icon={Save}>
            Valider l'Inscription
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EnrollStudents;
