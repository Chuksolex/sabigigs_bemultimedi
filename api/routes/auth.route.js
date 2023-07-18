import express from "express";
import {register, login, logout, verifyEmail, requestPasswordReset, resetPassword } from "../controllers/auth.controllers.js";



const authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.post("/logout", logout);
authRoute.patch("/verify-email", verifyEmail);
authRoute.post('/reset-password', requestPasswordReset);
authRoute.patch(`/reset-password/:resetToken`, resetPassword);






export default authRoute;