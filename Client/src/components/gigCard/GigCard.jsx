import React from 'react';
import { Link, useNavigate, useNavigation, useParams } from 'react-router-dom';
import "./GigCard.scss";
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';






const GigCard = ({item}) => {

    const { isLoading, error, data} = useQuery({
        queryKey: [item.userId],
        queryFn: () =>
          newRequest.get(`/users/${item.userId}`)
          .then(
            (res) => {
            return res.data;
          })
        
      });
      const navigate = useNavigate();
  

    const handleClick = () => {
      // Load browsing history from local storage
      const storedHistory = localStorage.getItem('browsingHistory');
      let parsedHistory = [];
      if (storedHistory) parsedHistory = JSON.parse(storedHistory);
    
      // Check if the gig already exists in the browsing history
      const gigExists = parsedHistory.some((gig) => gig._id === item._id);
    
      // If the gig doesn't exist, add it to the browsing history
      if (!gigExists) {
        parsedHistory.push(item);
    
        // Save updated browsing history to local storage
        localStorage.setItem('browsingHistory', JSON.stringify(parsedHistory));
      }
    
      // Navigate to the gig page
      navigate(`/gig/${item._id}`);
    };


    const renderPromoBadge = () => {
      if (item.promo) {
        return <span className="promo-badge">Promo</span>;
      }
      return null;
    }; 




  return (
    <div className='gigCard'>
        <div onClick={handleClick}>  {/*Here I had a lot of headache...since you mapped gigs from grigs component, here you link particular gig with itemid as /gig/item._id  */}
            <img src={item.cover} alt="" />
            <div className="info">
              {isLoading ? ("Loading.."
                 ):  error ? (
                    "Something went wrong!" 
                    ) : (
                         <div className="user">
                              <img src={data.img || "/img/noavatar.jpg"} alt="" />
                              {renderPromoBadge}
                              <span>{data.username}</span>
                          </div>
                )}

                <p>{item.title}</p>
                <div className="star">
                    <img src="./img/star.png" alt="" />
                    <span>{!isNaN(item.totalStars / item.starNumber) && Math.round(item.totalStars / item.starNumber)}</span>
                </div>                

            </div>
            <hr />

            <div className="details">
                <img src="./img/heart.png" alt="" />

                <div className="price">
                     <span>From:</span>
                     <h2>${item.price_basic}</h2>
                </div>            
           </div>

        </div>
    
    </div>
  )
}

export default GigCard