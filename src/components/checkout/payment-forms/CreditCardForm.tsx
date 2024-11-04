import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const CreditCardForm = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="card-number">Número do Cartão</Label>
        <Input id="card-number" placeholder="0000 0000 0000 0000" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Validade</Label>
          <Input id="expiry" placeholder="MM/AA" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input id="cvv" placeholder="123" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="card-name">Nome no Cartão</Label>
        <Input id="card-name" placeholder="Nome como está no cartão" />
      </div>
      <Button className="w-full">Finalizar Pagamento</Button>
    </div>
  );
};

export default CreditCardForm;