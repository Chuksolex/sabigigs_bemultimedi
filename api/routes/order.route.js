import express from "express";
import {verifyToken} from "../middleware/jwt.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import { intent, getOrder, confirm } from "../controllers/order.controllers.js";



const orderRoute = express.Router();

//orderRoute.post("/:gigId", verifyToken, createOrder);
orderRoute.get("/", verifyToken, getOrder);
orderRoute.post(`/create-payment-intent/:gigId`, verifyToken, intent);
orderRoute.put("/", verifyToken, confirm);

export default orderRoute;






