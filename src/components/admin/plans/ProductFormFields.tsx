import { useEffect } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { CurrencyInput } from './CurrencyInput';
import { CoverageTags } from './CoverageTags';
import type { PlanFormValues } from './PlanForm.types';

interface ProductFormFieldsProps {
  index: number;
  form: UseFormReturn<PlanFormValues>;
  onRemove: () => void;
  onModified: (isModified: boolean) => void;
}

export const ProductFormFields = ({ index, form, onRemove, onModified }: ProductFormFieldsProps) => {
  // Watch all fields of this product
  const product = useWatch({
    control: form.control,
    name: `products.${index}`
  });

  // Update parent when any field changes
  useEffect(() => {
    onModified(true);
  }, [product, onModified]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const value = e.target.value;
    // If the input is empty, set it to 0
    if (value === '') {
      field.onChange(0);
      return;
    }
    // Parse the input value as an integer
    const parsedValue = parseInt(value, 10);
    // If the parsed value is a valid number, use it; otherwise, use 0
    field.onChange(isNaN(parsedValue) ? 0 : parsedValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Produto {index + 1}</h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`products.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} maxLength={100} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`products.${index}.sku`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name={`products.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CurrencyInput index={index} form={form} />

        <FormField
          control={form.control}
          name={`products.${index}.quantity`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0" 
                  step="1"
                  onChange={(e) => handleQuantityChange(e, field)}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name={`products.${index}.thumbnail`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL da Imagem</FormLabel>
            <FormControl>
              <Input 
                type="url" 
                onChange={e => field.onChange(e.target.value || null)}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <CoverageTags index={index} form={form} />
    </div>
  );
};