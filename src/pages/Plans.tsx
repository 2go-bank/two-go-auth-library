import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import PlanCard from '@/components/plans/PlanCard';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plan } from '@/types/user';

interface PlansResponse {
  list: Plan[];
}

const Plans = () => {
  const { data, isLoading, error } = useQuery<PlansResponse>({
    queryKey: ['plans'],
    queryFn: () => apiService.plans.getPlans()
  });

  const plans = data?.list || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Erro ao carregar os planos. Por favor, tente novamente mais tarde.
        </AlertDescription>
      </Alert>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <Alert className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Nenhum plano disponível no momento.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Nossos Planos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan: Plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Plans;