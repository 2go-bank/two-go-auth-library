import { Card } from "@/components/ui/card";

const Stats = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Cobertura de Testes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Cobertura Total</h3>
          <p className="text-2xl font-bold text-[#EFB207]">85%</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Linhas Cobertas</h3>
          <p className="text-2xl font-bold text-[#EFB207]">90%</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Funções Testadas</h3>
          <p className="text-2xl font-bold text-[#EFB207]">82%</p>
        </Card>
      </div>
    </div>
  );
};

export default Stats;