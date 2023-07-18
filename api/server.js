import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import messageRoute from "./routes/message.route.js";
import conversationRoute from './routes/conversation.route.js';
import reviewRoute from "./routes/review.route.js";
import orderRoute from "./routes/order.route.js";
import authRoute from "./routes/auth.route.js";
import recommendationRoute from "./routes/recommendation.route.js"

import cookieParser from "cookie-parser";
import cors from "cors";
import digitalstoreRoute from "./routes/digitalstore.route.js";
import bodyParser from "body-parser";
import blogPostRoute from "./routes/blogPost.route.js";


const app = express();
dotenv.config();
mongoose.set('strictQuery', true);




const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to Mongodb");
  } catch (error) {
    console.log(error);
  }

};

app.use(cors({origin:"http://localhost:5173", credentials:true} ));
app.use(express.json());
app.use(cookieParser());
bodyParser.json()



//Here we use the user.route.js we created in routes folder
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/orders", orderRoute);
app.use("/api/digitalstoregallery", digitalstoreRoute);
app.use("/api/recommendations", recommendationRoute);
app.use("/api/blog", blogPostRoute);




app.use((err,req,res,next) =>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
})



app.listen(8800, () => {
  connect();
    console.log('server is running on port 8800')
})






