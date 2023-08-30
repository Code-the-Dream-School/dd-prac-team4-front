import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
<<<<<<< HEAD
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
=======
import AddToCartButton from './layout/AddToCartButton/AddToCartButton';
>>>>>>> a43f9e1c218ecdedd0de2b3442748743e6534731

function Album({ album }) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <div className="album-item">
        {/* Image as a Button */}
        <Button onClick={handleOpenDialog} className="album-image-button">
          <img src={album.image} alt={album.albumName} className="album-image" />
        </Button>
        <p className="album-title">{album.albumName}</p>
        <p className="album-artist">{album.artistName}</p>
        <div className="button-container">
          {/* <Button variant="contained" color="primary" className="buy-button">
            Buy
          </Button> */}
          {/*AddToCartButton component */}
          <AddToCartButton album={album} />

          <Button
            variant="contained"
            color="secondary"
            className="wishlist-button"
          >
            Wishlist
          </Button>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{album.albumName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* You can customize the content here */}
            <div>
              <div>Release Date: {new Date(album.releaseDate).toLocaleDateString()}</div>
              <div>Average Rating: {album.averageRating}</div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}


export default Album;
