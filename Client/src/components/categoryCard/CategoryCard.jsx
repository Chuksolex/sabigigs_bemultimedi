import React from 'react';
import { Link } from 'react-router-dom';
import "./CategoryCard.scss";

const CategoryCard = ({card}) => {
  return (
    <Link to="/gigs?cat=design">
       <div className="categoryCard">
          <img src={card.img} alt=''/>
         <span className='description'>{card.desc}</span>
         <span className='title'>{card.title}</span>
      </div>  
    
    
    </Link>
   
  )
}

export default CategoryCard;

