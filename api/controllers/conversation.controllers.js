import express from "express";
import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js";
import sendNotificationEmail from "../utils/sendNotificationEmail.js";
import User from "../models/user.model.js";



export const createConversation = async (req, res, next) => {
   
  
    try {
      const conversationExists = await Conversation.findOne({
        $or: [
          { sellerId: req.userId, buyerId: req.body.to },
          { sellerId: req.body.to, buyerId: req.userId },
        ],
      });
  
      if (conversationExists) {
        // Conversation already exists, return the existing conversation
        return res.status(200).send(conversationExists);
      }
  
       // Create a new conversation
      const newConversation = new Conversation({
        id: req.isSeller ? (req.userId + req.body.to) : (req.body.to + req.userId),
        sellerId: req.isSeller ? req.userId : req.body.to,
        buyerId: req.isSeller ? req.body.to : req.userId,
        readBySeller: req.isSeller,
        readByBuyer: !req.isSeller,
      });


      const savedConversation = await newConversation.save();

      
       // Send notification email
       const reciever= await User.findById(req.body.to);
      
       const sender= await User.findById(req.userId);
     



      
    const recipientEmail = reciever.email;

    const subject = 'New Message';
    const message = `You have received a new message from ${sender.username}..`;
    await sendNotificationEmail(recipientEmail, subject, message);
      res.status(201).send(savedConversation);


    } catch (err) {
      next(err);
      console.log(err);
    }
  };
  
  export const updateConversation = async (req, res, next) => {
    try {
      const updatedConversation = await Conversation.findOneAndUpdate(
        { id: req.params.id },
        {
          $set: {
            
            ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
          },
        },
        { new: true }
      );
  
      res.status(200).send(updatedConversation);
    } catch (err) {
      next(err);
    }
  };
  
  export const getSingleConversation = async (req, res, next) => {
    try {
      const conversation = await Conversation.findOne({ id: req.params.id });
      if (!conversation) return next(createError(404, "Not found!"));
      res.status(200).send(conversation);
    } catch (err) {
      next(err);
    }
  };
  
  export const getConversations = async (req, res, next) => {
    try {
      const conversations = await Conversation.find(
        req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
      ).sort({ updatedAt: -1 });
      res.status(200).send(conversations);
    } catch (err) {
      next(err);
    }
  };