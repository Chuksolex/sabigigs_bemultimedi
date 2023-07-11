import express from "express";
import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";

// No.1 createReview Controller: handles backend(sends create review to api) for creating revies
export const createReview = async (req,res,next) =>{
    
        if(req.isSeller) return next(createError(403, "Sellers can't create review!"));

        const newReview = new Review({
            userId: req.userId,
            gigId: req.body.gigId,
            desc: req.body.desc,
            star: req.body.star,
        });
        //immediately below: we will not allow a user create review two times
        try{  
            const review = await Review.findOne({
                gigId: req.body.gigId, 
                userId: req.userId
            });
            
            if(review) return next(createError(403, "You have already created a review!"));

         // Note. After the immediate above, you can also check if the user purchased the gig using Order-Model. How to do that is to import the Order Model, then do Order.findOne, and query parameters will be userId: req.userId with orderId: req.body.orderId, then if(!order) return: he cannot review

         const savedReview = await newReview.save();
        
         await Gig.findByIdAndUpdate(req.body.gigId, {$inc: {totalStars:req.body.star, starNumber:1}});

         res.status(201).send(savedReview);
         
        } catch (err) {
        next(err);   
        }  
    

}

// No.2 getReview Controller: handles backend(sends review to client from api) for getting reviews to be displayed

export const getReviews = async (req,res,next) =>{
    try {
            const reviews = await Review.find({gigId:req.params.gigId});

            res.status(200).send(reviews);

    } catch (err) {
        next(err);
        
    }

}

// No.3 deleteReview Controller: handles backend(delete review by creator) for deleting reviews a user created.
//Note. I didn't require verifyToken in the review route. check that later.

export const deleteReview = (req,res,next) =>{
    try {
        
    } catch (err) {
        next(err);
        
    }

}
