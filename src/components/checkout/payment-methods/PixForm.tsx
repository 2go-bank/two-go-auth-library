import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';

const PixForm = () => {
  return (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
        <QrCode className="h-32 w-32 mb-4" />
        <p className="text-sm text-muted-foreground">
          Escaneie o QR Code acima com o seu aplicativo de pagamento
        </p>
      </div>
      <div className="space-y-2">
        <p className="font-medium">Ou copie o código PIX</p>
        <Button variant="outline" className="w-full">
          Copiar Código PIX
        </Button>
      </div>
    </div>
  );
};

export default PixForm;