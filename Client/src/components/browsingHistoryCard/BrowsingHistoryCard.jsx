import React from 'react';
import { Link, useParams } from 'react-router-dom';
import "./BrowsingHistoryCard.scss";
import Gig from '../../pages/gig/Gig';

const BrowsingHistoryCard = ({ item }) => {
  const handleClick = () => {
    // Perform any necessary logic

    // Change the route and reload the page
    window.location.href = `/gig/${item._id}`;
  };



  
  return (
    <div className='historycard' onClick={handleClick}>
      {/* <Link to={`/gig/${item._id}`}> */}
        <img src={item.cover} alt="" />
        <div className="info">
          <p>{item.title}</p>
          {!isNaN(item.totalStars / item.starNumber) && (
            <div className="stars">
              {Array(Math.round(item.totalStars / item.starNumber)).fill().map((_, i) => (
                <img src="/img/star.png" key={i} alt="" />
              ))}
              <span>{Math.round(item.totalStars / item.starNumber)}</span>
            </div>
          )}
        </div>
      {/* </Link> */}
    </div>
  );
};

export default BrowsingHistoryCard;
