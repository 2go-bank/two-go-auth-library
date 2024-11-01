import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Configurações</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Configurações do usuário serão implementadas aqui.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;