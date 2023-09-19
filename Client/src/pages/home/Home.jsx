import React,{useEffect, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import "./Home.scss";
import Featured from '../../components/featured/Featured';
import TrustedBy from '../../components/trustedBy/TrustedBy';
//import Slide from '../../components/slide/Slide';
import CategoryCard from '../../components/categoryCard/CategoryCard';
import  ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects, books, faqData } from '../../data.js';
import FAQ from '../../components/faq/FAQ';
import newRequest from '../../utils/newRequest';
import GigCard from '../../components/gigCard/GigCard';
import TestimonialSwiper from '../../components/TestimonialSwiper/TestimonialSwiper';


const Home = () => {
  const [popularGigs, setPopularGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currencyCode, setCurrencyCode] = useState('');

  useEffect(() => {
    fetchPopularGigs();
  }, []);

  const fetchPopularGigs = async () => {
    try {
      const response = await newRequest.get('/gigs'); // Replace with your API endpoint for fetching gigs
      const gigs = response.data.gigs;
      const currencyCode= response.data.currencyCode;
      setCurrencyCode(currencyCode)
      const popularGigs = gigs.filter((gig) => gig.sales > 0);
      setPopularGigs(popularGigs);
      setIsLoading(false);
    } catch (error) {
      setError('Failed to fetch gigs');
      setIsLoading(false);
      console.log(error)
    }
  };

  
  return (
 
    <div className='home'>
      <Featured />
      <TrustedBy />
     
      
      <div className='container  category'>
        <h2 className='sub-head'>Top Categories</h2>
        <div className='row'>
          {cards.map((card) => (
            <div key={card.id} className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>
              <CategoryCard card={card} />
            </div>
          ))}
     
      </div>

    </div>

    {/* //importing componenent stopped above. Features section starts: */}

    <div className="features">
      <h2 className='sub-head'>About The Marketplace</h2>
        <div className="container">

          <div className="item">
               <h1>Digital Services at your beck and call</h1>
               <div className='title'> 
                 <img src='/img/check.png' alt=''/>
                Meets every budget
                </div>
                <p>Access quality gigs and services at the prices you can afford</p>

                <div className='title'> 
                 <img src='/img/check.png' alt=''/>
                Well trained and tested talents
                </div>
                <p>Get your work done by in-house tested professionals</p>
                <div className='title'> 
                  <img src='/img/check.png' alt=''/>
                Secured Payment Gateways with currency swap features .
                </div>
                <p>Subject to numerous reviews until you approve</p>
          
              <div className='title'>
                  <img src='/img/check.png' alt=''/>
                  Effective Support System .
              </div>
              <p>We provide round the clock support and project based pricing.</p>
          </div>
          
          
         
          <div className="item">
            <video src='' controls></video>
          </div>
        </div>
      
      </div>
     
          
      <div className='testimonial-home container'>
        <h3 className='sub-head'>Customer Testimonials</h3>
        <div className='testimonial-container'>
        <TestimonialSwiper />
      {/* <Testimonials /> */}

        </div>
     
        

      </div>

     
      

      <div className=" popular-services container ">
        <h2 className='sub-head'>Popular Services</h2> 
        <div className='row  '>        

            {popularGigs.map((gig) => (
              <div key={gig._id} className='col-sm-12 col-md-6 col-lg-4 col-xl-3 text-center'>
              <GigCard currencyCode={currencyCode}  item={gig} />
              </div>
             
            ))}
            
         </div>
   
      </div>



      {/* //Phaxnet managed business solution section starts here: with these you can encourage buyers for you to manage their hiring needs */}

      <div className="features blue">
        <div className="container">

          <div className="item">
               <h1>Phaxnet Business</h1>
               <h1>Managed Business Solution</h1>
               <p>Access the top 1% of talent on Phaxnet Digitals, and a complete suite of hybrid workforce management tools.</p>
               <div className='title'> 
                 <img src='/img/check.png' alt=''/>
                 Talent matching
                </div>
                

                <div className='title'> 
                 <img src='/img/check.png' alt=''/>
                 Dedicated account management
                </div>
            
                <div className='title'> 
                  <img src='/img/check.png' alt=''/>
                 Team collaboration tools
                </div>
          
              <div className='title'>
                  <img src='/img/check.png' alt=''/>
                  Business payment solutions
              </div>
              <button>Explore Phaxnet Business</button>
          </div>          
         
          <div className="item">
            <img src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/c_scale,w_480,h_480,f_auto,q_auto,dpr_2.0/brontes/hero/globe@1x.jpg" alt='' />
          </div>
        </div>
      
      </div>

       {/* //Putting FAQ here */}
       <div className='faq'>
          <h2 className='sub-head' style={ {fontSize: '2.4rem',
            fontWeight: '700',  margin: '40px 0px'}}>Frequently Asked Questions</h2>
          <FAQ faqData={faqData} />
        </div>

      {/* another slider below to help show inspiring work done on Phaxnet*/}
      <div style={{display: 'flex', flexDirection: "column",   justifycontent: 'center',
    padding: '100px 0px 0px 0px', alignItems: "center" }}>
      <div style={{display: 'flex',    justifycontent: 'center', 
   }}>


       

         {/* <h2>Awesome Services Rendered on Phaxnet Digitals</h2> */}


      </div>
        {/* <Slide slidesToShow={4} slidesToScroll={4} isAuto={false} showArrows={true} >
            
            {projects.map((card) => (
             <ProjectCard key={card.id} card={card} />
           ))}
           
         </Slide> */}

        </div>
     



    </div>
   
  )
}

export default Home;