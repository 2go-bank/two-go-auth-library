import { Alert, AlertDescription } from '@/components/ui/alert';
import { QrCode } from 'lucide-react';

const PixForm = () => {
  return (
    <div className="space-y-6">
      <Alert>
        <AlertDescription>
          Importante: O pagamento via PIX não possui renovação automática. Você precisará gerar um novo pagamento ao final do período contratado.
        </AlertDescription>
      </Alert>

      <div className="text-center">
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
          <QrCode className="h-32 w-32 mb-4 text-primary" />
          <p className="text-sm text-muted-foreground">
            Escaneie o QR Code acima com o seu aplicativo de pagamento
          </p>
        </div>
      </div>
    </div>
  );
};

export default PixForm;