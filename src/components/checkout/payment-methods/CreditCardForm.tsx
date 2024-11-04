import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard } from 'lucide-react';

// Mock data for saved cards
const savedCards = [
  { id: '1', last4: '4242', brand: 'Visa', expiry: '12/25' },
  { id: '2', last4: '5555', brand: 'Mastercard', expiry: '08/24' },
];

const CreditCardForm = () => {
  const [useNewCard, setUseNewCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(savedCards[0]?.id);

  return (
    <div className="space-y-6">
      {savedCards.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Cartões Salvos</h3>
          <RadioGroup
            value={useNewCard ? 'new' : selectedCard}
            onValueChange={(value) => {
              if (value === 'new') {
                setUseNewCard(true);
              } else {
                setUseNewCard(false);
                setSelectedCard(value);
              }
            }}
            className="space-y-3"
          >
            {savedCards.map((card) => (
              <div key={card.id} className="flex items-center space-x-3">
                <RadioGroupItem value={card.id} id={`card-${card.id}`} />
                <Label htmlFor={`card-${card.id}`} className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4" />
                  <span>
                    {card.brand} terminado em {card.last4} (Expira em {card.expiry})
                  </span>
                </Label>
              </div>
            ))}
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="new" id="new-card" />
              <Label htmlFor="new-card">Usar outro cartão</Label>
            </div>
          </RadioGroup>
        </div>
      )}

      {(useNewCard || savedCards.length === 0) && (
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
        </div>
      )}
      
      <Button className="w-full">Finalizar Pagamento</Button>
    </div>
  );
};

export default CreditCardForm;