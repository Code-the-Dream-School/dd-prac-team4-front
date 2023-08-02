#### Formatting code
 Prettier is installed in this repo and will auto-format files on git commits using the Husky tool.
Prettier automatically analyzes your code and rewrites it according to a set of predefined rules. It takes care of indentation, line breaks, spacing, and other formatting aspects, ensuring that the resulting code is easy to read and understand.

#### prop-types for documenting component props
Runtime type checking for React props and similar objects.
You can use prop-types to document the intended types of properties passed to components. React will check props passed to your components against those definitions, and warn in development if they don’t match.

#### Mirage library for mocking backend
Mirage.js is a client-side JavaScript library that allows developers to create mock APIs for front-end applications, particularly those built with React. It is often used during the development phase to simulate a back-end server when the actual back-end is not yet fully implemented or available.The primary purpose of Mirage.js is to enable front-end developers to work independently on their applications without being dependent on the back-end team. 
You can add your routs in App.js->createServer->routs function.