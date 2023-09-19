// Import Swiper React components
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { register } from "swiper/element/bundle";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "./TestimonialSwiper.scss";


register();


 



export default function TestimonialSwiper(){
   
        const testimonialData = [
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
        
    return (
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        pagination={{ clickable: true }}
        //navigation={ true }
        breakpoints={{         
          480:{
            slidesPerView:1,
          },
          800: {
            slidesPerView: 2,
          },         
          1000:{
            slidesPerView:3
          },
          1100:{
            slidesPerView: 4
          }
        
        }}

        
      > {testimonialData.map((testimonial, index) => (
        <SwiperSlide key={index}>
         
          <div key={index} className='card'>
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
        </SwiperSlide>
      ))}
      </Swiper>
    );
  };