import CryptoJS from 'crypto-js';

interface RequestConfig {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  requiresAuth?: boolean;
  queryParams?: Record<string, string>;
}

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
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network request failed');
  }
};

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
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('Erro ao realizar login');
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
    getPlans: () =>
      api<PlansResponse>({
        path: '/v3/api/tickets/plans',
        method: 'GET',
        requiresAuth: true,
        queryParams: {
          fields: 'id,name,created',
          sort: 'created:asc'
        }
      }).then(response => ({ list: response }))
  }
};
