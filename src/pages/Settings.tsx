import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { apiService } from "@/services/api";
import { Mail, Phone } from "lucide-react";

const Settings = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => apiService.user.getProfile()
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EFB207]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-center text-gray-600">Não foi possível carregar os dados do usuário.</p>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Configurações do Perfil</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-[#EFB207] text-2xl text-black">
                  {user?.name ? getInitials(user.name) : '??'}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-xl font-semibold">{user?.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-600">
              <Mail className="h-5 w-5" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Phone className="h-5 w-5" />
              <span>{user?.phone_number}</span>
            </div>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Configurações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              Configurações adicionais do usuário serão implementadas aqui.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;