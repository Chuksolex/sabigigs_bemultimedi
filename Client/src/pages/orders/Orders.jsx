

import React, {useState} from 'react';
import "./Orders.scss";
import {useQuery} from "@tanstack/react-query";

import newRequest from "../../utils/newRequest.js";
import {Link} from "react-router-dom";
import OrderCard from '../../components/orderCard/orderCard';



const Orders = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [sortedData, setSortedData] = useState([]);

  const { isLoading, error, data, } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      newRequest.get(
        `/orders`
        )
      .then(
        (res) => {
          const sortedOrders = res.data.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);  
            // Sort in reverse order (latest orders first)
            return dateB - dateA;
          });
  
          // Update the sorted data in state
          setSortedData(sortedOrders);
  
          return sortedOrders;
        })
  });

 
  

  return (
    <div className="orders">
 {isLoading ? ("Loading..") : error?( "Error") :(
 
  <div className="container">
    <div className="title">
      <h1>My Orders</h1>
     
    </div>
    <table>
      <tr>
      {(currentUser.isSeller)? <th>Buyer</th>: <th>Seller</th>}
        <th>Price</th>
        <th className='tx_ref'>Trans. Ref.</th>
        <th>Time</th>
        <th></th>
        <th>Status</th>
        <th>Action</th>


 
      </tr>
      {sortedData.map((order) => (
        <tr key={order._id}>
         <OrderCard singleOrder={order} />
        


      </tr>

      ))}
      
    </table>
  </div>)}
 </div>
  )
}

export default Orders;

