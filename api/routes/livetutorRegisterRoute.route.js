import express from "express";
import livetutorRegisterController from "../controllers/livetutorRegister.controller.js";



const livetutorRegisterRoute = express.Router();

authRoute.post("/", livetutorRegisterController);

export default livetutorRegisterRoute;
