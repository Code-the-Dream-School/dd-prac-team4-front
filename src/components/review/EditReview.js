import React, { useState, useEffect } from 'react';
import axiosInstance from '../../apis/axiosClient';

const UpdateReview = ({ reviewId, refreshReviews }) => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    rating: '',
    title: '',
    comment: '',
  });

  useEffect(() => {
    // Fetch the current review data when the component mounts
    const fetchReviewData = async () => {
      try {
        const response = await axiosInstance.get(`/reviews/${reviewId}`);
        const { review } = response.data;
        setFormData({
          rating: review.rating,
          title: review.title,
          comment: review.comment,
        });
      } catch (error) {
        console.error('Error fetching review data:', error);
        setError('Error fetching review data. Please try again.');
      }
    };

    fetchReviewData();
  }, [reviewId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    setUpdating(true);

    try {
      // Make a PUT request to update the review
      await axiosInstance.patch(`/reviews/${reviewId}`, formData);

      // Trigger the refreshReviews callback to reload the reviews
      if (refreshReviews) {
        refreshReviews();
      }
    } catch (error) {
      console.error('Error updating review:', error);
      setError('Error updating review. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div>
      <h3>Edit Review</h3>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleUpdate} disabled={updating}>
        {updating ? 'Updating...' : 'Update '}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UpdateReview;
