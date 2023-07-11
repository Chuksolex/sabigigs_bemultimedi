import express from "express";
import {createReview, getReviews, deleteReview} from "../controllers/review.controllers.js";
import {verifyToken}  from "../middleware/jwt.js";


const reviewRoute = express.Router();


reviewRoute.post("/", verifyToken, createReview);
reviewRoute.get("/:gigId", getReviews);
reviewRoute.delete("/:id", deleteReview);


export default reviewRoute;