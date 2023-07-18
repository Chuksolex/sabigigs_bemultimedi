import React from 'react';
import './Testimonials.scss';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import Slide from '../slide/Slide';

const Testimonials = () => {
    const testimonials = [
        {
          image:  "https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600",
          name: 'John Clark',
          rating: 4,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          image: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
          name: 'Moreen',
          rating: 5,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            image: 'https://marketpresso.com/public/upload/96/lib/68941_1580280960_lib.jpg',
            name: 'Jane Smith',
            rating: 5,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
          {
            image: 'https://marketpresso.com/public/upload/96/lib/92627_1580280988_lib.jpg',
            name: 'Chuks Olex',
            rating: 5,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
          {
            image: 'https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=1600',
            name: 'Mary Ann',
            rating: 5,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
        // Add more testimonials here
      ];

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="testimonial">
        <h3>Testimonials</h3>
      <Slide slidesToShow={3} slidesToScroll={1} isAuto={false} showArrows={true} >
        {testimonials.map((testimonial, index) => (
          <div key={index}>
            <div className='top'>
                 <img src={testimonial.image} alt={testimonial.name} />
                <h5>{testimonial.name}</h5>

            </div>
           
            <div className="testimonial-details">
              
              <div className="rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`star ${i < testimonial.rating ? 'filled' : ''}`}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <p>{testimonial.description}</p>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Testimonials;
