import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, Copy, Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/services/api";
import ColorPicker from "@/components/settings/ColorPicker";
import { loadStoredColors, saveColors, applyColors, getDefaultColors } from "@/utils/colorConfig";
import { ColorGroup } from "@/types/colors";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const Settings = () => {
  const { toast } = useToast();
  const [groups, setGroups] = useState<ColorGroup[]>(loadStoredColors());
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [importValue, setImportValue] = useState("");
  const [exportValue, setExportValue] = useState("");

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

  const handleExport = () => {
    setExportValue(JSON.stringify(groups, null, 2));
    setIsExportOpen(true);
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(exportValue);
      toast({
        title: "Copiado!",
        description: "Configuração copiada para a área de transferência.",
      });
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar para a área de transferência.",
        variant: "destructive",
      });
    }
  };

  const handleImport = () => {
    try {
      const parsedValue = JSON.parse(importValue);
      
      // Validate the structure of the imported JSON
      if (!Array.isArray(parsedValue)) {
        throw new Error("O formato do JSON é inválido");
      }

      const isValid = parsedValue.every((group: any) => {
        return (
          typeof group.title === "string" &&
          Array.isArray(group.colors) &&
          group.colors.every((color: any) => 
            typeof color.key === "string" &&
            typeof color.label === "string" &&
            typeof color.value === "string"
          )
        );
      });

      if (!isValid) {
        throw new Error("A estrutura do JSON é inválida");
      }

      setGroups(parsedValue);
      applyColors(parsedValue);
      setIsImportOpen(false);
      setImportValue("");
      
      toast({
        title: "Configuração importada",
        description: "As cores foram atualizadas com sucesso.",
      });
    } catch (err) {
      toast({
        title: "Erro na importação",
        description: err instanceof Error ? err.message : "Formato de JSON inválido",
        variant: "destructive",
      });
    }
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
            <div className="flex justify-between items-center">
              <CardTitle>Configurações de Cores</CardTitle>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsImportOpen(true)}
                  className="text-sm flex items-center gap-1 text-gray-600 hover:text-gray-900"
                >
                  <Upload className="h-4 w-4" />
                  Importar
                </button>
                <button
                  onClick={handleExport}
                  className="text-sm flex items-center gap-1 text-gray-600 hover:text-gray-900"
                >
                  <Download className="h-4 w-4" />
                  Exportar
                </button>
              </div>
            </div>
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

      <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importar Configuração</DialogTitle>
            <DialogDescription>
              Cole abaixo o JSON com a configuração de cores que deseja importar
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={importValue}
              onChange={(e) => setImportValue(e.target.value)}
              placeholder="Cole o JSON aqui..."
              className="min-h-[200px] font-mono text-sm"
            />
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsImportOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleImport}>
                Importar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exportar Configuração</DialogTitle>
            <DialogDescription>
              Copie o JSON abaixo para salvar sua configuração de cores
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={exportValue}
              readOnly
              className="min-h-[200px] font-mono text-sm"
            />
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsExportOpen(false)}>
                Fechar
              </Button>
              <Button onClick={handleCopyToClipboard} className="flex items-center gap-2">
                <Copy className="h-4 w-4" />
                Copiar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;