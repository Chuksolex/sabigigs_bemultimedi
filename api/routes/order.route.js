import express from "express";
import {verifyToken} from "../middleware/jwt.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import { intent, getOrder, confirm, getSingleOrder } from "../controllers/order.controllers.js";



const orderRoute = express.Router();

//orderRoute.post("/:gigId", verifyToken, createOrder);
orderRoute.get("/", verifyToken, getOrder);// gets all orders
orderRoute.post('/create-payment-intent', verifyToken, intent);
orderRoute.put("/", verifyToken, confirm);
orderRoute.get("/singleorder/:id", verifyToken, getSingleOrder);


export default orderRoute;






