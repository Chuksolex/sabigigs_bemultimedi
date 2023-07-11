import express from "express";
import {register, login, logout, verifyEmail } from "../controllers/auth.controllers.js";



const authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.post("/logout", logout);
authRoute.patch("/verify-email", verifyEmail)





export default authRoute;