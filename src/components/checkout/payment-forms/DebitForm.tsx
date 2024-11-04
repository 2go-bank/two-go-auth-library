import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DebitForm = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="bank">Banco</Label>
        <Select>
          <SelectTrigger id="bank">
            <SelectValue placeholder="Selecione seu banco" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="001">Banco do Brasil</SelectItem>
            <SelectItem value="237">Bradesco</SelectItem>
            <SelectItem value="341">Itaú</SelectItem>
            <SelectItem value="033">Santander</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="agency">Agência</Label>
        <Input id="agency" placeholder="0000" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="account">Conta</Label>
        <Input id="account" placeholder="00000-0" />
      </div>
      <Button className="w-full">Finalizar Pagamento</Button>
    </div>
  );
};

export default DebitForm;