import { createServer } from 'miragejs';

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

      this.get('http://localhost:8000/api/v1', { data: 'This is a music app' }),
        // route to submit user registration form
        this.post(
          'http://localhost:8000/api/v1/auth/register',
          (schema, request) => {
            console.dir(schema);
            console.dir('request' + JSON.parse(request));
            let attrs = JSON.parse(request.requestBody);
            console.log(attrs);
            const loggedInUser = {
              name: attrs.name,
            };
            return { user: loggedInUser }; //return name of logged in user to home page
          }
        );
      //route to logout user
      this.post(
        'http://localhost:8000/api/v1/auth/logout',
        (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          console.log(attrs);
        }
      );
      // route to get current user
      this.get(
        'http://localhost:8000/api/v1/auth/showMe',
        (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          console.log(attrs);
        }
      );
      this.get(
        'http://localhost:8000/api/v1/albums/filter',
        (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          console.log(attrs);
        }
      );

      this.passthrough('http://localhost:8000/*'); // everything else will try to actually call the backend
    },
  });
}
