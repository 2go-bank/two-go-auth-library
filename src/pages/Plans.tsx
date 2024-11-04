import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import PlanCard from '@/components/plans/PlanCard';
import { Loader2 } from 'lucide-react';

const Plans = () => {
  const { data: plans, isLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: apiService.plans.getPlans
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Nossos Planos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans?.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Plans;