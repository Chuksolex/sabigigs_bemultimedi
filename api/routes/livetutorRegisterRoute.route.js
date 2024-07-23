import express from "express";
import livetutorRegisterController from "../controllers/livetutorRegister.controller.js";



const livetutorRegisterRoute = express.Router();

livetutorRegisterRoute.post("/", livetutorRegisterController);

export default livetutorRegisterRoute;
