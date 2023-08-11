import { useIsAuthenticated } from 'react-auth-kit';

function Home() {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated()) {
    console.log('authenticated');
  } else {
    console.log('not authenticated');
  }
  return <h1>THIS IS THE HOME PAGE</h1>;
}

export default Home;
