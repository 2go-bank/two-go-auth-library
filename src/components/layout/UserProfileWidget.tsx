import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Settings, LogOut } from "lucide-react";
import CryptoJS from 'crypto-js';
import { apiService } from '@/services/api';
import { useToast } from "@/hooks/use-toast";

interface UserData {
  name: string;
  avatar: string;
}

const UserProfileWidget = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [fetchFailed, setFetchFailed] = useState(false);

  const encryptData = (data: any) => {
    const secretKey = '2go-secret-key';
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  };

  const getUserData = (): UserData | null => {
    const encryptedUser = localStorage.getItem('2go-user');
    if (!encryptedUser) return null;

    try {
      const secretKey = '2go-secret-key';
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedUser, secretKey);
      return JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await apiService.user.getProfile();
        const encryptedData = encryptData(data);
        localStorage.setItem('2go-user', encryptedData);
        setUserData(data);
        setFetchFailed(false);
      } catch (error) {
        setFetchFailed(true);
        if (error instanceof Error && error.message.includes('No authentication token found')) {
          navigate('/login');
          return;
        }
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados do usuário",
          description: "Por favor, faça login novamente para atualizar seus dados.",
          className: "bg-red-600 text-white border-none"
        });
      }
    };

    const storedData = getUserData();
    if (storedData) {
      setUserData(storedData);
    } else if (!fetchFailed) {
      fetchUserData();
    }
  }, [toast, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('2go-auth');
    localStorage.removeItem('2go-user');
    navigate('/login');
  };

  if (!userData) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar>
          <AvatarImage src={userData.avatar} alt={userData.name} />
          <AvatarFallback className="bg-[#EFB207] text-black">
            {getInitials(userData.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-black border-gray-700">
        <DropdownMenuItem 
          onClick={() => navigate('/app/settings')} 
          className="cursor-pointer text-[#EFB207] hover:text-[#EFB207]/80 hover:bg-gray-900"
        >
          <Settings className="mr-2 h-4 w-4" />
          Configurações
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleLogout} 
          className="cursor-pointer text-red-500 hover:text-red-400 hover:bg-gray-900"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileWidget;