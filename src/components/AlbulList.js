import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';

const AlbumsList = () => {
  const [albums, setAlbums] = useState([]); // for albums
  const [limit, setLimit] = useState(1); // for pagination
  const [searchType, setSearchType] = useState('albumName'); //default value for select input
  const [searchTerm, setSearchTerm] = useState(''); // for search input filed value
  const [message, setMessage] = useState('');

  //make an API call with search values to backend and return the result
  const fetchAlbums = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/v1/albums/filter',
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
    }
  };

  //call the function to make API request for search input value
  const handleSearch = () => {
    setLimit(1);
    fetchAlbums();
  };

  //clear search input and make an empty API call
  const handleClear = () => {
    setSearchType('albumName');
    setSearchTerm('');
    setLimit(1);
    setMessage('');
    fetchAlbums();
  };

  return (
    <Container>
      <FormControl variant="outlined" margin="normal">
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
      <TextField
        label={`Search ${searchType === 'albumName' ? 'Album' : 'Artist'}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      <Button variant="contained" onClick={handleClear}>
        Clear
      </Button>
      {albums.length > 0 ? (
        {
          /* <SearchResult searchResult={albums} /> */
        }
      ) : (
        <Typography variant="h4">{message}</Typography>
      )}
    </Container>
  );
};

export default AlbumsList;
