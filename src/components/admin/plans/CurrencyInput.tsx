import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import type { PlanFormValues } from './PlanForm.types';
import { cn } from '@/lib/utils';

interface CurrencyInputProps {
  index: number;
  form: UseFormReturn<PlanFormValues>;
}

export const CurrencyInput = ({ index, form }: CurrencyInputProps) => {
  return (
    <FormField
      control={form.control}
      name={`products.${index}.value`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Valor</FormLabel>
          <FormControl>
            <NumericFormat
              value={field.value}
              onValueChange={(values) => {
                field.onChange(values.floatValue || 0);
              }}
              decimalSeparator=","
              thousandSeparator="."
              decimalScale={2}
              fixedDecimalScale
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              )}
              placeholder="0,00"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};