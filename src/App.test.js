// src/App.test.js
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders App homepage content', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // Check that the homepage content renders
  expect(screen.getByText(/explore now/i)).toBeInTheDocument();
});
