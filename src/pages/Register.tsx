import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length > 11) return cpf;
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length > 11) return phone;
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would implement the registration logic
      toast({
        title: "Registro em desenvolvimento",
        description: "Esta funcionalidade será implementada em breve.",
        className: "bg-yellow-600 text-white border-none"
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
          <h1 className="text-2xl font-bold text-[#EFB207]">Cadastro</h1>
          <p className="mt-2 text-gray-400">
            Preencha seus dados para criar sua conta
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cpf" className="text-[#EFB207]">CPF</Label>
            <Input
              id="cpf"
              type="text"
              value={cpf}
              onChange={(e) => setCpf(formatCPF(e.target.value))}
              placeholder="000.000.000-00"
              className="bg-white/10 border-gray-700 text-white placeholder:text-gray-400"
              required
              maxLength={14}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate" className="text-[#EFB207]">Data de Nascimento</Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="bg-white/10 border-gray-700 text-white placeholder:text-gray-400"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[#EFB207]">Telefone Celular</Label>
            <Input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              placeholder="(00) 00000-0000"
              className="bg-white/10 border-gray-700 text-white placeholder:text-gray-400"
              required
              maxLength={15}
              disabled={isLoading}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#EFB207] hover:bg-[#EFB207]/90"
            disabled={isLoading}
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </form>

        <div className="text-center mt-4">
          <Link to="/login" className="text-[#EFB207] hover:underline">
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;