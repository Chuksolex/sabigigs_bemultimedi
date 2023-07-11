import express from "express";
import {createGig, deleteGig, getGig, getGigs, updateGig} from "../controllers/gig.controllers.js";
import {verifyToken} from "../middleware/jwt.js";


const gigRoute = express.Router();

gigRoute.post("/", verifyToken, createGig);
gigRoute.delete("/:id", verifyToken, deleteGig)
gigRoute.get("/singlegig/:id", getGig);
gigRoute.get("/", getGigs);
gigRoute.put("/:id", verifyToken, updateGig); // Add the updateGig route




export default gigRoute;