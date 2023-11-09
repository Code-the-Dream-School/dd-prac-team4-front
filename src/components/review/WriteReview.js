import React, { useState } from 'react';
import axiosInstance from '../../apis/axiosClient';

const WriteReview = ({ albumId, refreshReviews }) => {
  const [formData, setFormData] = useState({
    user: null,
    album: null,
    title: '',
    rating: 0,
    comment: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axiosInstance.post(`/reviews/album/${albumId}`, {
        user: '64f89c8ee770c1c0a79f6e77', // my id for tests
        album: albumId,
        title: formData.title,
        rating: formData.rating,
        comment: formData.comment,
      });
      console.log(response.data.review);
      // Optionally, you can update the UI with the new review or perform other actions
      // Trigger the refreshReviews callback to reload the reviews
      if (refreshReviews) {
        refreshReviews();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Error submitting review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
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
            min="1"
            max="5"
            required
          />
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
        <div>{error && <p style={{ color: 'red' }}>{error}</p>}</div>
      </form>
    </div>
  );
};

export default WriteReview;

//Akos: I had to hardcode the userId- not sure where to retrieve it from? 
//need to check later id this option 'write a review' is shown only to users who didn't leave a review for this/that album yet
