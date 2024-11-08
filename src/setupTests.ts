import '@testing-library/jest-dom';

// Extend the NodeJS global type to include Jest
declare global {
  interface Window {
    env?: {
      VITE_LOGO_URL?: string;
      VITE_AUTH_API_URL?: string;
      VITE_API_BASE_URL?: string;
      VITE_ENVIRONMENT?: string;
    }
  }
}

// Mock Vite's import.meta.env
const mockImportMeta = {
  env: {
    VITE_LOGO_URL: 'test-logo-url',
    VITE_AUTH_API_URL: 'test-api-url',
    VITE_API_BASE_URL: 'test-base-url',
    VITE_ENVIRONMENT: 'test',
    VITE_HEADER_BG_COLOR: '#000000',
    VITE_HEADER_TEXT_COLOR: '#EFB207',
    VITE_HEADER_LINK_COLOR: '#EFB207'
  }
};

// @ts-ignore
global.import = { meta: mockImportMeta };

export {};