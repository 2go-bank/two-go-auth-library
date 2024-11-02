import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EnvGroup } from "@/types/colors";

interface EnvConfigCardProps {
  groups: EnvGroup[];
  onConfigChange: (groupIndex: number, configIndex: number, newValue: string) => void;
  onSaveConfigs: () => void;
  onResetToDefault: () => void;
}

const EnvConfigCard = ({
  groups,
  onConfigChange,
  onSaveConfigs,
  onResetToDefault,
}: EnvConfigCardProps) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Configurações de Ambiente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {groups.map((group, groupIndex) => (
            <div key={group.title} className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">{group.title}</h3>
              <div className="grid grid-cols-1 gap-4">
                {group.configs.map((config, configIndex) => (
                  <div key={config.key} className="space-y-2">
                    <Label>{config.label}</Label>
                    {config.type === 'select' && config.options ? (
                      <Select
                        value={config.value}
                        onValueChange={(value) => onConfigChange(groupIndex, configIndex, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o ambiente" />
                        </SelectTrigger>
                        <SelectContent>
                          {config.options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        type={config.type === 'url' ? 'url' : 'text'}
                        value={config.value}
                        onChange={(e) => onConfigChange(groupIndex, configIndex, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button
            onClick={onSaveConfigs}
            className="bg-[#EFB207] text-white hover:bg-[#EFB207]/90 transition-colors"
          >
            Salvar Configurações
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

export default EnvConfigCard;