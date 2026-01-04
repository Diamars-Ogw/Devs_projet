import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Loader from '@/components/ui/Loader';
import { NIVEAUX_ETUDES } from '@/utils/constants';

const EditPromotion = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setFormData({
        id: 1,
        nom: 'Web Dev Full Stack 2024',
        code: 'WD2024',
        annee_academique: 2024,
        niveau_etudes: 'L3',
        date_debut: '2024-09-01',
        date_fin: '2025-06-30',
        capacite_max: 50,
        description: 'Formation complète en développement web',
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/director/promotions');
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/director/promotions')} icon={ArrowLeft}>Retour</Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Modifier la Promotion</h1>
          <p className="text-gray-600 mt-1">{formData.nom}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card title="Informations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Nom" name="nom" value={formData.nom} onChange={handleChange} required />
            <Input label="Code" name="code" value={formData.code} onChange={handleChange} required />
            <Input label="Année" name="annee_academique" type="number" value={formData.annee_academique} onChange={handleChange} required />
            <Select label="Niveau" name="niveau_etudes" value={formData.niveau_etudes} onChange={handleChange} options={NIVEAUX_ETUDES} />
            <Input label="Date Début" name="date_debut" type="date" value={formData.date_debut} onChange={handleChange} />
            <Input label="Date Fin" name="date_fin" type="date" value={formData.date_fin} onChange={handleChange} />
            <Input label="Capacité" name="capacite_max" type="number" value={formData.capacite_max} onChange={handleChange} />
            <div className="md:col-span-2">
              <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} />
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="secondary" onClick={() => navigate('/director/promotions')}>Annuler</Button>
          <Button type="submit" loading={saving} icon={Save}>Enregistrer</Button>
        </div>
      </form>
    </div>
  );
};

export default EditPromotion;