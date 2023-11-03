import React, { useEffect, useState } from 'react';
import { CardContent } from '@mui/material';
import AlbumReviews from '../review/ReviewsList';
import axiosInstance from '../../apis/axiosClient';
const AlbumPreview = ({
  spotifyUrl,
  style = {},
  wide = false,
  width = wide ? '100%' : 300,
  height = wide ? 80 : 380,
  frameBorder = 0,
  allow = 'encrypted-media',
  children,
  ...props
}) => {
  const [spotifyEmbedUrl, setSpotifyEmbedUrl] = useState('');
  const [mongoAlbumId, setMongoAlbumId] = useState(''); // State to store MongoDB album ID

  useEffect(() => {
    // regular expression pattern to extract the album ID from the Spotify **API** Url that's saved on the album object
    const regexPattern = /\/albums\/([a-zA-Z0-9]+)/;
    //  extract the album ID
    const match = spotifyUrl.match(regexPattern);
    if (!match) {
      // if URL doesn't match the expected format
      console.error('Invalid API URL');
      return;
    }
    //extract the album id
    const albumId = match[1];

    //  Spotify album URL for embedding
    const spotifyAlbumUrl = `https://open.spotify.com/embed/album/${albumId}`;
    setSpotifyEmbedUrl(spotifyAlbumUrl);

    // Fetch MongoDB album ID from  API
    // AKOS: how would I get the id of the album in this album preview component to pass it later  to ReviewsList.js as a prop on line 66?
    // I am absolutely wrong here when i pass here spotify id instead of album id
    axiosInstance
      .get(`/album/${albumId}`)
      .then((response) => {
        console.log(response.data);

        setMongoAlbumId(response.data);
      })
      .catch((error) => {
        console.error('Error fetching MongoDB album ID:', error);
      });
  }, [spotifyUrl]);

  return (
    <CardContent style={{ marginTop: '1rem', width: '100%', display: 'flex' }}>
      <iframe
        title="Spotify Web Player"
        src={spotifyEmbedUrl}
        width={width}
        height={height}
        frameBorder={frameBorder}
        style={{ borderRadius: 8, ...style, border: 'none' }}
        allow={allow}
        {...props}
      />
      {children && (
        <div style={{ width: '100%', display: 'flex' }}>{children}</div>
      )}
      <div>
        <AlbumReviews albumId={mongoAlbumId} />
      </div>
    </CardContent>
  );
};

export default AlbumPreview;
