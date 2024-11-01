import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [phone, setPhone] = useState('');
  const [isForeigner, setIsForeigner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length > 11) return phone;
    
    let formatted = numbers;
    if (numbers.length > 2) formatted = formatted.replace(/^(\d{2})/, '($1) ');
    if (numbers.length > 7) formatted = formatted.replace(/(\d{5})/, '$1-');
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (isForeigner) {
      setPhone(input.replace(/[^\d+\s-]/g, ''));
    } else {
      const formatted = formatPhoneNumber(input);
      setPhone(formatted);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const cleanPhone = phone.replace(/\D/g, '');
    
    try {
      const response = await fetch(`https://api.2gopag.com/mobile/validate-phone/${cleanPhone}`, {
        method: 'GET'
      });

      if (response.status === 200) {
        navigate('/validate-otp', { state: { phone: cleanPhone } });
      } else {
        toast({
          variant: "destructive",
          title: "Número de telefone não localizado",
          className: "bg-red-600 text-white border-none"
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Número de telefone não localizado",
        className: "bg-red-600 text-white border-none"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md space-y-8 p-8 bg-black rounded-lg shadow-lg">
        <div className="flex justify-center mb-8">
          <img 
            src={import.meta.env.VITE_LOGO_URL}
            alt="2GO Bank Logo" 
            className="h-12"
          />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#EFB207]">Recuperar Senha</h1>
          <p className="mt-2 text-gray-400">
            Digite seu número de telefone para receber as instruções de recuperação
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[#EFB207]">Telefone</Label>
            <Input
              id="phone"
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              placeholder={isForeigner ? "Digite seu telefone" : "(99) 99999-9999"}
              className="bg-white/10 border-gray-700 text-white placeholder:text-[#666666]"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="foreigner"
              checked={isForeigner}
              onCheckedChange={(checked) => {
                setIsForeigner(checked as boolean);
                setPhone('');
              }}
              className="border-[#EFB207] data-[state=checked]:bg-[#EFB207]"
            />
            <label
              htmlFor="foreigner"
              className="text-sm font-medium leading-none text-[#EFB207]"
            >
              Sou estrangeiro
            </label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#EFB207] hover:bg-[#EFB207]/90"
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Solicitar código'}
          </Button>
        </form>

        <div className="text-center mt-4">
          <Link to="/login" className="text-[#EFB207] hover:text-[#EFB207]/80">
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;