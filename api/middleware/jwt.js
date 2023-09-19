// import createError from "../utils/createError.js";
// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) =>{

//     const token = req.cookies.accessToken;

//     if (!token) return next(createError(401, "You are not authenticated"))

//     jwt.verify(token, process.env.JWT_KEY, async (err, payload) =>{
//         if (err) return next(createError(403, "Invalid token"));
//         req.userId = payload.id;
//         req.isSeller = payload.isSeller;

//         next()

//     })


// }

import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    req.email = payload.email,
    req.phone = payload.phone,
    req.isVerified= payload.isVerified,
    req.username=payload.username

    // Check if email is verified
    //const user = await User.findById(payload.id);
    if (!req.isVerified=== true) {
      return next(createError(403, "Email not verified"));
    }

    next();
  } catch (err) {
    next(createError(403, "Invalid token"));
  }
};
