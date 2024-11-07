import React from 'react'; // Explicitly import React to resolve the unused import warning
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import type { PlanFormValues } from './PlanForm.types';

interface ProductFormFieldsProps {
  index: number;
  form: UseFormReturn<PlanFormValues>;
  onRemove: () => void;
}

export const ProductFormFields = ({ index, form, onRemove }: ProductFormFieldsProps) => {
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
        <FormField
          control={form.control}
          name={`products.${index}.value`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0" 
                  step="0.01"
                  onChange={e => field.onChange(parseFloat(e.target.value))}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  onChange={e => field.onChange(parseInt(e.target.value))}
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

      <FormField
        control={form.control}
        name={`products.${index}.coverage`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cobertura (separar por vírgula)</FormLabel>
            <FormControl>
              <Input 
                value={field.value.join(',')}
                onChange={e => field.onChange(
                  e.target.value.split(',').map(item => item.trim()).filter(Boolean)
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};