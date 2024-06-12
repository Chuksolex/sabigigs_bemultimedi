import express from "express";
import createError from "../utils/createError.js";
import Gig from "../models/gig.model.js";
import Order from "../models/order.model.js";
import { nanoid } from 'nanoid';
import axios from "axios";
import dotenv from "dotenv";
import Flutterwave from "flutterwave-node-v3";
import sendOrderConfirmMail from "../utils/sendOrderConfirmMail.js";
import User from "../models/user.model.js";






export const intent = async (req, res, next) =>{
 const generateTransactionRef = () => {
  const transactionRef = nanoid(); // Generate a unique nanoid
  return transactionRef;
};
const transactionRef = generateTransactionRef();


 try {
    const { cartItems, totalQuantity, overallTotalPrice, currentUser } = req.body;
    console.log("req.body at intent:",  req.body);
    const selectedCurrency = req.body.selectedCurrency || 'USD';
    const sellerId = "6492dd33b70f233a6b0425ff";
    const seller = await User.findById(sellerId);

    const tx_ref = generateTransactionRef();
    const gigsInOrder = [];


    for (const cartItem of cartItems) {
      const { 
        id,
        gigTitle,
        gigPackage,
        currencyCode,
        cover,
        shortDesc,        
        baseAmount,
        orderDetails,
        sellerEmail,
        buyerEmail,
        sellerPhone,
        buyerPhone, 
        selectedAddonIndices,
        selectedAddons,
        quantity,
        totalAddonsPrice,
        totalPrice } = cartItem;
    
      // Fetch gig data using id
      const gig = await Gig.findById(id);
    
      if (!gig) {
        console.error(`Gig not found for id: ${id}`);
        continue; // Skip this iteration if gig is not found
      }
    
      gigsInOrder.push({
        gigId: id,
        title: gigTitle,
        price: baseAmount,
        quantity: quantity,
        img: cover,
        orderDetails: orderDetails,
        addons: [{title: selectedAddons?.title, price: selectedAddons?.price}], 
      })
      // Rest of your code...
    }

  

   const response = await axios.post(
    "https://api.flutterwave.com/v3/payments",
    {
      tx_ref: tx_ref,
      amount: overallTotalPrice,
      currency: selectedCurrency, // Set the appropriate currency code
      redirect_url: 'https://phaxnetgig.onrender.com/success', // Redirect URL after payment completion
      customer: {
      email: currentUser.email, // Set the customer email dynamically
      phonenumber: currentUser.phone,
        // Add more customer details as needed
      },
      // Add additional payment parameters as required by Flutterwave API
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
      },
    }
  );

  const orders = [];
  
  const newOrder = new Order({
    sellerId,
    tx_ref: tx_ref,
    currency: selectedCurrency,
    totalQuantity: totalQuantity,
    overallTotalPrice: overallTotalPrice,
    buyerId: currentUser._id,     
    gigs: gigsInOrder,
  });

  await newOrder.save();
  res.json(response.data);  

       
      } catch (error) {
        console.log(error);
        next(error)
       // res.status(500).json({ error: 'Failed to create payment intent' });
       
        
      }   
    

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
          tx_ref: req.body.tx_ref,
        },
        {
          $set: {
            isCompleted: true,
          },
        }
      );

      const buyer = await User.findById(orders.buyerId);
      const seller = await User.findById(orders.sellerId);
     await sendOrderConfirmMail(orders, buyer, seller);
  
      res.status(200).send("Order has been confirmed.");
    } catch (err) {
      next(err);
      console.log(err);
    }
  };


  // Function to fetch a single gig and convert the prices to the selected currency
export const getSingleOrder = async (req, res, next) => {
  try {
    const singleOrder = await Order.findById(req.params.id);
    if (!singleOrder) {
      return next(createError(404, "That particular order not found or deleted!"));
    }

    // Send the response data to the client
    res.status(200).json(singleOrder);

    
  } catch (err) {
    next(err);
  }
};
