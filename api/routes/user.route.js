import express from "express";
import {deleteUser, updateUserToSeller, getUser,} from "../controllers/user.controllers.js";
//import { verifyEmail } from "../controllers/auth.controllers.js";
import { verifyToken } from "../middleware/jwt.js";


const userRoute = express.Router();

userRoute.delete("/:id", verifyToken, deleteUser);
 userRoute.put("/:id", verifyToken, updateUserToSeller) // used this to add gigs.
userRoute.get('/:id', getUser) // can be applied when fetching gig the user created
//userRoute.post("/verify-email", verifyEmail)







export default userRoute;