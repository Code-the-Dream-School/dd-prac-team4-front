import { render, screen } from '@testing-library/react';
import App from './App';

let server;
beforeEach(() => {
  server = startMirage();
});
afterEach(() => {
  server.shutdown();
});

test('render home page', () => {
  render(<App />);
  const linkElement = screen.getByText(/This is a music app/i);
  expect(linkElement).toBeInTheDocument();
});
