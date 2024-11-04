import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validateCPF, validatePhone, formatCPF, formatPhone } from '@/utils/validations';

const BuyerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({
    cpf: '',
    phone: ''
  });

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCPF = formatCPF(e.target.value, formData.cpf);
    setFormData(prev => ({ ...prev, cpf: formattedCPF }));
    
    if (!validateCPF(formattedCPF)) {
      setErrors(prev => ({ ...prev, cpf: 'CPF inválido' }));
    } else {
      setErrors(prev => ({ ...prev, cpf: '' }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value, formData.phone);
    setFormData(prev => ({ ...prev, phone: formattedPhone }));
    
    if (!validatePhone(formattedPhone)) {
      setErrors(prev => ({ ...prev, phone: 'Telefone inválido' }));
    } else {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Dados do Comprador</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input 
              id="name" 
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Digite seu nome completo" 
              className="placeholder:text-[#CCCCCC]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input 
              id="cpf" 
              value={formData.cpf}
              onChange={handleCPFChange}
              placeholder="000.000.000-00" 
              className={`placeholder:text-[#CCCCCC] ${errors.cpf ? 'border-red-500' : ''}`}
            />
            {errors.cpf && <p className="text-sm text-red-500">{errors.cpf}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input 
              id="email" 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Digite seu e-mail" 
              className="placeholder:text-[#CCCCCC]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input 
              id="phone" 
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="(00) 00000-0000" 
              className={`placeholder:text-[#CCCCCC] ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuyerForm;