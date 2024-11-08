import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../LoginForm';

describe('LoginForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(<LoginForm onSubmit={mockOnSubmit} isLoading={false} />);
  });

  test('renders username and password fields', () => {
    const usernameInput = screen.getByLabelText(/usuário/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('submits form with username and password', () => {
    const usernameInput = screen.getByLabelText(/usuário/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('testuser', 'testpassword');
  });

  test('disables submit button when loading', () => {
    render(<LoginForm onSubmit={mockOnSubmit} isLoading={true} />);
    const submitButton = screen.getByRole('button', { name: /entrando\.\.\.|entrar/i });
    expect(submitButton).toBeDisabled();
  });

  test('toggles password visibility', () => {
    const passwordInput = screen.getByLabelText(/senha/i);
    const toggleButton = screen.getByRole('button', { name: '' });

    expect(passwordInput).toHaveAttribute('type', 'password');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('requires username and password fields', () => {
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    const usernameInput = screen.getByLabelText(/usuário/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    expect(usernameInput).toBeRequired();
    expect(passwordInput).toBeRequired();

    fireEvent.click(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});