import { useState } from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { ProductFormFields } from './ProductFormFields';
import { UseFormReturn, useWatch } from 'react-hook-form';
import type { PlanFormValues } from './PlanForm.types';
import { formatCurrency } from '@/utils/formatters';

interface ProductAccordionItemProps {
  index: number;
  form: UseFormReturn<PlanFormValues>;
  onRemove: () => void;
}

export const ProductAccordionItem = ({ index, form, onRemove }: ProductAccordionItemProps) => {
  const [isModified, setIsModified] = useState(false);
  const [accordionValues, setAccordionValues] = useState<any>(null);

  const handleAccordionTrigger = () => {
    // Quando o accordion é aberto, armazena os valores atuais apenas se ainda não tiver sido aberto
    if (!accordionValues) {
      const currentValues = form.watch(`products.${index}`);
      setAccordionValues(JSON.stringify(currentValues));
    }
  };

  const handleModified = () => {
    // Verifica modificações se o accordion já foi aberto
    if (accordionValues) {
      const currentValues = form.watch(`products.${index}`);
      const hasChanged = JSON.stringify(currentValues) !== accordionValues;
      setIsModified(hasChanged);
    }
  };

  const product = useWatch({
    control: form.control,
    name: `products.${index}`
  });

  const productInfo = product ? (
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted-foreground">
        {product.quantity}x {formatCurrency(product.value)}
      </span>
      <span className="font-medium">
        {product.name || `Produto ${index + 1}`}
      </span>
    </div>
  ) : (
    `Produto ${index + 1}`
  );

  return (
    <AccordionItem 
      value={`item-${index}`} 
      className={`border rounded-lg ${isModified ? 'bg-yellow-50' : 'bg-white'}`}
    >
      <AccordionTrigger className="px-4" onClick={handleAccordionTrigger}>
        {productInfo}
      </AccordionTrigger>
      <AccordionContent className="px-4">
        <ProductFormFields
          index={index}
          form={form}
          onRemove={onRemove}
          onModified={handleModified}
        />
      </AccordionContent>
    </AccordionItem>
  );
};