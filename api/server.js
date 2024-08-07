import express from "express";
import dotenv from "dotenv";
//import session from 'express-session';
//import MongoDBStore from 'connect-mongodb-session';
import mongoose from "mongoose";
//const MongoDBStoreSession = MongoDBStore(session);

import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import messageRoute from "./routes/message.route.js";
import conversationRoute from './routes/conversation.route.js';
import reviewRoute from "./routes/review.route.js";
import orderRoute from "./routes/order.route.js";
import authRoute from "./routes/auth.route.js";
import recommendationRoute from "./routes/recommendation.route.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import digitalstoreRoute from "./routes/digitalstore.route.js";
import bodyParser from "body-parser";
import blogPostRoute from "./routes/blogPost.route.js";
import generateSessionId from "./routes/generateSessionId.route.js";
import trackGigClickRoute from "./routes/trackGigClick.route.js";
import projectRequestRoute from "./routes/projectRequest.route.js";
import supportRequestRoute from "./routes/supportRequest.route.js";
import livetutorRegisterRoute from "./routes/livetutorRegisterRoute.route.js";

//import currencyRoute from "./routes/currency.route.js";




const app = express();
dotenv.config();
mongoose.set('strictQuery', true);

const connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Other MongoDB options as needed
    });
    console.log("Connected to MongoDB");
    return connection;// added this to connect session store
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to handle it at a higher level if needed
  }
};
  // Middleware to enable session

  app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['www.prettygigs.com.ng', 'https://www.prettygigs.com.ng', 'https://prettygigs.vercel.app', 'https://phaxnetgig.onrender.com', 'http://localhost:5173'];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
            console.log(`Blocked by CORS: ${origin}`); // Debugging log

      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

  
  // const store = new MongoDBStoreSession({
  //   uri: process.env.MONGO,
  //   collection: 'sessions', // Optional: Specify the collection name for storing sessions
  // });

  //app.use(cors({origin:"http://localhost:5173", credentials:true} ));


  // app.use(
  //   session({
  //     secret: `dienekm9ekododkd`, // Add a session secret (can be any string)
  //     resave: false,
  //     saveUninitialized: true,
  //     store: store,
  //   })
  // );



  app.use(express.json());
  app.use(cookieParser());
  //bodyParser.json();
  app.use(bodyParser.json());





//Call the connect function to establish the MongoDB connection

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
app.use("/api/generatesessionid", generateSessionId);
app.use("/api/tackgigclick", trackGigClickRoute);
app.use("/api/projectRequest", projectRequestRoute);
app.use("/api/supportRequest", supportRequestRoute);
app.use("/api/livetutor-register", livetutorRegisterRoute);

// app.use("/api/currency", currencyRoute);






app.use((err,req,res,next) =>{
const errorStatus = err.status || 500;
const errorMessage = err.message || "Something went wrong!";

return res.status(errorStatus).send(errorMessage);
})



app.listen(8800, () => {
connect();
console.log('server is running on port 8800')
})






