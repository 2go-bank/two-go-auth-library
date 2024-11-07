import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ArrowLeft } from 'lucide-react';
import { apiService } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import type { Plan, Product } from '@/types/user';

const defaultProduct: Product = {
  type: 'voucher',
  name: '',
  description: '',
  thumbnail: null,
  sku: '',
  value: 0,
  quantity: 1,
  coverage: []
};

const planFormSchema = z.object({
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

type PlanFormValues = z.infer<typeof planFormSchema>;

const PlanForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = Boolean(id);

  const { data: plan, isLoading: isLoadingPlan } = useQuery({
    queryKey: ['plan', id],
    queryFn: () => apiService.plans.getPlan(id!),
    enabled: isEditing
  });

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      name: '',
      description: '',
      products: [defaultProduct]
    }
  });

  React.useEffect(() => {
    if (plan) {
      form.reset(plan);
    }
  }, [plan, form]);

  const createMutation = useMutation({
    mutationFn: (data: PlanFormValues) => apiService.plans.createPlan({
      ...data,
      status: 'active',
      created: new Date().toISOString()
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      toast({
        title: "Sucesso",
        description: "Plano criado com sucesso."
      });
      navigate('/app/admin/plans');
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível criar o plano."
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data: PlanFormValues) => apiService.plans.updatePlan(id!, {
      ...data,
      status: plan?.status || 'active',
      created: plan?.created || new Date().toISOString()
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      toast({
        title: "Sucesso",
        description: "Plano atualizado com sucesso."
      });
      navigate('/app/admin/plans');
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar o plano."
      });
    }
  });

  const onSubmit = (data: PlanFormValues) => {
    if (isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  if (isEditing && isLoadingPlan) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Button
        variant="ghost"
        onClick={() => navigate('/app/admin/plans')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>

      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Editar Plano' : 'Novo Plano'}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
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
            name="description"
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

          <Button
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {(createMutation.isPending || updateMutation.isPending) && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            )}
            {isEditing ? 'Atualizar' : 'Criar'} Plano
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PlanForm;