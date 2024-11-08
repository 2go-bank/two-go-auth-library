import { useState } from 'react';
import { Plan } from '@/types/user';
import { CardHeader, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/utils/formatters';

interface CheckoutSummaryProps {
  plan: Plan;
  onBillingCycleChange: (cycle: 'yearly' | 'monthly') => void;
}

const CheckoutSummary = ({ plan, onBillingCycleChange }: CheckoutSummaryProps) => {
  const [billingCycle, setBillingCycle] = useState<'yearly' | 'monthly'>('yearly');
  const monthlyTotal = plan.products.reduce((sum, product) => sum + product.value, 0);
  const yearlyTotal = monthlyTotal * 10; // 2 months free in yearly plan

  const total = billingCycle === 'yearly' ? yearlyTotal : monthlyTotal;

  const handleBillingCycleChange = (value: string) => {
    const cycle = value as 'yearly' | 'monthly';
    setBillingCycle(cycle);
    onBillingCycleChange(cycle);
  };

  return (
    <>
      <CardHeader className="space-y-2">
        <h2 className="text-xl font-semibold text-center sm:text-left">Resumo do Pedido</h2>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-2 text-center sm:text-left">{plan.name}</h3>
          <p className="text-sm text-muted-foreground text-center sm:text-left">{plan.description}</p>
        </div>

        <div className="space-y-3">
          <p className="font-medium text-center sm:text-left">Ciclo de Cobrança</p>
          <RadioGroup
            defaultValue="yearly"
            value={billingCycle}
            onValueChange={handleBillingCycleChange}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yearly" id="yearly" />
              <Label htmlFor="yearly" className="flex-1">
                <span className="font-medium">Anual</span>
                <span className="block text-sm text-muted-foreground">
                  {formatCurrency(yearlyTotal)} por ano (2 meses grátis)
                </span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly" className="flex-1">
                <span className="font-medium">Mensal</span>
                <span className="block text-sm text-muted-foreground">
                  {formatCurrency(monthlyTotal)} por mês
                </span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="border-t pt-4">
          <div className="flex flex-col sm:flex-row justify-between gap-2 mb-2">
            <span>Valor {billingCycle === 'yearly' ? 'anual' : 'mensal'}</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-2 font-semibold text-lg">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default CheckoutSummary;