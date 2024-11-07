import { useState } from 'react';
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
          onModified={setIsModified}
        />
      </AccordionContent>
    </AccordionItem>
  );
};