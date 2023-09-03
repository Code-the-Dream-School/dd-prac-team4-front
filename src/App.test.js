import { render, screen } from '@testing-library/react';
import { makeServer } from './util/mirageServer';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

let server;
beforeEach(() => {
  server = makeServer();
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
  const linkElement = await screen.findByText(/Music/i);
  expect(linkElement).toBeInTheDocument();
});
