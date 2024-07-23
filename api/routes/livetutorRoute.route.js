import express from "express";
import livetutorRegisterController from "../controllers/livetutorRegister.controllers.js";



const livetutorRegisterRoute = express.Router();

authRoute.post("/", livetutorRegisterController);

export default livetutorRegisterRoute;
