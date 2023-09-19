import express from "express";
import {trackGigClick} from "../controllers/trackGigClick.controllers.js";

//this controller is purely for  storing users interaction(gigclcks) and attaching their sessionId; F
//We will use this in getGigrecommendation controller 

const trackGigClickRoute = express.Router();

trackGigClickRoute.post('/trackGigClick', trackGigClick);






export default trackGigClickRoute;