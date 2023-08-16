import { createServer } from 'miragejs';

const FakeUser = {
  id: 1,
  name: 'John Doe',
};

export function makeServer() {
  createServer({
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
            let attrs = JSON.parse(request.requestBody);
            console.log(attrs);
            return { user: FakeUser };
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

      this.passthrough('http://localhost:8000/*'); // everything else will try to actually call the backend
    },
  });
}
