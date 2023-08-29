## Formatting code

Prettier is installed in this repo and will auto-format files that you changed on git commits using the Husky tool. You can also run it manually on _all_ the files with `npm run format:all`. You can also setup VS Code to automatically format whenever you save a file ([instructions](https://www.digitalocean.com/community/tutorials/how-to-format-code-with-prettier-in-visual-studio-code#step-2-formatting-code-on-save)).
Prettier automatically analyzes your code and rewrites it according to a set of predefined rules. It takes care of indentation, line breaks, spacing, and other formatting aspects, ensuring that the resulting code is easy to read and understand.

## Linting code

ESLint is installed in this repo and will check for and try to fix any syntax errors that you have in Javascript or JSX code. It will run automatically on files you changed when you try to commit (via the Husky pre-commit tool). You can also run it manually to fix errors with `npm run lint:fix`, or to just check for errors with `npm run lint:check`. VS Code should also integrate ESLint automatically to tell you about any syntax errors in the "Problems" tab of the IDE.

## prop-types for documenting component props

Runtime type checking for React props and similar objects.
You can use prop-types to document the intended types of properties passed to components. React will check props passed to your components against those definitions, and warn in development if they don’t match.

## Mirage library for mocking backend

Mirage.js is a client-side JavaScript library that allows developers to create mock APIs for front-end applications, particularly those built with React. It is often used during the development phase to simulate a back-end server when the actual back-end is not yet fully implemented or available.The primary purpose of Mirage is to enable front-end developers to work independently on their applications without being dependent on the back-end team.
You can add your routs in App.js->createServer->routs function.

## Testing libraries

This project used Jest, React Testing Library and Mirage.js to test components. These libraries are already installed. Here is a quick overview of these libraries.

**Jest**: a popular Javascript testing framework. This is the library that will look for all the files named `**.test.js` in the repo and run them. Think of Jest as a tool that helps you check if your code is working correctly.

**React Testing Library** : is a testing library specifically designed to test React components in a way that simulates how users interact with the application. It encourages writing tests that focus on behavior and interactions rather than implementation details.

**Mirage** : is a client-side API mocking library for JavaScript applications. It helps you simulate API responses and test your application's behavior without relying on a real backend server during tests.

#### Writing a Basic Component Test

Here's a simple guide to test a component like the `App` component.
in `App.test.js` file we already set up a pretend server using Mirage:

<pre>
```javascript
let server;
beforeEach(() => {
  server = startMirage();
});
afterEach(() => {
  server.shutdown();
});
```
</pre>

write the actual test in `test` function.

<pre>
```javascript

test('render home page', async () => {
  // Render your component like it's shown in your app
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Look for a specific text in the component
  const linkElement = await screen.findByText(/This is a music app/i);

  // Check if the text is there
  expect(linkElement).toBeInTheDocument();
});

```
</pre>

to run the test use `npm test` in terminal.
writing test helps to check if your component works as expected. This helps you catch mistakes before they cause problems in your app.

## .env file

there is file named .env in root folder, right now, anytime we call the backend, we’re using the url http://localhost:8000/api/v1/... which works locally. But when the frontend and backend are deployed, the backend will be running on https://musicstore.onrender.com/api/v1/.... So we need a way to switch between the two. The most common way to do this is using Environment Variables.
Whenever you need to call the backend API use the env variable instead of hardcoding the http://localhost:8000/api/v1/... route. For example instead of http://localhost:8000/api/v1/auth/logout use `${envPath}/auth/logout` where envPath = process.env.REACT_APP_API_BASE_PATH;
