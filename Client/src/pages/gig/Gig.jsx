import React, {useEffect, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import "./Gig.scss";
import PricingTab from '../../components/pricingTab/PricingTab';
import { Link, useParams } from "react-router-dom";
import newRequest from '../../utils/newRequest';
import Reviews from '../../components/reviews/Reviews';
import FAQ from '../../components/faq/FAQ';
import PackageComparisonTable from '../../components/packageComparisom/PackageComparisonTable';
import Slide from '../../components/slide/Slide';
import BrowsingHistoryCard from '../../components/browsingHistoryCard/BrowsingHistoryCard';
import GigCard from '../../components/gigCard/GigCard';
import Recommendations from '../recommendations/Recommendations';


function Gig () {


   const { id } = useParams();
   const [browsingHistory, setBrowsingHistory] = useState([]); //managing the state of the browsing 


  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/singlegig/${id}`).then((res) => {
        return res.data;
    

      }),
  });

    const userId = data?.userId;
 
     
    

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user",],
    queryFn:  () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
     enabled: !!userId,
  });

  


  useEffect(() => {
    // Load browsing history from local storage
    const storedHistory = localStorage.getItem('browsingHistory');
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory);
      setBrowsingHistory(parsedHistory);
    }
  }, []);

  

 

  return (
    <div className="gig">
      
      {isLoading ? (
        "loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
      <div className="container">
        <div className='upperSide'>
        <div className="left">
          
            <span className='breadcrumbs'>Phaxnetgigs › Graphics & Design ›</span>
            <h1> {data.title}</h1>

            {isLoadingUser? "Loading.." : 
              errorUser? "Something went wrong!" :
             <div className="user">
             <img
              className="pp"
              src={dataUser.img}
              alt=""
             />
              <span>{dataUser.username}</span>
              {!isNaN(data.totalStars / data.starNumber) && (
                 <div className="stars">
                   {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) =>(
                                    <img src="/img/star.png" key={i} alt="" />

                   ))}
                
                   <span>{Math.round(data.totalStars / data.starNumber)}</span>

                 </div>
                 )}
                          
            </div>}
            <div className='background-images'>
            <Slide slidesToShow={1} isAuto={true} slidesToScroll={1}>
  {data.images.map((imag, i) => (
    <img key={i} src={imag} />
  ))}
</Slide>
          </div> 
           
            <h2>About This Gig</h2>
            <p>  {data.desc}    </p>

            {isLoadingUser? "Loading.." : 
              errorUser? "Something went wrong!" :
            <div className="seller">
               <h2>About The Seller</h2>
              
              <div className="user">
               <img
                src={dataUser.img || "/img/noavatar.jpg"}
                alt=""
                />
                <div className="info">
                  <span>{dataUser.username}</span>
                  {!isNaN(data.totalStars / data.starNumber) && (
                 <div className="stars">
                   {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) =>(
                                    <img src="/img/star.png" key={i} alt="" />

                   ))}
                
                   <span>{Math.round(data.totalStars / data.starNumber)}</span>

                 </div> )}
                 <button><icon>✉️</icon>Contact Seller</button>
                
                   
                </div>
                
               
              
              </div>
              <div className="box">
            <div className="items">
              <div className="item">
                <span className="title">From</span>
                <span className="desc">{dataUser.country}</span>

              </div>
              <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>

            </div>
            <hr />
            <p> {dataUser.desc}</p>
          </div>

            </div>}

          

          
          
          
        </div>

        
        <div className="right">
          <div className='pricingTab'>
              <PricingTab key={data._id} item={data} />

          </div>
         

            <div className='comparePackage'>
              <h3>Compare Package</h3>

              <PackageComparisonTable key={data._id} item={data} />

            </div>

          
        </div>
       </div>
       <div className='faq'>
          <h1>Frequently Asked Questions</h1>
          <FAQ data={data.faqs} />
        </div>
        <div className='recommended-servics'>          
          <div  className='recommend' >
          {<Recommendations />}     
        
       
       </div>
        </div>  

        <div className='browsing-history'>
          <h2>Your Browsing History</h2>
          <div  className='history' >

          {browsingHistory.map((gighistory) => (
                 <BrowsingHistoryCard key={gighistory._id} item={gighistory} />
          
          )
          )}
       
       </div>
        </div>  

       <div>
          <Reviews gigId={id} />
       </div>
       

       
        
      </div>
      )
       } 
    </div>
  )
}

export default Gig