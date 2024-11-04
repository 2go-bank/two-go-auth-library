import { Alert, AlertDescription } from '@/components/ui/alert';
import pixLogo from '@/assets/images/pix-logo.png'; // Importando a imagem da logo do PIX

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
          <img src={pixLogo} alt="Logo do PIX" className="h-32 w-32 mb-4" /> {/* Usando a logo do PIX */}
          <p className="text-sm text-muted-foreground">
            Escaneie o QR Code acima com o seu aplicativo de pagamento
          </p>
        </div>
      </div>
    </div>
  );
};

export default PixForm;