import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, Scan } from 'lucide-react';
import CreditCardForm from './payment-methods/CreditCardForm';
import PixForm from './payment-methods/PixForm';

type PaymentMethod = 'credit' | 'pix';

interface PaymentMethodsProps {
  billingCycle: 'yearly' | 'monthly';
}

const PaymentMethods = ({ billingCycle }: PaymentMethodsProps) => {
  const [method, setMethod] = useState<PaymentMethod>('credit');

  // Reset to credit card if monthly plan is selected
  useEffect(() => {
    if (billingCycle === 'monthly') {
      setMethod('credit');
    }
  }, [billingCycle]);

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Forma de Pagamento</h2>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={method}
          onValueChange={(value) => setMethod(value as PaymentMethod)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <RadioGroupItem value="credit" id="credit" className="peer sr-only" />
            <Label
              htmlFor="credit"
              className="flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
            >
              <CreditCard className="h-6 w-6 mb-2" />
              <span>Cartão de Crédito</span>
            </Label>
          </div>
          {billingCycle === 'yearly' && (
            <div>
              <RadioGroupItem value="pix" id="pix" className="peer sr-only" />
              <Label
                htmlFor="pix"
                className="flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
              >
                <Scan className="h-6 w-6 mb-2" />
                <span>PIX</span>
              </Label>
            </div>
          )}
        </RadioGroup>

        <div className="mt-6">
          {method === 'credit' && <CreditCardForm />}
          {method === 'pix' && <PixForm />}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethods;