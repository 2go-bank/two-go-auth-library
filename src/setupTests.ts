import '@testing-library/jest-dom';

// Mock das variáveis de ambiente do Vite
const mockEnv = {
  VITE_LOGO_URL: 'test-logo-url',
  VITE_AUTH_API_URL: 'test-api-url',
  VITE_API_BASE_URL: 'test-base-url',
  VITE_ENVIRONMENT: 'test',
  VITE_HEADER_BG_COLOR: '#000000',
  VITE_HEADER_TEXT_COLOR: '#EFB207',
  VITE_HEADER_LINK_COLOR: '#EFB207'
};

// Define import.meta.env para testes
global.import = {
  meta: {
    env: mockEnv
  }
} as any;

// Define window.env para testes
window.env = mockEnv;

// Define tipos globais
declare global {
  interface Window {
    env?: {
      VITE_LOGO_URL?: string;
      VITE_AUTH_API_URL?: string;
      VITE_API_BASE_URL?: string;
      VITE_ENVIRONMENT?: string;
      VITE_HEADER_BG_COLOR?: string;
      VITE_HEADER_TEXT_COLOR?: string;
      VITE_HEADER_LINK_COLOR?: string;
      [key: string]: string | undefined;
    }
  }

  namespace NodeJS {
    interface Global {
      import: {
        meta: {
          env: typeof mockEnv;
        };
      };
    }
  }
}

export {};