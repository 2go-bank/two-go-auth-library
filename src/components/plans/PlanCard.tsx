import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/formatters';
import { Plan } from '@/types/user';
import { 
  CreditCard, 
  ShoppingBag, 
  Wallet, 
  Building2, 
  Landmark,
  Receipt,
  BadgeDollarSign,
  PiggyBank,
  Gift
} from 'lucide-react';

interface PlanCardProps {
  plan: Plan;
}

const getIconForProduct = (productName: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'Cartão': <CreditCard className="h-5 w-5" />,
    'Conta': <Wallet className="h-5 w-5" />,
    'Compras': <ShoppingBag className="h-5 w-5" />,
    'Empresarial': <Building2 className="h-5 w-5" />,
    'Banco': <Landmark className="h-5 w-5" />,
    'Fatura': <Receipt className="h-5 w-5" />,
    'Investimentos': <BadgeDollarSign className="h-5 w-5" />,
    'Poupança': <PiggyBank className="h-5 w-5" />,
    'Clube de Vantagens': <Gift className="h-5 w-5" />
  };

  const defaultIcon = <Gift className="h-5 w-5" />;
  return iconMap[productName] || defaultIcon;
};

const PlanCard = ({ plan }: PlanCardProps) => {
  const monthlyTotal = plan.products.reduce((sum, product) => sum + product.value, 0);
  const yearlyTotal = monthlyTotal * 10;

  const activeProducts = plan.products.filter(product => product.value > 0);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <h3 className="text-2xl font-bold text-center">{plan.name}</h3>
        <p className="text-sm text-center text-muted-foreground">{plan.description}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-3xl font-bold">{formatCurrency(monthlyTotal)}</p>
            <p className="text-sm text-muted-foreground">por mês</p>
          </div>
          <div className="space-y-2">
            {activeProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/10">
                {getIconForProduct(product.name)}
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center bg-secondary/20 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Plano anual sugerido</p>
            <p className="text-xl font-bold">{formatCurrency(yearlyTotal)}</p>
            <p className="text-sm text-muted-foreground">por ano</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Escolher Plano</Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;