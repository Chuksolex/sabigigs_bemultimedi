import React from 'react';
import "./Home.scss";
import Featured from '../../components/featured/Featured';
import TrustedBy from '../../components/trustedBy/TrustedBy';
import Slide from '../../components/slide/Slide';
import CategoryCard from '../../components/categoryCard/CategoryCard';
import  ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects, books, faqData } from '../../data.js';
import FAQ from '../../components/faq/FAQ';



const Home = () => {
  return (
 
    <div className='home'>
      <Featured />
      <TrustedBy />
     
      
      {/* <Slide slidesToShow={4} arrowsScroll={4}>
        {cards.map((card) => (
          <CategoryCard key={card.id} card={card} />
        ))}
      </Slide> */}
      <Slide slidesToShow={4} slidesToScroll={4} isAuto={false} showArrows={true} >
          {cards.map((card) => (
            <div key={card.id}>
              <CategoryCard card={card} />
            </div>
          ))}
      </Slide>

{/* //importing componenent stopped above. Features section starts: */}

      <div className="features">
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
                Tested Freelancers.
                </div>
                <p>Get your work done by tested and trusted professionals</p>
                <div className='title'> 
                  <img src='/img/check.png' alt=''/>
                Secured Payment Gateways and method .
                </div>
                <p>Fund not released to gig providers until you approve</p>
          
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
          <h1>Frequently Asked Questions</h1>
          <FAQ data={faqData} />
        </div>

      {/* another slider below to help show inspiring work done on Phaxnet*/}
      <div style={{display: 'flex', flexDirection: "column",   justifycontent: 'center',
    padding: '100px 0px 0px 0px', alignItems: "center" }}>
      <div style={{display: 'flex',    justifycontent: 'center', 
   }}>


       

         <h2>Awesome Services Rendered on Phaxnet Digitals</h2>


      </div>
        <Slide slidesToShow={4} slidesToScroll={4} isAuto={false} showArrows={true} >
            
            {projects.map((card) => (
             <ProjectCard key={card.id} card={card} />
           ))}
           
         </Slide>

        </div>
     



    </div>
   
  )
}

export default Home;