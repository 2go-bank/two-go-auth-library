import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { formatCurrency } from '@/utils/currencyUtils';
import type { PlanFormValues } from './PlanForm.types';

interface CurrencyInputProps {
  index: number;
  form: UseFormReturn<PlanFormValues>;
}

export const CurrencyInput = ({ index, form }: CurrencyInputProps) => {
  const handleCurrencyInput = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    let inputValue = e.target.value;
    
    // Remove any non-numeric characters except comma
    inputValue = inputValue.replace(/[^\d,]/g, '');
    
    if (inputValue === '') {
      field.onChange(0);
      return;
    }

    // Convert to number format (using comma as decimal separator)
    const numericValue = parseFloat(inputValue.replace(',', '.')) || 0;
    field.onChange(numericValue);
  };

  return (
    <FormField
      control={form.control}
      name={`products.${index}.value`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Valor</FormLabel>
          <FormControl>
            <Input 
              value={field.value === 0 ? '' : formatCurrency(field.value)}
              onChange={(e) => handleCurrencyInput(e, field)}
              placeholder="R$ 0,00"
              inputMode="decimal"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};