import { useState, useEffect } from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { ProductFormFields } from './ProductFormFields';
import { UseFormReturn } from 'react-hook-form';
import type { PlanFormValues } from './PlanForm.types';

interface ProductAccordionItemProps {
  index: number;
  form: UseFormReturn<PlanFormValues>;
  onRemove: () => void;
}

export const ProductAccordionItem = ({ index, form, onRemove }: ProductAccordionItemProps) => {
  const [isModified, setIsModified] = useState(false);
  const [initialValues, setInitialValues] = useState(form.watch(`products.${index}`));

  useEffect(() => {
    // Armazena os valores iniciais quando o componente é montado
    setInitialValues(form.watch(`products.${index}`));
  }, []);

  const handleModified = () => {
    const currentValues = form.watch(`products.${index}`);
    const hasChanged = JSON.stringify(currentValues) !== JSON.stringify(initialValues);
    setIsModified(hasChanged);
  };

  return (
    <AccordionItem 
      value={`item-${index}`} 
      className={`border rounded-lg ${isModified ? 'bg-yellow-50' : 'bg-white'}`}
    >
      <AccordionTrigger className="px-4">
        {form.watch(`products.${index}.name`) || `Produto ${index + 1}`}
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