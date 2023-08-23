import { useAuth } from '@akosasante/react-auth-context';
import Loader from '../components/layout/Loader/Loader';

function Home() {
  const { status, user } = useAuth();

  return (
    <div>
      <h1>THIS IS THE HOME PAGE</h1>
      <p>Current log-in status is: {status}</p>
      <p>Current logged-in user is: {JSON.stringify(user)}</p>
      <Loader className="small-spinner" />
    </div>
  );
}

export default Home;
