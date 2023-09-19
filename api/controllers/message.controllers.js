import express from "express";
import createError from "../utils/createError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import sendNotificationEmail from "../utils/sendNotificationEmail.js";
import User from "../models/user.model.js";





export const createMessage = async (req, res, next) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });

  try {
    const savedMessage = await newMessage.save();

    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );

    const conversation = await Conversation.findOne({id: req.body.conversationId});
    const receiverId =
      (conversation.sellerId === req.userId) ? conversation.buyerId  : conversation.sellerId;

    const receiver = await User.findById(receiverId);
    const sender = await User.findById(req.userId);
    const recipientEmail = receiver.email;

    const subject = 'New Chat';
    const message = `A new message has been sent by ${sender.username}. To check the message: <a href='${process.env.CLIENTLINK}/login'>Click here to login</a>`;

    // Ensure that your sendNotificationEmail function logs errors properly
    await sendNotificationEmail(recipientEmail, subject, message);

    res.status(201).send(savedMessage);
  } catch (err) {
    // Log the error and pass it to the next middleware for proper handling
    console.error('Error sending notification email:', err);
    next(err);
  }
};



  export const getMessages = async (req, res, next) => {
    try {
      const messages = await Message.find({ conversationId: req.params.id });
      res.status(200).send(messages);
    } catch (err) {
      next(err);
    }
  };