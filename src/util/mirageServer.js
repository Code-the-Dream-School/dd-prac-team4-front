import { createServer } from 'miragejs';

//this file mocke the backend route for front end. If you need to test the app without connecting
// to the backend server, you can uncomment these route ant to the test.

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

      this.get(envPath, { data: 'This is a music app' }),
        // route to submit user registration form
        // this.post(
        //   'http://localhost:8000/api/v1/auth/register',
        //   (schema, request) => {
        //     let attrs = JSON.parse(request.requestBody);
        //     console.log(attrs);
        //   }
        // );
        //route to login user
        // this.post(
        //   'http://localhost:8000/api/v1/auth/login',
        //   (schema, request) => {
        //     let attrs = JSON.parse(request.requestBody);
        //     console.log(attrs);
        //   }
        // );
        //route to logout user
        // this.post(
        //   'http://localhost:8000/api/v1/auth/logout',
        //   (schema, request) => {
        //     let attrs = JSON.parse(request.requestBody);
        //     console.log(attrs);
        //   }
        // );
        // route to get current user
        // this.get(
        //   'http://localhost:8000/api/v1/auth/users/showMe',
        //   (schema, request) => {
        //     let attrs = JSON.parse(request.requestBody);
        //     console.log(attrs);
        //   }
        // );

        this.passthrough(envPath + '/*'); // everything else will try to actually call the backend

    },
  });
}
