import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';
import { apiService } from '@/services/api';
import CryptoJS from 'crypto-js';
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const activationCode = localStorage.getItem('activation_code');

  const encryptData = (data: string) => {
    const secretKey = '2go-secret-key';
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  };

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$]/.test(password);

    return hasMinLength && hasUpperCase && hasLowerCase && (hasNumber || hasSymbol);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "As senhas não coincidem",
        className: "bg-red-600 text-white border-none"
      });
      return;
    }

    if (!validatePassword(password)) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "A senha não atende aos requisitos mínimos de segurança",
        className: "bg-red-600 text-white border-none"
      });
      return;
    }

    setIsLoading(true);

    try {
      const data = await apiService.auth.resetPassword(
        activationCode!,
        password,
        confirmPassword
      );

      localStorage.removeItem('activation_code');
      const encryptedData = encryptData(JSON.stringify(data));
      localStorage.setItem('2go-auth', encryptedData);
      
      const userData = await apiService.user.getProfile();
      const encryptedUserData = encryptData(JSON.stringify(userData));
      localStorage.setItem('2go-user', encryptedUserData);
      
      navigate('/home');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível alterar sua senha. Tente novamente.",
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
          <h1 className="text-2xl font-bold text-[#EFB207]">Nova Senha</h1>
          <p className="mt-2 text-gray-400">
            Digite sua nova senha
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#EFB207]">Nova Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 border-gray-700 text-white placeholder:text-gray-400 pr-10"
                placeholder="Digite sua nova senha"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <PasswordStrengthIndicator password={password} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-[#EFB207]">Confirme a Nova Senha</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-white/10 border-gray-700 text-white placeholder:text-gray-400 pr-10"
                placeholder="Digite novamente sua nova senha"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#EFB207] hover:bg-[#EFB207]/90"
            disabled={isLoading}
          >
            {isLoading ? 'Alterando...' : 'Alterar Senha'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;