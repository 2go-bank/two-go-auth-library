import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/services/api";
import ColorPicker from "@/components/settings/ColorPicker";
import { loadStoredColors, saveColors, applyColors, getDefaultColors } from "@/utils/colorConfig";
import { ColorGroup } from "@/types/colors";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const { toast } = useToast();
  const [groups, setGroups] = useState<ColorGroup[]>(loadStoredColors());

  const { data: user, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => apiService.user.getProfile()
  });

  useEffect(() => {
    applyColors(groups);
  }, []);

  const handleColorChange = (groupIndex: number, colorIndex: number, newValue: string) => {
    setGroups(prevGroups => {
      const newGroups = [...prevGroups];
      newGroups[groupIndex].colors[colorIndex].value = newValue;
      return newGroups;
    });
  };

  const handleSaveColors = () => {
    saveColors(groups);
    applyColors(groups);
    toast({
      title: "Configurações salvas",
      description: "As cores foram atualizadas com sucesso.",
    });
  };

  const handleResetToSaved = () => {
    const savedColors = loadStoredColors();
    setGroups(savedColors);
    applyColors(savedColors);
    toast({
      title: "Cores restauradas",
      description: "As cores foram restauradas para a última configuração salva.",
    });
  };

  const handleResetToDefault = () => {
    const defaultColors = getDefaultColors();
    setGroups(defaultColors);
    applyColors(defaultColors);
    toast({
      title: "Cores padrão restauradas",
      description: "As cores foram restauradas para a configuração padrão do sistema.",
    });
  };

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
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-32 w-32 border-2 border-[#EFB207]">
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

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Configurações de Cores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {groups.map((group, groupIndex) => (
                <div key={group.title} className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">{group.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {group.colors.map((color, colorIndex) => (
                      <ColorPicker
                        key={color.key}
                        label={color.label}
                        value={color.value}
                        onChange={(newValue) => handleColorChange(groupIndex, colorIndex, newValue)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button
                onClick={handleSaveColors}
                className="bg-[#EFB207] text-white hover:bg-[#EFB207]/90 transition-colors"
              >
                Salvar Configurações
              </Button>
              <Button
                onClick={handleResetToSaved}
                variant="outline"
                className="border-[#EFB207] text-[#EFB207] hover:bg-[#EFB207]/10"
              >
                Restaurar Configuração Salva
              </Button>
              <Button
                onClick={handleResetToDefault}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Restaurar Padrão do Sistema
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;