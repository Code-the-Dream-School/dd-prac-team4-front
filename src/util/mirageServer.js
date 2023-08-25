import { createServer } from 'miragejs';

// this file mocks the backend route for front end.
// it is mainly used for tests; but can also be used in development if the backend is not available or an endpoint is not yet implemented
// for dev you'll need to uncomment the indicated lines in index.js and create a mock response below.

export function makeServer() {
  return createServer({
    routes() {
      // FIX bug with how mirage + axiox interact
      // https://github.com/miragejs/miragejs/issues/814 -->
      // Please don't remove the code between these FIX comments.
      const NativeXMLHttpRequest = window.XMLHttpRequest;

      window.XMLHttpRequest = function XMLHttpRequest() {
        const request = new NativeXMLHttpRequest(arguments);
        delete request.onloadend;
        return request;
      };
      // <-- END FIX

      const baseAPIPath = process.env.REACT_APP_API_BASE_PATH;

      // route to submit user registration form
      this.post(
        `${baseAPIPath}/auth/register`,
        (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          console.log(attrs);
        }
      );
      // route to login user
      this.post(
        `${baseAPIPath}/auth/login`,
        (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          console.log(attrs);
        }
      );
      // route to logout user
      this.post(
        `${baseAPIPath}/auth/logout`,
        (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          console.log(attrs);
        }
      );
      // route to get current user
      this.get(
        `${baseAPIPath}/auth/users/showMe`,
        (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          console.log(attrs);
        }
      );

      this.passthrough(baseAPIPath + '/*'); // everything else will try to actually call the backend
    },
  });
}
