import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HexColorPicker } from "react-colorful";
import { apiService } from "@/services/api";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ColorConfig {
  key: string;
  label: string;
  value: string;
}

const Settings = () => {
  const { toast } = useToast();
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null);
  const [colors, setColors] = useState<ColorConfig[]>([
    { key: 'VITE_BODY_BG_COLOR', label: 'Cor de Fundo', value: import.meta.env.VITE_BODY_BG_COLOR || '#FFFFFF' },
    { key: 'VITE_BODY_TEXT_COLOR', label: 'Cor do Texto', value: import.meta.env.VITE_BODY_TEXT_COLOR || '#000000' },
    { key: 'VITE_BODY_LINK_COLOR', label: 'Cor dos Links', value: import.meta.env.VITE_BODY_LINK_COLOR || '#EFB207' },
    { key: 'VITE_BODY_H1_COLOR', label: 'Cor H1', value: import.meta.env.VITE_BODY_H1_COLOR || '#111111' },
    { key: 'VITE_BODY_H2_COLOR', label: 'Cor H2', value: import.meta.env.VITE_BODY_H2_COLOR || '#222222' },
    { key: 'VITE_BODY_H3_COLOR', label: 'Cor H3', value: import.meta.env.VITE_BODY_H3_COLOR || '#222222' },
    { key: 'VITE_BODY_H4_COLOR', label: 'Cor H4', value: import.meta.env.VITE_BODY_H4_COLOR || '#333333' },
    { key: 'VITE_BODY_H5_COLOR', label: 'Cor H5', value: import.meta.env.VITE_BODY_H5_COLOR || '#333333' },
    { key: 'VITE_BODY_H6_COLOR', label: 'Cor H6', value: import.meta.env.VITE_BODY_H6_COLOR || '#444444' },
    { key: 'VITE_HEADER_BG_COLOR', label: 'Cor de Fundo do Cabeçalho', value: import.meta.env.VITE_HEADER_BG_COLOR || '#000000' },
    { key: 'VITE_HEADER_TEXT_COLOR', label: 'Cor do Texto do Cabeçalho', value: import.meta.env.VITE_HEADER_TEXT_COLOR || '#EFB207' },
    { key: 'VITE_HEADER_LINK_COLOR', label: 'Cor dos Links do Cabeçalho', value: import.meta.env.VITE_HEADER_LINK_COLOR || '#EFB207' },
    { key: 'VITE_FOOTER_BG_COLOR', label: 'Cor de Fundo do Rodapé', value: import.meta.env.VITE_FOOTER_BG_COLOR || '#000000' },
    { key: 'VITE_FOOTER_TEXT_COLOR', label: 'Cor do Texto do Rodapé', value: import.meta.env.VITE_FOOTER_TEXT_COLOR || '#EFB207' },
    { key: 'VITE_FOOTER_LINK_COLOR', label: 'Cor dos Links do Rodapé', value: import.meta.env.VITE_FOOTER_LINK_COLOR || '#EFB207' },
    { key: 'VITE_AVATAR_BORDER_COLOR', label: 'Cor da Borda do Avatar', value: import.meta.env.VITE_AVATAR_BORDER_COLOR || '#EFB207' },
  ]);

  const { data: user, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => apiService.user.getProfile()
  });

  const handleColorChange = (colorKey: string, newValue: string) => {
    setColors(prevColors => 
      prevColors.map(color => 
        color.key === colorKey ? { ...color, value: newValue } : color
      )
    );
  };

  const handleSaveColors = () => {
    // Here you would typically save the colors to your backend
    // For now, we'll just show a success toast
    toast({
      title: "Configurações salvas",
      description: "As cores foram atualizadas com sucesso.",
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
        {/* Profile Card */}
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

        {/* Color Settings */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Configurações de Cores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {colors.map((color) => (
                <div key={color.key} className="space-y-2">
                  <Label>{color.label}</Label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={color.value}
                      onChange={(e) => handleColorChange(color.key, e.target.value)}
                      className="flex-1"
                    />
                    <div className="relative">
                      <div
                        className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                        style={{ backgroundColor: color.value }}
                        onClick={() => setActiveColorPicker(activeColorPicker === color.key ? null : color.key)}
                      />
                      {activeColorPicker === color.key && (
                        <div className="absolute z-10 mt-2">
                          <div 
                            className="fixed inset-0" 
                            onClick={() => setActiveColorPicker(null)}
                          />
                          <HexColorPicker
                            color={color.value}
                            onChange={(newColor) => handleColorChange(color.key, newColor)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={handleSaveColors}
                className="bg-[#EFB207] text-white px-4 py-2 rounded hover:bg-[#EFB207]/90 transition-colors"
              >
                Salvar Configurações
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;