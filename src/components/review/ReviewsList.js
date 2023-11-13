import React, { useEffect, useState } from 'react';
import axiosInstance from '../../apis/axiosClient';
import WriteReview from './WriteReview';

const AlbumReviews = ({ albumId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch reviews for the given album
    async function fetchAlbumReviews() {
      try {
        const response = await axiosInstance.get(`/reviews/album/${albumId}`);
        console.log(response.data.allProductReviews);

        const { allProductReviews } = response.data;
        setReviews(allProductReviews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching album reviews:', error);
        setLoading(false);
      }
    }

    fetchAlbumReviews();
  }, [albumId]);

  return (
    <div>
      <h2>Album Reviews</h2>
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
      <WriteReview/>
    </div>
  );
};

export default AlbumReviews;
