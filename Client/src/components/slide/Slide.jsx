// import React from "react";
// import "./Slide.scss";
// import Slider from "infinite-react-carousel";


// const Slide = ({ children, slidesToShow, arrowsScroll }) => {
//   return (
//     <div className="slide">
//       <div className="container">
//         <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll} >
//           {children}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default Slide;

import React from "react";
//import "./Slide.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "blue" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "blue" }}
      onClick={onClick}
    />
  );
}



const Slide = ({ children, slidesToShow, slidesToScroll, showArrows, isAuto }) => { 
  const settings = {
    arrows: showArrows,
    infinite: true,
    slidesToShow: slidesToShow || 1,
    slidesToScroll: slidesToScroll || 1,
    autoplay: isAuto,
    autoplaySpeed: 1000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <div className="slide">
      <div className="container">
        <Slider {...settings} >{children}</Slider>
      </div>
    </div>
  );

 
};
export default Slide;



