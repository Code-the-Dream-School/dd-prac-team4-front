import React, { useEffect, useState } from 'react';
import axiosInstance from '../../apis/axiosClient';
import WriteReview from './WriteReview';
import { Alert } from '@mui/material';

const AlbumReviews = ({ albumId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAlbumReviews();
  }, [albumId]);

  const fetchAlbumReviews = async () => {
    try {
      const response = await axiosInstance.get(`/reviews/album/${albumId}`);
      console.log(response.data.allProductReviews);

      const { allProductReviews } = response.data;
      setReviews(allProductReviews);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching album reviews:', error);
      setError('Error fetching album reviews. Please try again later.');
      setLoading(false);
    }
  };

  // Function to refresh reviews
  const refreshReviews = () => {
    // Simply call the fetchAlbumReviews function to refresh
    fetchAlbumReviews();
  };

  return (
    <div>
      <h2>Album Reviews</h2>
      {error && <Alert severity="error">{error}</Alert>}

      {loading && <p>Loading reviews...</p>}

      {reviews?.length ? (
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <h3>{review.title}</h3>
              <p>Rating: {review.rating}</p>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        'No reviews yet'
      )}
      <WriteReview albumId={albumId} refreshReviews={refreshReviews} />
    </div>
  );
};

export default AlbumReviews;
