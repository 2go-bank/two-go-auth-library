import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/services/api";
import { loadStoredColors, saveColors, applyColors, getDefaultColors } from "@/utils/colorConfig";
import { ColorGroup } from "@/types/colors";
import ProfileCard from "@/components/settings/ProfileCard";
import ColorConfigCard from "@/components/settings/ColorConfigCard";
import ImportExportModals from "@/components/settings/ImportExportModals";

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
      
      if (!Array.isArray(parsedValue)) {
        throw new Error("O formato do JSON é inválido");
      }

      const isValid = parsedValue.every((group: any) => {
        return (
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

      // Merge imported colors with existing groups, preserving titles
      const updatedGroups = groups.map((existingGroup, index) => ({
        ...existingGroup,
        colors: parsedValue[index]?.colors || existingGroup.colors
      }));

      setGroups(updatedGroups);
      applyColors(updatedGroups);
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

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Configurações do Perfil</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProfileCard user={user} />
        <ColorConfigCard
          groups={groups}
          onColorChange={handleColorChange}
          onSaveColors={handleSaveColors}
          onResetToSaved={handleResetToSaved}
          onResetToDefault={handleResetToDefault}
          onImportClick={() => setIsImportOpen(true)}
          onExportClick={handleExport}
        />
      </div>

      <ImportExportModals
        isImportOpen={isImportOpen}
        isExportOpen={isExportOpen}
        importValue={importValue}
        exportValue={exportValue}
        onImportClose={() => setIsImportOpen(false)}
        onExportClose={() => setIsExportOpen(false)}
        onImportChange={(value) => setImportValue(value)}
        onImport={handleImport}
        onCopyToClipboard={handleCopyToClipboard}
      />
    </div>
  );
};

export default Settings;