import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Vite's import.meta.env
global.import = {
  meta: {
    env: {
      VITE_RECAPTCHA_SITE_KEY: 'test-key',
      VITE_LOGO_URL: 'test-logo-url',
      VITE_AUTH_API_URL: 'test-api-url',
      VITE_API_BASE_URL: 'test-base-url',
      VITE_ENVIRONMENT: 'test',
      // Add any other environment variables used in your components
    }
  }
};

// Make vi available globally for all tests
global.vi = vi;