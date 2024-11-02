import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";

interface ImportExportModalsProps {
  isImportOpen: boolean;
  isExportOpen: boolean;
  importValue: string;
  exportValue: string;
  onImportClose: () => void;
  onExportClose: () => void;
  onImportChange: (value: string) => void;
  onImport: () => void;
  onCopyToClipboard: () => void;
}

const ImportExportModals = ({
  isImportOpen,
  isExportOpen,
  importValue,
  exportValue,
  onImportClose,
  onExportClose,
  onImportChange,
  onImport,
  onCopyToClipboard,
}: ImportExportModalsProps) => {
  return (
    <>
      <Dialog open={isImportOpen} onOpenChange={onImportClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importar Configuração</DialogTitle>
            <DialogDescription>
              Cole abaixo o JSON com a configuração de cores que deseja importar
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={importValue}
              onChange={(e) => onImportChange(e.target.value)}
              placeholder="Cole o JSON aqui..."
              className="min-h-[200px] font-mono text-sm"
            />
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={onImportClose}>
                Cancelar
              </Button>
              <Button onClick={onImport}>
                Importar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isExportOpen} onOpenChange={onExportClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exportar Configuração</DialogTitle>
            <DialogDescription>
              Copie o JSON abaixo para salvar sua configuração de cores
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={exportValue}
              readOnly
              className="min-h-[200px] font-mono text-sm"
            />
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={onExportClose}>
                Fechar
              </Button>
              <Button onClick={onCopyToClipboard} className="flex items-center gap-2">
                <Copy className="h-4 w-4" />
                Copiar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImportExportModals;