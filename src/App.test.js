import { render, screen } from '@testing-library/react';
import { startMirage } from './util/mirageServer';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

let server;
beforeEach(() => {
  server = startMirage();
});
afterEach(() => {
  server.shutdown();
});

test('render home page', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = await screen.findByText(/This is a music app/i);
  expect(linkElement).toBeInTheDocument();
});
