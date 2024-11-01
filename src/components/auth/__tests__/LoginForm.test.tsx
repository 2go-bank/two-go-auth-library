import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../LoginForm';

describe('LoginForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders all form elements', () => {
    render(<LoginForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('toggles password visibility', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    const passwordInput = screen.getByLabelText(/senha/i);
    const toggleButton = screen.getByRole('button', { name: '' });

    expect(passwordInput).toHaveAttribute('type', 'password');
    
    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('submits form with entered values', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    const usernameInput = screen.getByLabelText(/usuário/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'testpass');
    await userEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('testuser', 'testpass');
  });

  it('disables form when loading', () => {
    render(<LoginForm onSubmit={mockOnSubmit} isLoading={true} />);
    
    expect(screen.getByLabelText(/usuário/i)).toBeDisabled();
    expect(screen.getByLabelText(/senha/i)).toBeDisabled();
    expect(screen.getByRole('button', { name: /entrando/i })).toBeDisabled();
  });
});