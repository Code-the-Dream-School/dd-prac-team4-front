import React, { useState, useEffect } from 'react';
import axiosInstance from '../apis/axiosClient';
import { Typography, ListItem, List } from '@mui/material';
import { useAuth } from '@akosasante/react-auth-context';
const RecommendationPage = () => {
  const { user } = useAuth();
  const userId = user?.user?._id;

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      axiosInstance
        .get(`/recommendations/${userId}`)
        .then((response) => {
          setRecommendations(response.data.recommendations);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching recommendations:', error);
          setError('An error occurred while fetching recommendations.');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [userId]);

  return (
    <div>
      <Typography
        fontWeight="bold"
        color="text.secondary"
        variant="h5"
        spacing={0.5}
        sx={{ mb: 2, p: 3 }}
      >
        Recommendations
      </Typography>
      {error ? (
        <Typography color="error.main">{error}</Typography>
      ) : loading ? (
        <Typography>Fetching recommendations...</Typography>
      ) : recommendations.length === 0 ? (
        <Typography>
          Sorry, we don't have any recommendations for you yet. As you add more
          albums to your library, we'll be able to generate some for you.
        </Typography>
      ) : (
        <List>
          {recommendations.map((album) => (
            <ListItem key={album.albumName} sx={{ mb: 1 }}>
              {album.albumName}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default RecommendationPage;
