import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Accordion } from '@/components/ui/accordion';
import { Loader2, Plus } from 'lucide-react';
import { apiService } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import { planFormSchema, type PlanFormValues } from '@/components/admin/plans/PlanForm.types';
import { PlanFormHeader } from '@/components/admin/plans/PlanFormHeader';
import { PlanFormFields } from '@/components/admin/plans/PlanFormFields';
import { ProductAccordionItem } from '@/components/admin/plans/ProductAccordionItem';

const defaultProduct = {
  type: 'voucher' as const,
  name: '',
  description: '',
  thumbnail: null,
  sku: '',
  value: 0,
  quantity: 1,
  coverage: []
};

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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products"
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
    <div className="container max-w-3xl mx-auto py-8">
      <PlanFormHeader isEditing={isEditing} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <PlanFormFields form={form} />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Produtos</h2>
              <Button
                type="button"
                onClick={() => append(defaultProduct)}
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Produto
              </Button>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {fields.map((field, index) => (
                <ProductAccordionItem
                  key={field.id}
                  index={index}
                  form={form}
                  onRemove={() => remove(index)}
                />
              ))}
            </Accordion>
          </div>

          <Button
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
            className="w-full"
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