import { render, screen } from '@testing-library/react';
import { makeServer } from './util/mirageServer';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
let server;
beforeEach(() => {
  server = makeServer();
});
afterEach(() => {
  server.shutdown();
});

test('render home page', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const linkElement = await screen.findByText(/BeatBazaar/i);
  expect(linkElement).toBeInTheDocument();
  // Check for the "Search Albums" input
  const searchInput = await screen.findByLabelText(/Search Albums/i);
  expect(searchInput).toBeInTheDocument();
});
