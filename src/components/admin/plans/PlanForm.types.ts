import { z } from 'zod';

export const planFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  products: z.array(z.object({
    type: z.literal('voucher'),
    name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
    description: z.string().min(1, 'Descrição é obrigatória'),
    thumbnail: z.string().url().nullable(),
    sku: z.string().regex(/^[a-zA-Z0-9_.-]+$/, 'SKU deve conter apenas letras, números, underline, ponto e hífen'),
    value: z.number().min(0, 'Valor deve ser maior ou igual a zero'),
    quantity: z.number().int().min(0, 'Quantidade deve ser maior ou igual a zero'),
    coverage: z.array(z.string())
  })).min(1, 'Adicione pelo menos um produto')
});

export type PlanFormValues = z.infer<typeof planFormSchema>;