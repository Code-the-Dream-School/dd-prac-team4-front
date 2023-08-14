import { AuthStatus, useAuth } from '@akosasante/react-auth-context';

function Home() {
  const { status, user } = useAuth();

  if (status === AuthStatus.LoggedIn) {
    console.log('authenticated');
  } else {
    console.log('not authenticated');
  }
  return (
    <div>
      <h1>THIS IS THE HOME PAGE</h1>
      <p>Current log-in status is: {status}</p>
      <p>Current logged-in user is: {JSON.stringify(user)}</p>
    </div>
  );
}

export default Home;
