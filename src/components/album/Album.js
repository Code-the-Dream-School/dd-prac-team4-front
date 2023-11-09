import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import AddToCartButton from '../layout/AddToCartButton/AddToCartButton';
import { ButtonGroup, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddToWishlistButton from '../layout/AddToWishlistButton/AddToWishlistButton';
import AlbumPreview from './AlbumPreview';
import AlbumReviews from '../review/ReviewsList';
import DialogActions from '@mui/material/DialogActions';

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
  const [reviewsUpdated, setReviewsUpdated] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Reset the reviewsUpdated state when the dialog is closed
    setReviewsUpdated(false);
  };
  // Function to refresh reviews
  const refreshReviews = () => {
    // Set reviewsUpdated to true to trigger a re-render of AlbumReviews
    setReviewsUpdated(true);
  };

  useEffect(() => {
    // If reviews are updated, reset the state after rendering AlbumReviews
    if (reviewsUpdated) {
      setReviewsUpdated(false);
    }
  }, [reviewsUpdated]);

  return (
    <AlbumItemWrapper>
      <Button onClick={handleOpenDialog} className="album-image-button">
        <AlbumImage src={album.image} alt={album.albumName} />
      </Button>
      <Tooltip title={album.albumName} arrow>
        <AlbumTitle>{album.albumName}</AlbumTitle>
      </Tooltip>
      <p className="album-artist">{album.artistName}</p>
      <ButtonGroup>
        <AddToCartButton album={album} />
        <AddToWishlistButton album={album} wishListId={wishListId} />
      </ButtonGroup>
      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            X
          </Button>
        </DialogActions>
        <DialogContent>
          <DialogContentText>
            <div>
              <div>
                Release Date: {new Date(album.releaseDate).toLocaleDateString()}
              </div>
              <div>Average Rating: {album.averageRating}</div>
            </div>
          </DialogContentText>
        </DialogContent>
        <AlbumPreview
          albumId={album._id}
          spotifyUrl={album.spotifyUrl}
          numOfReviews={album.numOfReviews}
        >
          <AlbumReviews albumId={album._id} />
        </AlbumPreview>
      </Dialog>
    </AlbumItemWrapper>
  );
}

export default Album;
