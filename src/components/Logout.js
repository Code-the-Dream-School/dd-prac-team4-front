import { useLogout } from '@akosasante/react-auth-context';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Logout = () => {
  // for navigate to other component
  const navigate = useNavigate();
  const envPath = process.env.REACT_APP_API_BASE_PATH;

  const errorHandler = (error) => console.error('Error during logout: ', error);

  const { submit: signOut } = useLogout({
    errorHandler,
    apiUrl: `${envPath}/auth/logout`,
  });

  //handling user logout
  const handleLogout = async () => {
    const originalResponse = await signOut();
    if (originalResponse.status === 200) {
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
