import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";
import ColorPicker from "./ColorPicker";
import { ColorGroup } from "@/types/colors";

interface ColorConfigCardProps {
  groups: ColorGroup[];
  onColorChange: (groupIndex: number, colorIndex: number, newValue: string) => void;
  onSaveColors: () => void;
  onResetToSaved: () => void;
  onResetToDefault: () => void;
  onImportClick: () => void;
  onExportClick: () => void;
}

const ColorConfigCard = ({
  groups,
  onColorChange,
  onSaveColors,
  onResetToSaved,
  onResetToDefault,
  onImportClick,
  onExportClick,
}: ColorConfigCardProps) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Configurações de Cores</CardTitle>
          <div className="flex gap-4">
            <button
              onClick={onImportClick}
              className="text-sm flex items-center gap-1 text-gray-600 hover:text-gray-900"
            >
              <Upload className="h-4 w-4" />
              Importar
            </button>
            <button
              onClick={onExportClick}
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
                    onChange={(newValue) => onColorChange(groupIndex, colorIndex, newValue)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button
            onClick={onSaveColors}
            className="bg-[#EFB207] text-white hover:bg-[#EFB207]/90 transition-colors"
          >
            Salvar Configurações
          </Button>
          <Button
            onClick={onResetToSaved}
            variant="outline"
            className="border-[#EFB207] text-[#EFB207] hover:bg-[#EFB207]/10"
          >
            Restaurar Configuração Salva
          </Button>
          <Button
            onClick={onResetToDefault}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Restaurar Padrão do Sistema
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorConfigCard;