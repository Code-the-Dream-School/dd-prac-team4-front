import { createServer } from 'miragejs';

// this file mocke the backend route for front end.
// it is mainly used for tests; but can also be used in development if the backend is not available or an endpoint is not yet implemented
// for dev you'll need to uncomment the indicated lines in index.js

export function makeServer() {
  return createServer({
    routes() {
      // FIX bug with how mirage + axiox interact
      // https://github.com/miragejs/miragejs/issues/814 -->
      const NativeXMLHttpRequest = window.XMLHttpRequest;

      window.XMLHttpRequest = function XMLHttpRequest() {
        const request = new NativeXMLHttpRequest(arguments);
        delete request.onloadend;
        return request;
      };
      // <-- FIX
      const envPath = process.env.REACT_APP_API_BASE_PATH;

      // route to submit user registration form
      this.post(
        'http://localhost:8000/api/v1/auth/register',
        (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          console.log(attrs);
        }
      );
      // route to login user
      this.post(
        'http://localhost:8000/api/v1/auth/login',
        (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          console.log(attrs);
        }
      );
      // route to logout user
      this.post(
        'http://localhost:8000/api/v1/auth/logout',
        (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          console.log(attrs);
        }
      );
      // route to get current user
      this.get(
        'http://localhost:8000/api/v1/auth/users/showMe',
        (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          console.log(attrs);
        }
      );

      this.passthrough(envPath + '/*'); // everything else will try to actually call the backend
    },
  });
}
