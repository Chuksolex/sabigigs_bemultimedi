import React, { useState } from 'react';
import "./Featured.scss";
//import Slide from '../slide/Slide';
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';






const Featured = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSearch= () => {
    if (input.trim() !== "") {
    navigate(`/gigs?search=${input}`);
    setInput("");
  }
  }
    const CustomPrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "none" }}
            onClick={onClick}
          />
        );
      };
      
      const CustomNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "none" }}
            onClick={onClick}
          />
        );
      };
      

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesPerRow:1,
        arrowsToScroll:1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,      
        autoplay: true,
        autoplaySpeed: 9000,
      
      };

  return (
    <div className='featured'>
        <div className="container">
            <div className="left">
                <h1>Find the right gigs & <i>services </i> for your business, right away</h1>

                 <div className="search">
                    <div className="searchInput">
                        <img src= 'img/search.png' alt=''/>
                        <input type="text" placeholder='search any service' onChange={(e) => setInput(e.target.value)}/>
                    </div>
                    <button onClick={handleSearch}>Search</button>

                 </div>
                 <div className="popular">
                    <span>Popular:</span>
                    <button>Web Design</button>
                    <button>Logo Design</button>
                    <button>SEO Services</button>
                    <button>Software</button>
                 </div>
            </div>
            <div className="right">
                
            <Slider {...settings}>
            <div className="image-slider">
              <img src="/img/christy.png"  />
            </div>
            <div className="image-slider">
              <img src="/img/finegirl1.png"  />
            </div>
            <div className="image-slider">
              <img src="/img/blackman1.png"  />
            </div>
            <div className="image-slider">
              <img src="/img/finegirl.png"  />
            </div>
          
            {/* <div>
            <img src="/img/christy2.png"  />
            </div> */}
           
            
          </Slider>
       
               
                {/* <Slide slidesToShow={1} arrowsScroll={1} isAuto={false} >
                    <div><img src="img/christy.png" alt="" /></div>
                    <div><img src="img/christy2.png" alt="" /></div>
                    <div><img src="img/man.png" alt="" /></div>
                
             
      
                  </Slide> */}
                
            </div>

        </div>
    </div>
  )
}

export default Featured



