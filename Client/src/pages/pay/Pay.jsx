// import React from "react";
// import "./Pay.scss";

// const Pay = ()=>{
//     return (
//         <h1>Pay</h1>
//     )
// }

// export default Pay

import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import newRequest from '../../utils/newRequest';
import queryString from 'query-string';

const Pay = () => {
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  
  const {
    gigId,
    amount,
    title,
    img,
    buyerId,
    sellerId,
    orderDetails
  } = queryString.parse(location.search);

  // Parse the orderDetails as an array if necessary
  const parsedOrderDetails = Array.isArray(orderDetails)
    ? orderDetails
    : JSON.parse(decodeURIComponent(orderDetails));

  const [clientSecret, setClientSecret] = useState('');
  const [tx_ref, setTx_ref] = useState('');

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await newRequest.post(`/orders/create-payment-intent/${gigId}`, {
          // Pass any required parameters to the backend API
          gigId, amount, title, img, sellerId, buyerId, orderDetails, email:currentUser.email
        });
        const { clientSecret, tx_ref, email} = response.data
        setClientSecret(clientSecret);
      } catch (error) {
        console.log(error);
        // Handle error scenario
      }
    };

    createPaymentIntent();
  }, []);

  useEffect(() => {
    if (clientSecret !== '') {
      const flutterwaveScript = document.createElement('script');
      flutterwaveScript.src = 'https://checkout.flutterwave.com/v3.js';
      flutterwaveScript.async = true;
      flutterwaveScript.onload = () => {
        const flutterwave = new FlutterwaveCheckout({
          public_key: 'FLWPUBK_TEST-514f0e5cfdf34da20feb17aa69dbe7c6-X', // Replace with your Flutterwave public key
          tx_ref:tx_ref, // Replace with a unique transaction reference
          amount: amount, // Replace with the actual payment amount
          currency: 'USD', // Replace with the appropriate currency code
          redirect_url: 'https://localhost:5173/success', // Replace with your success page URL
          customer: {
            email: currentUser.email, // Replace with the customer's email address
            // Add more customer details as needed
          },
          callback: (response) => {
            // Handle the payment response
            console.log(response);
            if (response.status === 'successful') {
              // Payment was successful, update order status
              Navigate
            } else {
              // Payment was not successful, handle accordingly
            }
          },
          customizations: {
            title: 'Payment Page',
            description: 'Complete your payment',
            logo: 'https://your-website.com/logo.png', // Replace with your logo URL
          },
        });

        flutterwave.open();
      };

      document.body.appendChild(flutterwaveScript);
    }
  }, [clientSecret]);


 

  return (
    <div className='pay'>
      {/* Render any necessary UI elements for the payment page */}
    </div>
  );
};

export default Pay;
