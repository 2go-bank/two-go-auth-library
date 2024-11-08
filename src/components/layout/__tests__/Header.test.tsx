import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import * as auth from '@/utils/auth';

// Mock environment variables
vi.mock('@/config/env', () => ({
  default: {
    VITE_LOGO_URL: 'test-logo-url'
  }
}));

vi.mock('@/utils/auth', () => ({
  isAuthenticated: vi.fn()
}));

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders logo and login link when not authenticated', () => {
    (auth.isAuthenticated as jest.Mock).mockReturnValue(false);
    
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByAltText('2GO Bank Logo')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('Stats')).not.toBeInTheDocument();
  });

  it('renders navigation links when authenticated', () => {
    (auth.isAuthenticated as jest.Mock).mockReturnValue(true);
    
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByAltText('2GO Bank Logo')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Stats')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });
});