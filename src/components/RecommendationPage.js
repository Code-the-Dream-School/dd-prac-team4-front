import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosClient';

const RecommendationPage = ({ userId }) => {
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
      <h1>Recommendations</h1>
      {error ? (
        <p>{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {recommendations.map((album) => (
            <li key={album.albumName}>{album.albumName}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecommendationPage;
