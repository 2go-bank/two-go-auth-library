import '@testing-library/jest-dom';
import { vi } from 'vitest';

declare global {
  // Declare vi globally using its inferred type
  var vi: typeof vi;
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

// Make vi available globally for all tests
(global as any).vi = vi;

export {};