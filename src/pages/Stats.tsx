import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPercentage } from "@/utils/formatters";

const Stats = () => {
  // Dados simulados de cobertura de testes
  const coverageData = {
    statements: 85.7,
    branches: 78.3,
    functions: 92.1,
    lines: 87.4
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Cobertura de Testes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Declarações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#EFB207]">
              {formatPercentage(coverageData.statements)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Branches</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#EFB207]">
              {formatPercentage(coverageData.branches)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Funções</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#EFB207]">
              {formatPercentage(coverageData.functions)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Linhas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#EFB207]">
              {formatPercentage(coverageData.lines)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Stats;