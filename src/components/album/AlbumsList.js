import React, { useState, useEffect, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import AlbumGrid from './AlbumGrid';
import OrderSidebar from '../OrderSidebar';
import axiosInstance from '../../apis/axiosClient';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
  const [totalPages, setTotalPages] = useState(1); // Track total pages for this search
  const [searchType, setSearchType] = useState('albumName'); //default value for select input
  const [searchTerm, setSearchTerm] = useState(''); // for search input filed value
  const [message, setMessage] = useState(''); // for not found message
  const [errorMessage, setErrorMessage] = useState(''); // for error message
  const [wishListId, setWishListId] = useState();
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [lastSearchTerm, setLastSearchTerm] = useState(''); // Track the input value of the search last time the user clicked "Search" or "Clear" button
  const limit = 12;
  //make an API call with search values to backend and return the result
  const fetchAlbums = useCallback(async () => {
    try {
      // Calculate the offset, based on the current page (alternatively, we could use the `nextPage`/`prevPage` values returned by the API; but this is more flexible since the user can also clear the search or switch search type altogether)
      const offset = (currentPage - 1) * limit;
      const response = await axiosInstance.get('/albums/filter', {
        params: {
          limit,
          // we use the `lastSearchTerm` value which is only set by us explicitly in code, rather than `searchTerm` which would also get changed whenever the user types into the input box
          [searchType]: lastSearchTerm,
          offset,
        },
      });
      const searchResult = response.data.albums;
      setAlbums(searchResult);
      setTotalPages(response.data.totalPages);
      if (searchResult.length === 0) {
        setMessage('No result found');
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
      setErrorMessage(error.message);
      setOpen(true);
    }
  }, [currentPage, lastSearchTerm, searchType]);

  // This will run on component mount and whenever the `fetchAlbums` function changes
  // Based on the dependency array we gave the `useCallback` above which wraps `fetchAlbums`,
  // this means that this `useEffect` will run any time the `currentPage` or `lastSearchTerm` or `searchType` values change
  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

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
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
    setLastSearchTerm(searchTerm);
  };

  //clear search input and make an empty API call
  const handleClear = () => {
    setSearchTerm('');
    setMessage('');
    setCurrentPage(1);
    setLastSearchTerm('');
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

  // Changing the current page will update the UI and will also trigger the useEffect above to call the `fetchAlbums` callback
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    setSearchTerm('');
    setCurrentPage(1);
    setLastSearchTerm('');
  };

  return (
    <Container fullWidth>
      {/* display snackbar if any error happened during API fetch */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errorMessage}
        action={action}
      />
      {/* start of searchbar grid */}
      <Grid container spacing={2} justifyContent="center" sx={{ my: 2 }}>
        <Grid item xs={12} sm={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Search By</InputLabel>
            <Select
              value={searchType}
              onChange={handleSearchTypeChange}
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
      {/* end of searchbar grid */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          {albums.length > 0 ? (
            <>
              <AlbumGrid albums={albums} wishListId={wishListId} />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: '3rem',
                  mb: '2rem',
                }}
              >
                <Stack spacing={2}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    color="primary"
                    onChange={handlePageChange}
                  />
                </Stack>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                textAlign: 'center',
                mt: '1.25rem',
                mb: '1.25rem',
              }}
            >
              {/* no result found message */}
              <Typography variant="h4">{message}</Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={2}>
          <OrderSidebar />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AlbumsList;
