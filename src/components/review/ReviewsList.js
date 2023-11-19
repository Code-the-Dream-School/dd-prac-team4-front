import React, { useEffect, useState } from 'react';
import axiosInstance from '../../apis/axiosClient';
import WriteReview from './WriteReview';
import { Alert } from '@mui/material';
import { useAuth } from '@akosasante/react-auth-context';



const AlbumReviews = ({ albumId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userHasReviewed, setUserHasReviewed] = useState(false);

const { user } = useAuth(); //use user.user.<whatever field we want> to access it properly  

  useEffect(() => {
    fetchAlbumReviews();
  }, [albumId]);

  const fetchAlbumReviews = async () => {
    try {
      const response = await axiosInstance.get(`/reviews/album/${albumId}`);
      console.log(response.data.allProductReviews);

      const { allProductReviews } = response.data;
      setReviews(allProductReviews);
      // Check if the user has already reviewed the album
      const hasReviewed = allProductReviews.some(review => review.userId === user.user._id);
      setUserHasReviewed(hasReviewed);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching album reviews:', error);
      setError('Error fetching album reviews. Please try again later.');
      setLoading(false);
    }
  };

  // Function to refresh reviews
  const refreshReviews = () => {
    setLoading(true) // show the loading text while we go to fetch/refresh the reviews
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
        {/* Conditionally render the WriteReview component */}
        {user && !userHasReviewed && <WriteReview albumId={albumId} refreshReviews={refreshReviews} />}

    </div>
  );
};

export default AlbumReviews;
