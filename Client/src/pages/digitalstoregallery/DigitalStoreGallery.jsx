import React, { useState } from 'react'
import "./DigitalStoreGallery.scss";
import { books } from '../../data'; /* check here later */
import DigitalStoreCard from "../../components/digitalStoreCard/DigitalStoreCard"; /* gig card may serve for time sake. edit later maybe */


const DigitalStoreGallery = () => {

  const [sort, setSort] = useState("sales");
const [open, setOpen] = useState(false);

const reSort = (type) => {
  setSort(type)
  setOpen(false)
}

  return (
    <div className='digitalstore'>
      <div className="container">
        <span className="breadcrumbs"> PHAXNETGIGS › GRAPHICS & DESGIN › </span>
        <h1>AI Artists</h1>
        <p> Browse the wonders of art and design with Phaxet Digital Artists</p>

        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input type="text" placeholder='min' />
            <input type="text" placeholder='max' />
            <button>Apply</button>

          </div>
          <div className="right">
            <span className='sortBy'>SortBy:</span>
            <span className='sortType'>{sort ==="sales" ? "Best Selling" : "Newest" }</span>
            <img src="./img/down.png" alt="" onClick={()=> setOpen(!open)}/>
            {open && <div className="rightmenu">
            {sort === "sales"?  (<span onClick={()=> reSort("createdAt")}>Newest</span>)
             : (<span onClick={()=> reSort("sales")}>Best Selling</span>)}
            </div>}

          </div>
        </div>

        
        <div className="cards">
          {books.map((gig) =>(

            <DigitalStoreCard  key={gig.id} item={gig}/>

          ))}
        </div>


      </div>
    </div>
  )
}

export default DigitalStoreGallery