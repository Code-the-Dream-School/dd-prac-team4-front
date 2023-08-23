// import React, { useState } from 'react';
// import { Button, Card, CardBody, CardFooter, Table } from 'reactstrap';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook


// const UserProfile = ({ user, updateProfileClick }) => {
//   const navigate = useNavigate(); // Initialize the navigate function

  

//   // Initialize the currentUser state
//   const [currentUser, setCurrentUser] = useState(/* Initial value */);

//     useEffect(() => {
//     // Fetch user profile data
//     getUserProfile()
//       .then(response => {
//         // Update the state with the fetched user profile
//         setCurrentUser(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching user profile:', error);
//       });
//   }, []);
//   return (
//     <Card className='mt-2 border-0 rounded-0 shadow-sm'>
//       <CardBody>
//         <h3 className='text-uppercase'>My Profile</h3>
//         <div className='text-center'>
//           <img
//             style={{ maxWidth: '200px', maxHeight: '200px' }}
//             src={user.image ? user.image : 'https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top'}
//             alt='user profile'
//             className='img-fluid rounded-circle'
//           />
//         </div>
//         <Table responsive striped hover bordered={true} className='text-center mt-5'>
//           <tbody>
//             <tr>
//               <td>USERNAME</td>
//               <td>{user.username}</td>
//             </tr>
//             <tr>
//               <td>NAME</td>
//               <td>{user.name}</td>
//             </tr>
//             <tr>
//               <td>EMAIL</td>
//               <td>{user.email}</td>
//             </tr>
//             <tr>
//               <td>BIO</td>
//               <td>{user.bio}</td>
//             </tr>
//             <tr>
//               <td>ROLE</td>
//               <td>
//                 {user.roles.map((role) => {
//                   return <div key={role.id}>{role.name}</div>;
//                 })}
//               </td>
//             </tr>
//           </tbody>
//         </Table>
//         {currentUser ? currentUser.id === user.id ? (
//           <CardFooter className='text-center'>
//             <Button onClick={handleUpdateProfileClick} color='warning'>
//               Update Profile
//             </Button>
//           </CardFooter>
//         ) : null : null}
//       </CardBody>
//     </Card>
//   );
// };

// export default UserProfile;


import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardActions, Table, TableRow, TableCell, getImageListItemBarUtilityClass } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { getUserProfile } from './api';
import { Avatar } from '@mui/material';


export default function PersonalProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({name:'John',email:'john@hotmail.com',bio:'hello'});

  // useEffect(() => {
  //   getUserProfile()
  //     .then(response => {
  //       setUserData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching user profile:', error);
  //     });
  // }, []);

  return (
    <Card className='mt-2 border-0 rounded-0 shadow-sm'>
      <CardContent>
        <h3 className='text-uppercase'>My Profile</h3>
        <div className='text-center'>
          <Avatar
            src={userData?.profileImage?.url || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'}
            alt='user profile'
            className='img-fluid rounded-circle'
            sx={{ width: '200px', height: '200px', maxWidth: '200px', maxHeight: '200px' }}
          />
        </div>
        <Table responsive striped hover className='text-center mt-5'>
          <tbody>
            <TableRow>
              <TableCell>USERNAME</TableCell>
              <TableCell>{userData?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>NAME</TableCell>
              <TableCell>{userData?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>EMAIL</TableCell>
              <TableCell>{userData?.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>BIO</TableCell>
              <TableCell>{userData?.bio}</TableCell>
            
            </TableRow>
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
