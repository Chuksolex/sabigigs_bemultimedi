import express from "express";
import {generateSessionId} from "../controllers/generateSessionId.controllers.js";



const generateSessionIdRoute = express.Router();

generateSessionIdRoute.get('/', generateSessionId);







export default generateSessionIdRoute;