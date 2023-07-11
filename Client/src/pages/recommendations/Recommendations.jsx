import React, { useEffect, useState } from 'react';
import newRequest from '../../utils/newRequest';
import GigCard from '../../components/gigCard/GigCard';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch browsing history from local storage
    const storedHistory = localStorage.getItem('browsingHistory');
    const browsingHistory = storedHistory ? JSON.parse(storedHistory) : [];

    // Extract gigIds from browsing history
    const gigIds = browsingHistory.map((item) => item._id);

    // Fetch recommendations based on gigIds
    const fetchRecommendations = async () => {
      try {
        const response = await newRequest.get(`/recommendations?gigIds=${gigIds.join(',')}`);
        const recommendations = response.data;
        setRecommendations(recommendations);
        console.log(recommendations);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div>
      <h2>Recommended Services</h2>
      {recommendations.length > 0 ? (
        <ul>
          {recommendations.map((recommendation) => (
            <li key={recommendation._id}>
              <GigCard item={recommendation} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommendations available</p>
      )}
    </div>
  );
};

export default Recommendations;
