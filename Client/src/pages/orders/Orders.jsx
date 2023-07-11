

import React from 'react';
import "./Orders.scss";
import {useQuery} from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import {Link} from "react-router-dom";



const Orders = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data, } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      newRequest.get(
        `/orders`
        )
      .then(
        (res) => {
        return res.data;
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
        <th>Image</th>
        <th>Title</th>
        <th>Price</th>
        <th>Contact</th>

      </tr>
      {data.map((order) => (
        <tr key={order._id}>
        <td>    <img className='img' src={order.img} alt="" /> </td>
        <td>{order.title}</td>
        <td>{order.price}</td>
      
        <td> <img className='delete' src="/img/message.png" alt="" />   </td>

      </tr>

      ))}
      
    </table>
  </div>)}
 </div>
  )
}

export default Orders