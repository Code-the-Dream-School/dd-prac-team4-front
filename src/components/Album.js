import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddToCartButton from './layout/AddToCartButton/AddToCartButton';
import { Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

const AlbumItemWrapper = styled('div')(({ theme }) => ({
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
import AddToWishlistButton from './layout/AddToWishlistButton/AddToWishlistButton';

function Album({ album, wishListId }) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <AlbumItemWrapper>
      <Button onClick={handleOpenDialog} className="album-image-button">
        <AlbumImage src={album.image} alt={album.albumName} />
      </Button>
      <Tooltip title={album.albumName} arrow>
        <AlbumTitle>{album.albumName}</AlbumTitle>
      </Tooltip>
      <p className="album-artist">{album.artistName}</p>
      <div className="button-container">
        <AddToCartButton album={album} />
        <AddToWishlistButton album={album} />
      </div>
      <Grid item xs={12} sm={6} md={4}>
        <div className="album-item">
          {/* Image as a Button */}
          <Button onClick={handleOpenDialog} className="album-image-button">
            <img
              src={album.image}
              alt={album.albumName}
              className="album-image"
            />
          </Button>
          <p className="album-title">{album.albumName}</p>
          <p className="album-artist">{album.artistName}</p>
          <div className="button-container">
            <AddToCartButton album={album} />
            <AddToWishlistButton album={album} />
          </div>
        </div>

        {/* Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{album.albumName}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {/* You can customize the content here */}
              <div>
                <div>
                  Release Date:{' '}
                  {new Date(album.releaseDate).toLocaleDateString()}
                </div>
                <div>Average Rating: {album.averageRating}</div>
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Grid>
    </AlbumItemWrapper>
  );
}

export default Album;
