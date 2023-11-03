import { useAuth } from '@akosasante/react-auth-context';
import { Card, CardContent, Table, TableRow, TableCell } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { getUserProfile } from './api';
import { Avatar } from '@mui/material';

export default function PersonalProfile() {
  const { user } = useAuth();
  const userData = user.user; //the user that's returned is nested in its original response shape so to use the actual user you'll need to unwrap it

  // //fetch current user's information
  // const fetchCurrentUser = async () => {
  //   try {
  //     const response = await axiosInstance.get('/users/showMe');
  //     setUserData(response.data.user);
  //   } catch (error) {
  //     console.error('Error fetching current user', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchCurrentUser();
  // }, []);

  return (
    <Card className="mt-2 border-0 rounded-0 shadow-sm">
      <CardContent>
        <h3 className="text-uppercase">My Profile</h3>
        <div className="text-center">
          <Avatar
            src={
              require('../../images/customer.png')

              // ?.profileImage?.url ||
              // 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'
            }
            alt="user profile"
            className="img-fluid rounded-circle"
            sx={{
              width: '100px',
              height: '100px',
              maxWidth: '100px',
              maxHeight: '100px',
            }}
          />
        </div>
        <Table responsive striped hover className="text-center mt-5">
          <tbody>
            <TableRow>
              <TableCell>USERNAME</TableCell>
              <TableCell>{userData?.username || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>NAME</TableCell>
              <TableCell>{userData?.name || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>EMAIL</TableCell>
              <TableCell>{userData?.email || 'N/A'}</TableCell>
            </TableRow>
            {/* <TableRow>
              <TableCell>Password</TableCell>
              <TableCell>{userData?.password}</TableCell>
            </TableRow> */}
          </tbody>
        </Table>
      </CardContent>
      {/* {userData?.id === user?.id && (

        <CardActions className='justify-content-center'>
          <Button onClick={handleUpdateProfileClick} color='warning' startIcon={<EditIcon />}>
            Update Profile
          </Button>
        </CardActions>
      )} */}
    </Card>
  );
}
