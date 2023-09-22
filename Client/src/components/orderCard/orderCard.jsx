import React from 'react';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';
import "./orderCard.scss";

const OrderCard = ({ singleOrder }) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let data = null; // Define data variable outside the conditionals
    const navigate = useNavigate();

    if (currentUser.isSeller === true){
        const { isLoading, error, data: userData} = useQuery({
            queryKey: [singleOrder.buyerId],
            queryFn: () =>
              newRequest.get(`/users/${singleOrder.buyerId}`)
              .then(
                (res) => {
                return res.data;
              })
            
          })
          data = userData; // Assign value inside the if block

    } else if (currentUser.isSeller === false){
        const { isLoading, error, data: userData} = useQuery({
            queryKey: [singleOrder.sellerId],
            queryFn: () =>
              newRequest.get(`/users/${singleOrder.sellerId}`)
              .then(
                (res) => {
                return res.data;
              })
            
          })
          data = userData; // Assign value inside the if block

    };

    function formatDate(createdAt) {
        const options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        };
      
        const date = new Date(createdAt);
        const formattedDate = date.toLocaleDateString(undefined, options);
        const formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
      
        return `${formattedDate}, ${formattedTime}`;
      };

      const handleViewDetails = (orderId) => {
        
        console.log("View Details clicked for order ID:", orderId);
      
        navigate(`/singleorder/${orderId}`);
      };

    //   if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }

    // if (userData) {
    //     data = userData;
    // }
      

  return (
     
        
        <>
       
                <td> <img src={data?.img} className='td-image'  />{data?.username}</td>
         
       
            <td>{singleOrder.currency +" "+ singleOrder.overallTotalPrice}</td>
            <td className='tx_ref'>{singleOrder.tx_ref}</td>
            <td>{formatDate(singleOrder.createdAt)}</td>
            <td></td>

            <td> delivered</td>
            <td>
              <button
                onClick={() => handleViewDetails(singleOrder._id)}
                className="view-details"
              >
                View
              </button>
            </td>
            </>
  
  );
};

export default OrderCard;
