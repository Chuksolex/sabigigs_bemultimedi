import express from "express";
import {verifyToken} from "../middleware/jwt.js"
import {createDigitalstore,
    deleteDigitalstore,
    getDigitalstore,
    getDigitalstoregallery} from "../controllers/digitalstore.controllers.js";


const digitalstoreRoute = express.Router();

digitalstoreRoute.post("/digitalstore", verifyToken, createDigitalstore); // creating a single book or video
digitalstoreRoute.get("/digitalstore/:id", verifyToken, getDigitalstore);
digitalstoreRoute.get("/digitalstoregallery", verifyToken, getDigitalstoregallery); // fetching the digital store home page



export default digitalstoreRoute;