import express from "express";
import {
    getConversations, createConversation, getSingleConversation,
     updateConversation} from "../controllers/conversation.controllers.js";
import {verifyToken} from "../middleware/jwt.js";


const conversationRoute = express.Router();

conversationRoute.get("/", verifyToken, getConversations );
conversationRoute.post("/", verifyToken, createConversation );
conversationRoute.get("/single/:id", verifyToken, getSingleConversation );
conversationRoute.put("/", verifyToken, updateConversation );



export default conversationRoute;