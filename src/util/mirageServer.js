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
<<<<<<< HEAD
        // route to get current user
        this.get(
          'http://localhost:8000/api/v1/auth/users/showMe',
          (schema, request) => {
            let attrs = JSON.parse(request.requestBody);
            console.log(attrs);
          }
        );

      this.passthrough('http://localhost:8000/*'); // everything else will try to actually call the backend
=======
        this.passthrough('http://localhost:8000/*'); // everything else will try to actually call the backend
>>>>>>> 99248d5d303f22ba0aca4b45020ece96d6eecd6a
    },
  });
}
