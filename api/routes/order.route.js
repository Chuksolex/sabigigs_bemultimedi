import express from "express";
import {createOrder, getOrder} from "../controllers/order.controllers.js";
import {verifyToken} from "../middleware/jwt.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";



const orderRoute = express.Router();

orderRoute.post("/:gigId", verifyToken, createOrder);
orderRoute.get("/", verifyToken, getOrder);


export default orderRoute;






