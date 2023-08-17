import { useLogout } from '@akosasante/react-auth-context';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';

const Logout = () => {
  // for navigate to other component
  const navigate = useNavigate();

  const errorHandler = (error) => console.error('Error during logout: ', error);

  const { submit: signOut, loading } = useLogout({
    errorHandler,
    apiUrl: 'http://localhost:8000/api/v1/auth/logout',
  });

  //handling user logout
  const handleLogout = async () => {
    const originalResponse = await signOut();
    if (originalResponse.status === 201) {
      navigate('/');
    } else {
      console.error('unexpected success response status when logging out');
      // refresh page
      navigate(0);
    }
  };

  return (
    <Button onClick={handleLogout} color="inherit">
      Logout
    </Button>
  );
};

export default Logout;
