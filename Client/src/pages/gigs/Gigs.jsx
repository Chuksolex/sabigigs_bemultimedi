import React, { useRef, useState, useEffect } from 'react'
import "./Gigs.scss";
//import { gigs } from '../../data'; (no longer needed. we now use database through useQuery)
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useLocation } from 'react-router-dom';

const Gigs = () => {

      const [sort, setSort] = useState("sales");
      const [open, setOpen] = useState(false);
      const minRef = useRef();
      const maxRef = useRef();

      const {search} = useLocation();

      console.log(search);

       

      
        const { isLoading, error, data, refetch } = useQuery({
          queryKey: ['gigs'],
          queryFn: () =>
            newRequest.get(
              `/gigs?${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort${sort}`
              )
            .then(
              (res) => {
              return res.data;
            })
          
        });
        
        console.log(data);

    const reSort = (type) => {
          setSort(type)
          setOpen(false)
    };

    useEffect(() => {
      refetch();
    }, [sort]);
  
    const apply = () => {
      refetch();
    };


    return (
    <div className='gigs'>
      <div className="container">
        <span className="breadcrumbs"> PHAXNETGIGS › GRAPHICS & DESGIN › </span>
        <h1>Gigs</h1>
        <p> Browse the wonders of art and design with Phaxnetgigs</p>

        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" name='min' placeholder="min" />
            <input ref={maxRef} type="number" name='max' placeholder="max" />
            <button onClick={apply}>Apply</button>

          </div>
          <div className="right">
            <span className='sortBy'>SortBy:</span>
            <span className='sortType'> {sort ==="sales" ? "Best Selling" : "Newest" }</span>
            <img src="./img/down.png" alt="" onClick={()=> setOpen(!open)}/>
            {open && (
                <div className="rightmenu">
                     {sort === "sales"?  ( 
                        <span onClick={()=> reSort("createdAt")}>Newest</span>
                      ) : (
                      <span onClick={()=> reSort("sales")}>Best Selling</span>
                      )}
                      <span onClick={() => reSort("sales")}>Popular</span>
              

            </div>)}

          </div>
        </div>

        
        <div className="cards">
          {isLoading? "Loading" : error? "Something went wrong!" : data.map((gig) =>(

            <GigCard  item={gig}/>

          ))}
        </div>


      </div>
    </div>
  )
}

export default Gigs