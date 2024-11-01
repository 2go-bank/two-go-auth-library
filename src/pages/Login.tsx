import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import LoginForm from '@/components/auth/LoginForm';
import CryptoJS from 'crypto-js';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const encryptData = (data: string) => {
    const secretKey = '2go-secret-key';
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  };

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true);

    const payload = {
      username,
      password,
      client_id: '2go-api',
      grant_type: 'password'
    };

    try {
      const response = await fetch(import.meta.env.VITE_AUTH_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.status === 200) {
        const data = await response.json();
        const encryptedData = encryptData(JSON.stringify(data));
        localStorage.setItem('2go-auth', encryptedData);
        navigate('/home');
      } else if (response.status === 401) {
        toast({
          variant: "destructive",
          title: "Usuário ou senha incorretos",
          className: "bg-red-600 text-white border-none"
        });
      } else {
        toast({
          variant: "destructive",
          title: "Houve um erro ao se comunicar com a 2GO. Por favor entre em contato com nosso atendimento",
          className: "bg-red-600 text-white border-none"
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Houve um erro ao se comunicar com a 2GO. Por favor entre em contato com nosso atendimento",
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
        
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-[#EFB207] hover:underline">
            Esqueci minha senha
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;