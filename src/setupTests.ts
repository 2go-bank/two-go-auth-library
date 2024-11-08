import '@testing-library/jest-dom';

// Extend the NodeJS global type to include Jest
declare global {
  interface Window {
    env?: {
      VITE_RECAPTCHA_SITE_KEY?: string;
      VITE_LOGO_URL?: string;
      VITE_AUTH_API_URL?: string;
      VITE_API_BASE_URL?: string;
      VITE_ENVIRONMENT?: string;
    }
  }
}

// Mock Vite's import.meta.env
(global as any).import = {
  meta: {
    env: {
      VITE_RECAPTCHA_SITE_KEY: 'test-key',
      VITE_LOGO_URL: 'test-logo-url',
      VITE_AUTH_API_URL: 'test-api-url',
      VITE_API_BASE_URL: 'test-base-url',
      VITE_ENVIRONMENT: 'test',
    }
  }
};

export {};