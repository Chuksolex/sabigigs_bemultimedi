import express from "express";
import createError from "../utils/createError.js";
import Gig from "../models/gig.model.js";
import Order from "../models/order.model.js";





export const createOrder = async (req,res,next) =>{  

    try {  
     // const { price, buyerId, sellerId } = req.body; 

    const gig = await Gig.findById(req.params.gigId);

    if (!gig) {
      throw createError(404, "Gig not found.");
    }

    //const price = 200;

    const newOrder = new Order({
      gigId: gig._id,   
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price_basic,
      payment_intent: "temporary",
    });

    await newOrder.save();

    res.status(200).send("Order created successfully." );
  } catch (error) {
    next(error);
  }
}

//Geting orders: below

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
 
  
  
  
  


