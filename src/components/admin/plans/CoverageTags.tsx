import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import type { PlanFormValues } from './PlanForm.types';

interface CoverageTagsProps {
  index: number;
  form: UseFormReturn<PlanFormValues>;
}

export const CoverageTags = ({ index, form }: CoverageTagsProps) => {
  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>, field: any) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      const value = event.currentTarget.value.trim();
      if (value && !field.value.includes(value)) {
        field.onChange([...field.value, value]);
        event.currentTarget.value = '';
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string, field: any) => {
    field.onChange(field.value.filter((tag: string) => tag !== tagToRemove));
  };

  return (
    <FormField
      control={form.control}
      name={`products.${index}.coverage`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Cobertura</FormLabel>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {field.value.map((tag: string, tagIndex: number) => (
                <Badge 
                  key={tagIndex} 
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag, field)}
                    className="hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <FormControl>
              <Input
                placeholder="Digite e pressione Enter para adicionar"
                onKeyDown={(e) => handleAddTag(e, field)}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};