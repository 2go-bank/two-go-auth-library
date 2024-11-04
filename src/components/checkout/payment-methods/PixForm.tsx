import { Alert, AlertDescription } from '@/components/ui/alert';

const PixForm = () => {
  return (
    <div className="space-y-6">
      <Alert>
        <AlertDescription>
          Importante: O pagamento via PIX não possui renovação automática. Você precisará gerar um novo pagamento ao final do período contratado.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default PixForm;