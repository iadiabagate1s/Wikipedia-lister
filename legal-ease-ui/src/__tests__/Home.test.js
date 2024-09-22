import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthContext } from '../services/context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../pages/home';
import { search } from '../services/api/search';

// Mock the search API call
jest.mock('../services/api/search', () => ({
  search: jest.fn(),
  removeSearchHistoryItemAPI: jest.fn(),
  clearAllSearchHistoryAPI: jest.fn(),
}));

describe('Home Component', () => {
  const user = { email: 'test@example.com', searches: [] };

  test('renders the search bar', () => {
    // Move render into the test case
    render(
      <AuthContext.Provider value={{ user }}>
        <Router>
          <Home />
        </Router>
      </AuthContext.Provider>
    );
    
    expect(screen.getByPlaceholderText(/enter search query/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('handles successful search', async () => {
    // Mock successful search response
    search.mockResolvedValueOnce({
      searchResult: { pages: [{ title: 'Apple' }] },
      searchRecord: { query: 'apple' },
    });

    // Render inside the test
    render(
      <AuthContext.Provider value={{ user }}>
        <Router>
          <Home />
        </Router>
      </AuthContext.Provider>
    );

    // Trigger search input and button click
    fireEvent.change(screen.getByPlaceholderText(/enter search query/i), { target: { value: 'apple' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    // Assert the result is displayed
    // const result = await screen.findByText(/apple/i);
    const results = await screen.findAllByText(/apple/i); // Get all matching elements
    const result = results[0];
    expect(result).toBeInTheDocument();
  });

  test('displays error message on search failure', async () => {
    // Mock failed search response
    search.mockRejectedValueOnce(new Error('Failed to fetch search results'));

    // Render inside the test
    render(
      <AuthContext.Provider value={{ user }}>
        <Router>
          <Home />
        </Router>
      </AuthContext.Provider>
    );

    // Trigger search input and button click
    fireEvent.change(screen.getByPlaceholderText(/enter search query/i), { target: { value: 'apple' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    // Assert the error message is displayed
    const error = await screen.findByText(/failed to fetch search results/i);
    expect(error).toBeInTheDocument();
  });
});
