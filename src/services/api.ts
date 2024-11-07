import CryptoJS from 'crypto-js';
import { Plan } from '@/types/user';
import { toast } from '@/components/ui/use-toast';

// Tipos
interface PlansResponse {
  list: Plan[];
}

interface RequestConfig {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  requiresAuth?: boolean;
  queryParams?: Record<string, string>;
}

// Funções auxiliares
const getStoredToken = (): string | null => {
  const encryptedAuth = localStorage.getItem('2go-auth');
  if (!encryptedAuth) return null;

  try {
    const secretKey = '2go-secret-key';
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedAuth, secretKey);
    const authData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    return authData.access_token;
  } catch {
    return null;
  }
};

const handleApiError = (error: any) => {
  if (error instanceof Error) {
    if (error.message === 'Unauthorized: Invalid credentials') {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Sua sessão expirou. Por favor, faça login novamente."
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || "Ocorreu um erro ao processar sua requisição."
      });
    }
    throw error;
  }
  
  toast({
    variant: "destructive",
    title: "Erro",
    description: "Ocorreu um erro ao processar sua requisição."
  });
  throw new Error('Network request failed');
};

// Função principal da API
export const api = async <T>({
  path,
  method = 'GET',
  body,
  requiresAuth = false,
  queryParams = {},
}: RequestConfig): Promise<T> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = new URL(path, baseUrl);

  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (requiresAuth) {
    const token = getStoredToken();
    if (!token) {
      throw new Error('No authentication token found');
    }
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url.toString(), {
      method,
      headers,
      credentials: 'include',
      ...(body && { body: JSON.stringify(body) }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid credentials');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Serviços específicos
export const apiService = {
  auth: {
    login: async (username: string, password: string) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_AUTH_API_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            username,
            password,
            client_id: '2go-api',
            grant_type: 'password'
          })
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Usuário ou senha incorretos');
          }
          throw new Error('Erro ao realizar login');
        }

        return response.json();
      } catch (error) {
        return handleApiError(error);
      }
    },
    
    resetPassword: (key: string, password: string, repeatPassword: string) =>
      api<{ access_token: string }>({
        path: '/access/password',
        method: 'POST',
        body: {
          grant_type: "password",
          client_id: "2go-api",
          key,
          password,
          repeat_password: repeatPassword
        }
      }),
    
    validatePhone: (phoneNumber: string) =>
      api<void>({
        path: `/mobile/validate-phone/${phoneNumber}`,
        method: 'GET'
      }),
    
    confirmPhone: (phoneNumber: string, confirmationCode: string) =>
      api<{ activation_code: string }>({
        path: '/mobile/validate-phone',
        method: 'POST',
        body: {
          phone_number: phoneNumber,
          confirmation_code: confirmationCode
        }
      })
  },
  
  user: {
    getProfile: () =>
      api<{
        id: string;
        name: string;
        avatar: string;
        email: string;
        phone_number: string;
      }>({
        path: '/access/users/me',
        method: 'GET',
        requiresAuth: true,
        queryParams: {
          fields: 'id,name,avatar,email,phone_number'
        }
      })
  },

  plans: {
    getPlans: async (): Promise<PlansResponse> => {
      try {
        return await api<PlansResponse>({
          path: '/v3/api/tickets/plans',
          method: 'GET',
          requiresAuth: true,
          queryParams: {
            sort: 'created:asc'
          }
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível carregar seus produtos"
        });
        throw error;
      }
    },

    getPlan: async (id: string): Promise<Plan> => {
      try {
        return await api<Plan>({
          path: `/v3/api/tickets/plans/${id}`,
          method: 'GET',
          requiresAuth: true
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível carregar o plano"
        });
        throw error;
      }
    },

    createPlan: async (plan: Omit<Plan, 'id'>): Promise<Plan> => {
      try {
        return await api<Plan>({
          path: '/v3/api/tickets/plans',
          method: 'POST',
          body: plan,
          requiresAuth: true
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível criar o plano"
        });
        throw error;
      }
    },

    updatePlan: async (id: string, plan: Partial<Plan>): Promise<Plan> => {
      try {
        return await api<Plan>({
          path: `/v3/api/tickets/plans/${id}`,
          method: 'PUT',
          body: plan,
          requiresAuth: true
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível atualizar o plano"
        });
        throw error;
      }
    },

    deletePlan: async (id: string): Promise<void> => {
      try {
        return await api<void>({
          path: `/v3/api/tickets/plans/${id}`,
          method: 'DELETE',
          requiresAuth: true
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível excluir o plano"
        });
        throw error;
      }
    }
  }
};