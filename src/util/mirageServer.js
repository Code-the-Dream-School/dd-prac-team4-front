import { createServer } from 'miragejs';

export function makeServer() {
  createServer({
    routes() {
      this.get('http://localhost:8000/api/v1', { data: 'This is a music app' }),
        // route to submit user registration form
        this.post(
          'http://localhost:8000/api/v1/auth/register',
          (schema, request) => {
            let attrs = JSON.parse(request.requestBody);
            console.log(attrs);
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
