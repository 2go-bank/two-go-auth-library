import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { apiService } from '@/services/api';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp"

const ValidateOTP = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone;

  if (!phone) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#EFB207] mb-4">Erro</h1>
          <p className="text-gray-400 mb-4">Sessão expirada ou inválida</p>
          <Link to="/forgot-password" className="text-[#EFB207] hover:text-[#EFB207]/80">
            Voltar para recuperação de senha
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 5) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Por favor, preencha todos os dígitos do código",
      });
      return;
    }

    setIsLoading(true);

    try {
      const data = await apiService.auth.confirmPhone(phone, otp);
      localStorage.setItem('activation_code', data.activation_code);
      navigate('/reset-password');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "O código enviado está incorreto ou expirado",
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
          <h1 className="text-2xl font-bold text-[#EFB207]">Validar Código</h1>
          <p className="mt-2 text-gray-400">
            Digite o código de 5 dígitos enviado para seu Whatsapp
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="otp" className="text-[#EFB207]">Código</Label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={5}
                value={otp}
                onChange={setOtp}
                render={({ slots }) => (
                  <InputOTPGroup>
                    {slots.map((slot, idx) => (
                      <React.Fragment key={idx}>
                        <InputOTPSlot 
                          {...slot}
                          index={idx}
                          className="relative flex h-14 w-10 items-center justify-center border-b-2 border-black/70 bg-white text-black text-2xl font-semibold focus-within:border-[#EFB207] transition-all"
                        />
                        {idx !== slots.length - 1 && <InputOTPSeparator />}
                      </React.Fragment>
                    ))}
                  </InputOTPGroup>
                )}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#EFB207] hover:bg-[#EFB207]/90"
            disabled={isLoading}
          >
            {isLoading ? 'Validando...' : 'Validar'}
          </Button>
        </form>

        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-[#EFB207] hover:text-[#EFB207]/80">
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ValidateOTP;