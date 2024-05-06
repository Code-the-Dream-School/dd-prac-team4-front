import React, { useEffect, useState } from 'react';
import { CardContent } from '@mui/material';

const AlbumPreview = ({
  spotifyUrl,
  style = {},
  contentLayout,
  wide = false,
  width = wide ? '100%' : 300,
  height = wide ? 80 : 380,
  frameBorder = 0,
  allow = 'encrypted-media',
  children,
  ...props
}) => {
  const [spotifyEmbedUrl, setSpotifyEmbedUrl] = useState('');

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
    const spotifyAlbumId = match[1];

    //  Spotify album URL for embedding
    const spotifyAlbumUrl = `https://open.spotify.com/embed/album/${spotifyAlbumId}`;
    setSpotifyEmbedUrl(spotifyAlbumUrl);
  }, [spotifyUrl]);

  return (
    <>
      <CardContent
        style={{
          marginTop: '1rem',
          width: '100%',
          display: 'flex',
          flexDirection: contentLayout,
          justifyContent: 'center',
        }}
      >
        <iframe
          title="Spotify Web Player"
          src={spotifyEmbedUrl}
          width={width}
          height={height}
          frameBorder={frameBorder}
          style={{
            borderRadius: 8,
            ...style,
            border: 'none',
            display: 'flex',
            flexDirection: contentLayout,
            justifyContent: 'center',
          }}
          allow={allow}
          {...props}
        />

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: contentLayout,
            justifyContent: 'center',
          }}
        >
          {children}
        </div>

      </CardContent>
    </>
  );
};

export default AlbumPreview;
