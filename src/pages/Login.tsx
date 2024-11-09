import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { LoginForm } from '@/components/auth/LoginForm';
import CryptoJS from 'crypto-js';
import { requestNotificationPermission } from '@/config/firebase';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import MicrosoftLogo from '@/components/icons/MicrosoftLogo';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMicrosoftLoading, setIsMicrosoftLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { code } = useParams();
  const [logoUrl, setLogoUrl] = useState((window as any).env?.VITE_LOGO_URL || import.meta.env.VITE_LOGO_URL);

  useEffect(() => {
    const handleEnvUpdate = () => {
      setLogoUrl((window as any).env?.VITE_LOGO_URL || import.meta.env.VITE_LOGO_URL);
    };

    window.addEventListener('env-updated', handleEnvUpdate);
    
    if (code) {
      handleMicrosoftCallback(code);
    }
    
    return () => window.removeEventListener('env-updated', handleEnvUpdate);
  }, [code]);

  const encryptData = (data: string) => {
    const secretKey = '2go-secret-key';
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  };

  const handleMicrosoftLogin = () => {
    setIsMicrosoftLoading(true);
    try {
      window.location.href = 'http://api.2gopag.com/v3/api/microsoft/auth/1';
    } catch (error) {
      setIsMicrosoftLoading(false);
      toast({
        variant: "destructive",
        title: "Erro ao redirecionar",
        description: "Não foi possível iniciar o login com Microsoft. Tente novamente.",
        className: "bg-red-600 text-white border-none"
      });
    }
  };

  const handleMicrosoftCallback = async (authCode: string) => {
    try {
      const response = await fetch(`https://api.2gopag.com/v3/api/microsoft/token/${authCode}`);
      
      if (response.ok) {
        const data = await response.json();
        const encryptedData = encryptData(JSON.stringify(data));
        localStorage.setItem('2go-auth', encryptedData);
        
        await requestNotificationPermission();
        
        navigate('/app');
      } else {
        toast({
          variant: "destructive",
          title: "Erro na autenticação Microsoft",
          description: "Não foi possível completar o login. Tente novamente.",
          className: "bg-red-600 text-white border-none"
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro na autenticação",
        description: "Houve um erro ao processar sua autenticação. Tente novamente.",
        className: "bg-red-600 text-white border-none"
      });
    }
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
        
        await requestNotificationPermission();
        
        navigate('/app');
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
    <div className="min-h-screen bg-black">
      <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-md space-y-8 p-8 bg-black rounded-lg shadow-lg">
          <div className="flex justify-center mb-8">
            <img 
              src={logoUrl}
              alt="2GO Bank Logo" 
              className="h-12"
            />
          </div>
          
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

          <div className="text-center mt-4 flex justify-between items-center">
            <Link to="/forgot-password" className="text-[#EFB207] hover:underline">
              Recuperar senha
            </Link>
            <Link to="/register" className="text-[#EFB207] hover:underline">
              Cadastre-se
            </Link>
          </div>

          <Separator className="my-4" />

          <Button 
            variant="outline" 
            className="w-full h-12 flex items-center justify-center gap-3 text-white bg-[#2F2F2F] hover:bg-[#404040] border-none transition-colors disabled:opacity-70"
            onClick={handleMicrosoftLogin}
            disabled={isMicrosoftLoading}
          >
            {isMicrosoftLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Redirecionando...</span>
              </>
            ) : (
              <>
                <MicrosoftLogo />
                <span>Entrar com Microsoft</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;