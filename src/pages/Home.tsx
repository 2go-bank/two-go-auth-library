import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="container mx-auto py-8">
      <Card className="bg-black border border-[#EFB207]">
        <CardHeader>
          <CardTitle className="text-[#EFB207]">Bem-vindo ao 2GO Bank</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">
            Esta é sua página inicial. Aqui você terá acesso a todas as funcionalidades do sistema.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;