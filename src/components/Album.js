import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddToCartButton from './layout/AddToCartButton/AddToCartButton';
import { ButtonGroup, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import axiosInstance from '../apis/axiosClient';
import './Album.css';
import { Box, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AuthStatus, useAuth } from '@akosasante/react-auth-context';
import AddToWishlistButton from './layout/AddToWishlistButton/AddToWishlistButton';

const AlbumItemWrapper = styled('div')(({ theme: _theme }) => ({
  // Your styles for album item
}));

const AlbumImage = styled('img')({
  width: '100%',
  maxWidth: '200px', // Adjust this value to make the images larger
  height: 'auto',
  marginBottom: '10px',
});

const AlbumTitle = styled('h3')({
  fontWeight: 'bold',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

function Album({ album, wishListId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    comment: '',
    rating: '',
  });
  const [isEdit, setIsEdit] = useState('');
  const [editObj, setEditObj] = useState('');
  // const [loginID, setLoginID] = useState('');

  const { status, user } = useAuth();
  const isLoggedIn = status === AuthStatus.LoggedIn;
  // const { user } = useAuth;
  // const { user } = useAuth;
  console.log(user);
  const loginID = user?.user?._id || user.userId;
  console.log('isLoggedIn=====', loginID);

  const handleOpenDialog = async () => {
    try {
      setOpenDialog(true);
      const response = await axiosInstance.get(`/reviews/album/${album._id}`);
      setReviewList(response.data.allProductReviews);
    } catch (error) {
      console.error('Error fetching review:', error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsEdit('');
    setEditObj('');
    setFormData({
      title: '',
      comment: '',
      rating: '',
    });
  };

  const show = isLoggedIn && !reviewList.some((val) => val.user === loginID);

  const handleAddReview = async () => {
    try {
      const data = {
        ...formData,
        user: loginID,
        album: album._id,
      };

      const response = await axiosInstance.post(
        `/reviews/album/${album._id}`,
        data
      );
      setReviewList([...reviewList, response.data.review]);
      setFormData({
        title: '',
        comment: '',
        rating: '',
      });
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  const handleDeleteReview = async (ID) => {
    try {
      await axiosInstance.delete(`/reviews/${ID}`);

      const deleteData = reviewList.filter((val) => val._id !== ID);
      setReviewList(deleteData);
    } catch (error) {
      console.error('Error delete review:', error);
    }
  };

  const handleEditReview = async () => {
    try {
      const editData = {
        title: editObj.title,
        comment: editObj.comment,
        rating: editObj.rating,
      };

      const editTest = {
        title: editObj.title,
        comment: editObj.comment,
        rating: editObj.rating,
        user: editObj.user,
        album: editObj.album,
      };

      await axiosInstance.patch(`/reviews/${editObj._id}`, editData);

      const data = reviewList.map((val) => {
        if (val._id === editObj._id) {
          val.title = editObj.title;
          val.comment = editObj.comment;
          val.rating = editObj.rating;
        }
        return val;
      });

      setReviewList(data);
      setIsEdit('');
    } catch (error) {
      console.error('Error update review:', error);
    }
  };

  return (
    <AlbumItemWrapper>
      <Box
        className="album-item"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Button onClick={handleOpenDialog} className="album-image-button">
          <AlbumImage src={album.image} alt={album.albumName} />
        </Button>
        <Tooltip title={album.albumName} arrow>
          <AlbumTitle className="album-title">{album.albumName}</AlbumTitle>
        </Tooltip>
        <Typography className="album-artist">{album.artistName}</Typography>
        <Box className="button-container">
          <AddToCartButton album={album} />
          <AddToWishlistButton album={album} wishListId={wishListId} />
        </Box>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          className="album-modal-main"
        >
          <DialogTitle
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {album.albumName}
            <Box sx={{ cursor: 'pointer' }} onClick={handleCloseDialog}>
              <CloseIcon />
            </Box>
          </DialogTitle>
          <DialogContent>
            <div>
              {/* You can customize the content here */}
              <Box className="card-design-main">
                <Box className="card-design">
                  <img
                    src={album.image}
                    alt={album.albumName}
                    className="album-image"
                  />
                  <Box>
                    <Box>
                      Release Date:{' '}
                      {new Date(album.releaseDate).toLocaleDateString()}
                    </Box>
                    <Box>Average Rating: {album.averageRating}</Box>
                  </Box>
                </Box>

                <Typography className="title" variant="h5">
                  Reviews:
                </Typography>
                {reviewList.map((val) => (
                  <div className="rate-card" key={val._id}>
                    {isEdit === val._id ? (
                      <Box className="input-main">
                        <TextField
                          id="outlined-basic"
                          label="Enter title"
                          value={editObj.title}
                          onChange={(e) =>
                            setEditObj({ ...editObj, title: e.target.value })
                          }
                          variant="outlined"
                        />
                        <TextField
                          id="outlined-multiline-static"
                          label="Enter comment"
                          multiline
                          value={editObj.comment}
                          onChange={(e) =>
                            setEditObj({
                              ...editObj,
                              comment: e.target.value,
                            })
                          }
                          rows={2}
                        />
                        <TextField
                          id="outlined-basic"
                          type="number"
                          label="Enter rating between 1 to 5"
                          value={editObj.rating}
                          onChange={(e) =>
                            setEditObj({ ...editObj, rating: e.target.value })
                          }
                          InputProps={{ inputProps: { min: 1, max: 5 } }}
                          variant="outlined"
                        />

                        <Box sx={{ display: 'flex', gap: '10px' }}>
                          <Button
                            className="btn delete-btn"
                            onClick={() => {
                              setIsEdit('');
                              setEditObj('');
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="btn edit-btn"
                            onClick={handleEditReview}
                          >
                            Save
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <>
                        <Typography className="rate-data">
                          {val.title}
                        </Typography>
                        <Typography>Rating: {val.rating}</Typography>
                        <Typography>
                          Posted on{' '}
                          {new Date(val.createdAt).toLocaleDateString()}
                        </Typography>
                        <Typography>{val.comment}</Typography>
                        {isLoggedIn && (
                          <Box sx={{ display: 'flex', gap: '10px' }}>
                            <Button
                              className="delete-btn btn"
                              onClick={() => handleDeleteReview(val._id)}
                              disabled={loginID !== val.user}
                            >
                              Delete
                            </Button>
                            <Button
                              className="edit-btn btn"
                              onClick={() => {
                                setIsEdit(val._id);
                                setEditObj(val);
                              }}
                              disabled={loginID !== val.user}
                            >
                              Edit
                            </Button>
                          </Box>
                        )}
                      </>
                    )}
                  </div>
                ))}
                {show && (
                  <Box className="rate-card">
                    <Box className="input-main">
                      <TextField
                        id="outlined-basic"
                        label="Enter title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        variant="outlined"
                      />
                      <TextField
                        id="outlined-multiline-static"
                        label="Enter comment"
                        multiline
                        value={formData.comment}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            comment: e.target.value,
                          })
                        }
                        rows={2}
                      />
                      <TextField
                        id="outlined-basic"
                        type="number"
                        label="Enter rating between 1 to 5"
                        value={formData.rating}
                        onChange={(e) =>
                          setFormData({ ...formData, rating: e.target.value })
                        }
                        InputProps={{ inputProps: { min: 1, max: 5 } }}
                        variant="outlined"
                      />
                      <Box>
                        <Button
                          className="btn edit-btn"
                          onClick={handleAddReview}
                        >
                          Add
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </div>
          </DialogContent>
        </Dialog>
      </Box>
    </AlbumItemWrapper>
  );
}

export default Album;
