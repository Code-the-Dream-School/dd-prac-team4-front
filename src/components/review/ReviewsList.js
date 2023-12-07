import React, { useEffect, useState, useCallback } from 'react';
import axiosInstance from '../../apis/axiosClient';
import WriteReview from './WriteReview';
import { Alert } from '@mui/material';
import { useAuth } from '@akosasante/react-auth-context';
import DeleteReview from './DeleteReview';

const AlbumReviews = ({ albumId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); //use user.user.<whatever field we want> to access it properly
  const userHasReviewed = (reviews || []).some(
    (review) => review.user === user?._id
  );

  const fetchAlbumReviews = useCallback(async () => {
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
  }, [albumId, user?._id]);

  useEffect(() => {
    fetchAlbumReviews();
  }, [fetchAlbumReviews]);

  // Function to refresh reviews
  const refreshReviews = () => {
    setLoading(true); // show the loading text while we go to fetch/refresh the reviews
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
              <p style={{ overflowWrap: 'break-word' }}>{review.comment}</p>
              {user && userHasReviewed && (
                <DeleteReview
                  reviewId={review._id}
                  refreshReviews={refreshReviews} // Akos: now I don't see the delete button at all- is it here where i shoul place a btn to make it appear below the comment to be deleted?
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        'No reviews yet'
      )}

      {user && userHasReviewed && (
        <p> You already submitted the review for this album</p>
      )}

      {/* Conditionally render the WriteReview component */}
      {user && !userHasReviewed && (
        <WriteReview albumId={albumId} refreshReviews={refreshReviews} />
      )}

      {/* {user && userHasReviewed && (
          <DeleteReview reviewId={
            reviews.find((review) => review.user === user?._id)?._id} refreshReviews={refreshReviews} />
        )} */}
    </div>
  );
};

export default AlbumReviews;
