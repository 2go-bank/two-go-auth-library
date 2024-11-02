import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface SettingsHeaderProps {
  onDownload: () => void;
}

const SettingsHeader = ({ onDownload }: SettingsHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-900">Configurações do Sistema</h1>
      <Button
        onClick={onDownload}
        variant="outline"
        className="flex items-center gap-2 border-[#EFB207] text-[#EFB207] hover:bg-[#EFB207]/10"
      >
        <Download className="h-4 w-4" />
        Baixar configurações do ambiente
      </Button>
    </div>
  );
};

export default SettingsHeader;