import { Plan } from '@/types/user';
import { CardHeader, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';

interface CheckoutSummaryProps {
  plan: Plan;
}

const CheckoutSummary = ({ plan }: CheckoutSummaryProps) => {
  const monthlyTotal = plan.products.reduce((sum, product) => sum + product.value, 0);

  return (
    <>
      <CardHeader>
        <h2 className="text-xl font-semibold">Resumo do Pedido</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">{plan.name}</h3>
          <p className="text-sm text-muted-foreground">{plan.description}</p>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span>Valor mensal</span>
            <span>{formatCurrency(monthlyTotal)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatCurrency(monthlyTotal)}</span>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default CheckoutSummary;