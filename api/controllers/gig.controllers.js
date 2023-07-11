import express from "express";
import createError from "../utils/createError.js";
import Gig from "../models/gig.model.js";
import { verifyToken } from "../middleware/jwt.js";
import Order from "../models/order.model.js";

export const createGig = async (req, res, next) => {
  if (!req.isSeller) {
    return next(createError(403, "Only authorized users can create gigs!"));
  }

  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};

//Let's write code for deletion of gigs here

export const deleteGig = async(req,res,next) => {
    try {
      const gig = await Gig.findById(req.params.id);
      if (gig.userId !== req.userId)
        return next(createError(403, "You can delete only your gig!"));
  
      await Gig.findByIdAndDelete(req.params.id);
      res.status(200).send("Gig has been deleted!");
    } catch (err) {
      next(err);
    }
  };
 
 
  // here we display a single gig page
export const getGig = async (req,res,next) => {
    try {
        const gig = await Gig.findById(req.params.id);
        (!gig) && (next(createError(404, "Gig not found or deleted!")));
        res.status(200).send(gig);
    } catch (err) {
        next(err)
        
    }
    
}


// this will get all gigs. so  we do do not specify to the Gig model a specific id or params
export const getGigs = async (req,res,next) => {
    

        const q = req.query;
        const filters = {
          ...(q.userId && { userId: q.userId }),
          ...(q.cat && { cat: q.cat }),
          ...((q.min || q.max) && {
            price: {
              ...(q.min && { $gt: q.min }),
              ...(q.max && { $lt: q.max })
            }
          }),
          ...(q.search && { title: { $regex: q.search, $options: "i" } }),
        };
        
        try {
            const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
            res.status(200).send(gigs);
          } catch (err) {
            next(err);
          }
    };

  

    // Function to update multiple properties of a gig
    export const updateGig = async (req, res) => {
      const { gigId } = req.params;
      const updatedProperties = req.body;
      try {
        const gig = await Gig.findByIdAndUpdate(gigId, updatedProperties, { new: true });
        res.status(200).json(gig);
      } catch (error) {
        res.status(500).json({ message: 'Failed to update the gig.' });
      }
    };
    
    
    





   