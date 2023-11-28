import React, { useState } from 'react';
import axiosInstance from '../../apis/axiosClient';
//import { useAuth } from '@akosasante/react-auth-context';

const DeleteReview = ({ reviewId, refreshReviews }) => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  // const { user } = useAuth();

  const handleDelete = async () => {
    setDeleting(true);
    console.log('this is the id', reviewId);

    try {
      // Make a DELETE request to the server to delete the review
      await axiosInstance.delete(`/reviews/${reviewId}`);

      // Trigger the refreshReviews callback to reload the reviews
      if (refreshReviews) {
        refreshReviews();
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      setError('Error deleting review. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={deleting}>
        {deleting ? 'Deleting...' : 'Delete Review'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DeleteReview;
