import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  loadStoredColors, 
  saveColors, 
  applyColors, 
  getDefaultColors,
  loadStoredEnvConfigs,
  saveEnvConfigs,
  applyEnvConfigs,
  getDefaultEnvConfigs
} from "@/utils/colorConfig";
import { ColorGroup, EnvGroup } from "@/types/colors";
import ColorConfigCard from "@/components/settings/ColorConfigCard";
import EnvConfigCard from "@/components/settings/EnvConfigCard";
import ImportExportModals from "@/components/settings/ImportExportModals";
import SettingsHeader from "@/components/settings/SettingsHeader";
import { generateEnvContent, downloadEnvFile } from "@/utils/envDownload";

const Settings = () => {
  const { toast } = useToast();
  const [groups, setGroups] = useState<ColorGroup[]>(loadStoredColors());
  const [envGroups, setEnvGroups] = useState<EnvGroup[]>(loadStoredEnvConfigs());
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [importValue, setImportValue] = useState("");
  const [exportValue, setExportValue] = useState("");

  const handleColorChange = (groupIndex: number, colorIndex: number, newValue: string) => {
    setGroups(prevGroups => {
      const newGroups = [...prevGroups];
      newGroups[groupIndex].colors[colorIndex].value = newValue;
      return newGroups;
    });
  };

  const handleEnvConfigChange = (groupIndex: number, configIndex: number, newValue: string) => {
    setEnvGroups(prevGroups => {
      const newGroups = [...prevGroups];
      newGroups[groupIndex].configs[configIndex].value = newValue;
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

  const handleSaveEnvConfigs = () => {
    saveEnvConfigs(envGroups);
    applyEnvConfigs(envGroups);
    toast({
      title: "Configurações de ambiente salvas",
      description: "As configurações foram atualizadas com sucesso.",
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

  const handleResetEnvToDefault = () => {
    const defaultConfigs = getDefaultEnvConfigs();
    setEnvGroups(defaultConfigs);
    applyEnvConfigs(defaultConfigs);
    toast({
      title: "Configurações padrão restauradas",
      description: "As configurações foram restauradas para o padrão do sistema.",
    });
  };

  const handleDownloadEnv = () => {
    const envContent = generateEnvContent(envGroups, groups);
    downloadEnvFile(envContent);
    
    toast({
      title: "Download iniciado",
      description: "O arquivo .env está sendo baixado.",
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

  return (
    <div className="container mx-auto py-8 space-y-8">
      <SettingsHeader onDownload={handleDownloadEnv} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ColorConfigCard
          groups={groups}
          onColorChange={handleColorChange}
          onSaveColors={handleSaveColors}
          onResetToSaved={handleResetToSaved}
          onResetToDefault={handleResetToDefault}
          onImportClick={() => setIsImportOpen(true)}
          onExportClick={handleExport}
        />
        <EnvConfigCard
          groups={envGroups}
          onConfigChange={handleEnvConfigChange}
          onSaveConfigs={handleSaveEnvConfigs}
          onResetToDefault={handleResetEnvToDefault}
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
