import React from 'react';
import { Link } from 'react-router-dom';
import "./DigitalStoreCard.scss";

const DigitalStoreCard = ({item}) => {
  return (
    <div className='gigCard'>
        <Link to="/gig/123">
            <img src={item.img} alt="" />
            <div className="info">              

                <p>{item.title}</p>
                <div className="star">
                    <img src="./img/star.png" alt="" />
                    <span>{item.star}</span>
                </div>                

            </div>
            <hr />

            <div className="details">
                <img src="./img/heart.png" alt="" />

                <div className="price">
                     <span>PRICE:</span>
                     <h2>${item.price}</h2>
                </div>
               


            </div>

        </Link>
    
    </div>
  )
}

export default DigitalStoreCard