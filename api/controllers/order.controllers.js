import express from "express";
import createError from "../utils/createError.js";
import Gig from "../models/gig.model.js";
import Order from "../models/order.model.js";
import { nanoid } from 'nanoid';
import axios from "axios";
import dotenv from "dotenv";
//import Flutterwave from "flutterwave-node-v3";




export const intent = async (req, res, next) =>{
 //const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY_TEST, process.env.FLW_SECRET_KEY_TEST);
 const generateTransactionRef = () => {
  const transactionRef = nanoid(); // Generate a unique nanoid
  return transactionRef;
};
const transactionRef = generateTransactionRef();

 try {
  //const { gigId } = req.params;
  const {gigId, amount, title, img, sellerId, buyerId, orderDetails } = req.body;
 
  const transactionRef = generateTransactionRef();
  //Process the parameters and create the payment intent
  // ...
  const response = await axios.post('https://api.flutterwave.com/v3/payments', {
    headers: {
      Authorization: `Bearer ${flw}`,
    }, 
    json:{
    tx_ref: transactionRef,
    amount: amount,
    currency: 'USD', // Set the appropriate currency code
    redirect_url: 'http://localhost:5173/success', // Redirect URL after payment completion
    customer: {
      email: email, // Set the customer email dynamically
      phonenumber: req.phone,
      // Add more customer details as needed
    },
  }
       // Add additional payment parameters as required by Flutterwave API
      });

  const newOrder = new Order({
    gigId: gigId,
    img: img,
    title: title,
    buyerId: req.userId,
    sellerId: buyerId,
    price: amount,
    payment_intent: response.data.id,
  });

  await newOrder.save();


//   const payload = {
  
//   currency: 'USD',
//   payment_type: 'card',
//   tx_ref: transactionRef,
//   amount: amount,
//   currency: 'USD', // Set the appropriate currency code
//   redirect_url: 'http://localhost:5173/success', // Redirect URL after payment completion
//   customer: {
//     email: email, // Set the customer email dynamically
//     phonenumber: req.phone,
// }
//}   

// flw.Transaction.initiate(payload, (error, response) => {
//   if (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to initiate payment' });
//   } else {
//     // Process response and send the necessary data back to the client
//     res.status(200).json({
//       clientSecret: response.data.client_secret,
//       tx_ref,
//       amount: response.data.amount,
//       paymentLinK: response.data.link,
//       email
//     });
//   }
  
// });

   
  

        // Return the payment intent data to the client
       
       
      } catch (error) {
        // Handle any errors that occur during the process
        console.log(error);
        res.status(500).json({ error: 'Failed to create payment intent' });
      }
    
      console.log(email, transactionRef);

}



export const getOrder = async (req, res, next) => {
    try {
      const orders = await Order.find({
        ...(req.isSeller) ? { sellerId: req.userId } : { buyerId: req.userId },
        isCompleted: true
      });
  
      res.status(200).json(orders); // Send the orders in the response
  
    } catch (err) {
      next(err);
    }
  };

  export const confirm = async (req, res, next) => {
    try {
      const orders = await Order.findOneAndUpdate(
        {
          payment_intent: req.body.payment_intent,
        },
        {
          $set: {
            isCompleted: true,
          },
        }
      );
  
      res.status(200).send("Order has been confirmed.");
    } catch (err) {
      next(err);
    }
  };
 
  
  
  
  


