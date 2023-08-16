#### Formatting code

Prettier is installed in this repo and will auto-format files that you changed on git commits using the Husky tool. You can also run it manually on _all_ the files with `npm run format:all`. You can also setup VS Code to automatically format whenever you save a file ([instructions](https://www.digitalocean.com/community/tutorials/how-to-format-code-with-prettier-in-visual-studio-code#step-2-formatting-code-on-save)).
Prettier automatically analyzes your code and rewrites it according to a set of predefined rules. It takes care of indentation, line breaks, spacing, and other formatting aspects, ensuring that the resulting code is easy to read and understand.

### Linting code

ESLint is installed in this repo and will check for and try to fix any syntax errors that you have in Javascript or JSX code. It will run automatically on files you changed when you try to commit (via the Husky pre-commit tool). You can also run it manually to fix errors with `npm run lint:fix`, or to just check for errors with `npm run lint:check`. VS Code should also integrate ESLint automatically to tell you about any syntax errors in the "Problems" tab of the IDE.

#### prop-types for documenting component props

Runtime type checking for React props and similar objects.
You can use prop-types to document the intended types of properties passed to components. React will check props passed to your components against those definitions, and warn in development if they don’t match.

#### Mirage library for mocking backend

Mirage.js is a client-side JavaScript library that allows developers to create mock APIs for front-end applications, particularly those built with React. It is often used during the development phase to simulate a back-end server when the actual back-end is not yet fully implemented or available.The primary purpose of Mirage.js is to enable front-end developers to work independently on their applications without being dependent on the back-end team.
You can add your routs in App.js->createServer->routs function.
