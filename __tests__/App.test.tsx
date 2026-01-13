import React from 'react';
import App from '../src/App';
import { render, screen } from '@testing-library/react-native';

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);

    const welcomeMessage = screen.getByText(/Hola Test User!/i);

    expect(welcomeMessage).toBeTruthy();
  });
});
