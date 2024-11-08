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
    <div className="space-y-6 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">Cobertura de Testes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-center sm:text-left">Declarações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#EFB207] text-center sm:text-left">
              {formatPercentage(coverageData.statements)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-center sm:text-left">Branches</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#EFB207] text-center sm:text-left">
              {formatPercentage(coverageData.branches)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-center sm:text-left">Funções</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#EFB207] text-center sm:text-left">
              {formatPercentage(coverageData.functions)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-center sm:text-left">Linhas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#EFB207] text-center sm:text-left">
              {formatPercentage(coverageData.lines)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Stats;