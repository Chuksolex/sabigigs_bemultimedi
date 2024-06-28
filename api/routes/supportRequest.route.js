import express from "express";
import createSupportRequest from "../controllers/supportRequest.controllers.js";



const supportRequestRoute = express.Router();

supportRequestRoute.post("/", createSupportRequest);







export default supportRequestRoute;
