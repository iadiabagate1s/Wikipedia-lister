import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthContext } from '../services/context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../pages/login';
import { login } from '../services/api/auth';

// Mock the login API call
jest.mock('../services/api/auth', () => ({
  login: jest.fn(),
}));

describe('Login Component', () => {
  const setLoggedInUser = jest.fn();
  const user = null;

  test('renders the login form', () => {
    render(
      <AuthContext.Provider value={{ setLoggedInUser, user }}>
        <Router>
          <Login />
        </Router>
      </AuthContext.Provider>
    );

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows error when login fails', async () => {
    login.mockRejectedValueOnce({
      response: { data: { message: 'Invalid credentials' } },
    });

    render(
      <AuthContext.Provider value={{ setLoggedInUser, user }}>
        <Router>
          <Login />
        </Router>
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    const alert = await screen.findByText(/invalid credentials/i);
    expect(alert).toBeInTheDocument();
  });

  test('successful login redirects to home', async () => {
    login.mockResolvedValueOnce({ user: { email: 'test@example.com' } });

    render(
      <AuthContext.Provider value={{ setLoggedInUser, user }}>
        <Router>
          <Login />
        </Router>
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(setLoggedInUser).toHaveBeenCalledWith({ email: 'test@example.com' });
    });
  });
});
