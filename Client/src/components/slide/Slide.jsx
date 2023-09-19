
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#e36b09" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#e36b09" }}
      onClick={onClick}
    />
  );
}



const Slide = ({ children, slidesToScroll, showArrows, isAuto, slidesToShow }) => { 
  const settings = {
    arrows: showArrows,
    infinite: true,
    //centerMode: true,
    slidesToShow: slidesToShow || 1,
    slidesToScroll: slidesToScroll || 1,
    autoplay: isAuto,
    initialSlide: 0,
    autoplaySpeed: 7000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 4,
    //       slidesToScroll: 4,
    //       infinite: true,
         
          
    //     }
    //   },
    //   {
    //     breakpoint: 760,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       initialSlide: 0,
    //     }
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       initialSlide: 0,
          
    //     }
    //   }
    // ]
  }
  return (
    <div className="slide">
      <div className="container">
        <Slider {...settings} >{children}</Slider>
      </div>
    </div>
  );

 
};
export default Slide;



