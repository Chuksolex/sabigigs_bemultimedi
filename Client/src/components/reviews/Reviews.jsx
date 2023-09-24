import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import "./Reviews.scss";
import Review from "../review/Review";

const Reviews = ({gigId}) => {
//this one is fetching reviews

  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;   

      }),
  });


//This one is updating or creating review
  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review)
    },
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
    }
  })
//try this for Seller component
  const handleSubmit = e =>{
    e.preventDefault();
    const desc = e.target[0].value;
    const star =e.target[1].value;
    mutation.mutate({gigId, desc, star});

  }
  
  return (
    <div className="reviews">
    
        {isLoading? ("Loading.."
                 ) : error ? ("Error loading reviews"
                  ) : (
                       data.map((review) => <Review key={review._id} review={review} />)
            )}
           <hr />
        <div className='add'>
        
        <h3>Add a review.</h3>
        <form action="" className='addForm' onSubmit={handleSubmit}>
          <input type="text" placeholder="How do you rate this gig?"/>
          <div className='selectandbutton'>
            
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button type='submit'>Send</button>

          </div>
        </form>
        </div>
      <hr />
    </div> 

  )
}

export default Reviews
