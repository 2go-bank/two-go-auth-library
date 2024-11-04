import { useLocation } from 'react-router-dom';
import { Plan } from '@/types/user';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';
import BuyerForm from '@/components/checkout/BuyerForm';
import PaymentMethods from '@/components/checkout/PaymentMethods';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

const Checkout = () => {
  const location = useLocation();
  const plan = location.state?.plan as Plan;
  const [billingCycle, setBillingCycle] = useState<'yearly' | 'monthly'>('yearly');

  if (!plan) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Erro ao carregar plano</h1>
        <p>Nenhum plano foi selecionado para checkout.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <BuyerForm />
          <PaymentMethods billingCycle={billingCycle} />
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CheckoutSummary 
              plan={plan} 
              onBillingCycleChange={(cycle) => setBillingCycle(cycle)} 
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;