import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import CryptoJS from 'crypto-js';
import { requestNotificationPermission } from '@/config/firebase';

const AuthCallback = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const encryptData = (data: string) => {
    const secretKey = '2go-secret-key';
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  };

  useEffect(() => {
    const handleMicrosoftCallback = async () => {
      try {
        const response = await fetch(`https://api.2gopag.com/v3/api/microsoft/token/${code}`);
        
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
          navigate('/login');
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro na autenticação",
          description: "Houve um erro ao processar sua autenticação. Tente novamente.",
          className: "bg-red-600 text-white border-none"
        });
        navigate('/login');
      }
    };

    if (code) {
      handleMicrosoftCallback();
    }
  }, [code, navigate, toast]);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EFB207]"></div>
        <p className="mt-4 text-[#EFB207]">Autenticando...</p>
      </div>
    </div>
  );
};

export default AuthCallback;