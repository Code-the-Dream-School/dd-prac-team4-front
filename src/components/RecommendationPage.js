import React, { useState, useEffect } from 'react';

const RecommendationPage = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch(`/recommendations/${userId}`)
      .then((response) => response.json())
      .then((data) => setRecommendations(data.recommendations))
      .catch((error) =>
        console.error('Error fetching recommendations:', error)
      );
  }, [userId]);

  return (
    <div>
      <h1>Recommendations</h1>
      <ul>
        {recommendations.map((album, index) => (
          <li key={index}>{album.albumName}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationPage;
