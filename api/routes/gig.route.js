import express from "express";
import {configureDiscount, createGig, deleteGig, getGig, getGigs, updateGig} from "../controllers/gig.controllers.js";
import {verifyToken} from "../middleware/jwt.js";


const gigRoute = express.Router();

gigRoute.post("/", verifyToken, createGig);
gigRoute.delete("/deletegig/:id", verifyToken, deleteGig)
gigRoute.get("/singlegig/:id", getGig);
gigRoute.get("/", getGigs);
gigRoute.put("/updategig/:id", verifyToken, updateGig); // Add the updateGig route
gigRoute.post("/configure-discounts", verifyToken, configureDiscount);



export default gigRoute;