import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import AlbumGrid from './AlbumGrid';
import axiosInstance from '../apis/axiosClient';

import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Grid,
} from '@mui/material';

const AlbumsList = () => {
  const [albums, setAlbums] = useState([]); // for albums
  const [limit, setLimit] = useState(1); // for pagination
  const [searchType, setSearchType] = useState('albumName'); //default value for select input
  const [searchTerm, setSearchTerm] = useState(''); // for search input filed value
  const [message, setMessage] = useState(''); // for not found message
  const [errorMessage, setErrorMessage] = useState(''); // for error message
  const [wishListId, setWishListId] = useState();

  //make an API call with search values to backend and return the result
  const fetchAlbums = async (searchType, searchTerm, limit) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_PATH}/albums/filter`,
        {
          params: {
            limit,
            [searchType]: searchTerm,
          },
        }
      );
      const searchResult = response.data.albums;
      setAlbums(searchResult);
      if (searchResult.length === 0) {
        setMessage('No result found');
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
      setErrorMessage(error.message);
      setOpen(true);
    }
  };

  //display 10 albums when first user visit this page
  useEffect(() => {
    fetchAlbums('albumName', '', 10);
  }, []);

  //fetch wishlist album from API
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.post(`/wishlist/`); //use axiosInstance to send cookie token with request
        const wishlistData = response.data.wishlist;
        setWishListId(wishlistData._id);
        // Store object in local storage where keys are album id and value is the whole album
        const wishlistAlbumsToStore = {};
        wishlistData.albums.forEach((album) => {
          wishlistAlbumsToStore[album._id] = album;
        });
        localStorage.setItem(
          'wishlistAlbums',
          JSON.stringify(wishlistAlbumsToStore)
        );
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  //call the function to make API request for search input value
  const handleSearch = () => {
    fetchAlbums(searchType, searchTerm, limit);
  };

  //clear search input and make an empty API call
  const handleClear = () => {
    setSearchType('albumName');
    setSearchTerm('');
    setLimit(1);
    setMessage('');
    fetchAlbums('albumName', '', 0);
  };

  // snackbar start
  const [open, setOpen] = React.useState(false);

  //close the snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  //end of snackbar

  return (
    <Container>
      {/* display snackbar if any error happened during API fetch */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errorMessage}
        action={action}
      />
      <Grid
        sx={{ marginTop: '20px' }}
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid item xs={12} sm={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Search By</InputLabel>
            <Select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              label="Search By"
            >
              <MenuItem value="albumName">Album</MenuItem>
              <MenuItem value="artistName">Artist</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label={`Search ${searchType === 'albumName' ? 'Album' : 'Artist'}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="contained" onClick={handleSearch} fullWidth>
            Search
          </Button>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="contained" onClick={handleClear} fullWidth>
            Clear
          </Button>
        </Grid>
      </Grid>

      {albums.length > 0 ? (
        <AlbumGrid albums={albums} wishListId={wishListId} />
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            mt: '20px',
            mb: '20px',
          }}
        >
          <Typography variant="h4">{message}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default AlbumsList;
