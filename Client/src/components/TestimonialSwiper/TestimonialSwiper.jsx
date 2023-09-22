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
              description: 'Amazing work! Exceeded my expectations.',
            },
            {
              image: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
              name: 'Moreen',
              rating: 5,
              description: 'Quick delivery and top-notch quality.',
            },
            {
                image: 'https://marketpresso.com/public/upload/96/lib/68941_1580280960_lib.jpg',
                name: 'Jane Smith',
                rating: 5,
                description: 'Highly recommended! Will order again.',
              },
              {
                image: 'https://marketpresso.com/public/upload/96/lib/92627_1580280988_lib.jpg',
                name: 'Chuks Olex',
                rating: 5,
                description: 'Talented seller, great communication..',
              },
              {
                image: 'https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=1600',
                name: 'Benjamin',
                rating: 5,
                description: 'Impressed by the creativity!',
              },
              {
                image: 'https://images.pexels.com/photos/2414779/pexels-photo-2414779.jpeg?auto=compress&cs=tinysrgb&w=600',
                name: 'Billy Paulson',
                rating: 5,
                description: 'Outstanding service! Very satisfied.',
              },
              {
                image: 'https://images.pexels.com/photos/18330563/pexels-photo-18330563/free-photo-of-grass-on-the-yard-outside-of-a-castle.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                name: 'Presh',
                rating: 5,
                description: 'Delivered on time, flawless work.',
              },
              {
                image: 'https://images.pexels.com/photos/18369315/pexels-photo-18369315/free-photo-of-tet-holiday-in-vietnam.png?auto=compress&cs=tinysrgb&w=600&lazy=load',
                name: 'Luthe O.',
                rating: 5,
                description: 'Professional and reliable gig!',
              },
              {
                image: 'https://images.pexels.com/photos/18129533/pexels-photo-18129533/free-photo-of-woman-enjoying-the-sun-sitting-by-the-infinity-pool.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                name: 'Mary Ann',
                rating: 5,
                description: 'Will order again, good service here.',
              },
            // Add more testimonials here
          ];
        
    return (
      <Swiper
        spaceBetween={10}
        //slidesPerView={4}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        pagination={{ clickable: true }}
        //navigation={ true }
        breakpoints={{         
          420:{
            slidesPerView:1,
          },
          768: {
            slidesPerView: 2,
          },         
          960:{
            slidesPerView:3
          },
          1200:{
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