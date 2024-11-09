import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  LoginForm, 
  LoginHeader, 
  LoginFooter, 
  LoginContainer,
  LoginDivider,
  SocialLoginButtons
} from '@tg-devs/auth-skeleton';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simular login - substitua pela sua lógica de autenticação
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Sucesso",
        description: "Login realizado com sucesso",
        className: "bg-[#EFB207] text-white border-none"
      });
      
      navigate('/app');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Usuário ou senha incorretos",
        className: "bg-red-600 text-white border-none"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      setIsLoading(true);
      
      // Simular login social - substitua pela sua lógica
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Sucesso",
        description: `Login com ${provider} realizado com sucesso`,
        className: "bg-[#EFB207] text-white border-none"
      });
      
      navigate('/app');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no login social",
        description: `Não foi possível fazer login com ${provider}`,
        className: "bg-red-600 text-white border-none"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer className="min-h-screen bg-black">
      <div className="w-full max-w-md space-y-8">
        <LoginHeader 
          title="Bem-vindo ao 2GO"
          subtitle="Faça login para continuar"
          logoUrl={(window as any).env?.VITE_LOGO_URL || import.meta.env.VITE_LOGO_URL}
          className="text-[#EFB207]"
        />
        
        <LoginForm 
          onSubmit={handleLogin}
          isLoading={isLoading}
          className="bg-black text-[#EFB207]"
          buttonClassName="bg-[#EFB207] hover:bg-[#EFB207]/90 text-black"
          inputClassName="bg-white/10 border-gray-700 text-white"
        />

        <LoginDivider className="text-[#EFB207]" />

        <SocialLoginButtons
          onGoogleClick={() => handleSocialLogin('Google')}
          onMicrosoftClick={() => handleSocialLogin('Microsoft')}
          onAppleClick={() => handleSocialLogin('Apple')}
          className="space-y-2"
          buttonClassName="bg-white/10 hover:bg-white/20 text-white"
        />

        <LoginFooter
          links={[
            { text: "Esqueceu a senha?", href: "/forgot-password" },
            { text: "Criar conta", href: "/register" }
          ]}
          className="text-[#EFB207]"
        />
      </div>
    </LoginContainer>
  );
};

export default Login;