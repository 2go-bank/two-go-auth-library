import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PlanFormHeaderProps {
  isEditing: boolean;
}

export const PlanFormHeader = ({ isEditing }: PlanFormHeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => navigate('/app/admin/plans')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>

      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Editar Plano' : 'Novo Plano'}
      </h1>
    </>
  );
};