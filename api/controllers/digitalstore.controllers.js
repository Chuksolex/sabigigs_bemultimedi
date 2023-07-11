import express from "express";
import createError from "../utils/createError.js";
import Digitalstore from "../models/digitalstore.model.js"


export const createDigitalstore = async (req,res,next) => {
    if (!req.isSeller)
    return
        next(createError(403, "Only authorized users can create digital products!"));

        const newDigitalstore = new Digitalstore(
            {
                userId: req.userId,
                ...req.body
            }
        );

        try {

            const savedDigitalStore = await newDigitalstore.save() 

            res.status(2001).send.json(savedDigitalStore)
            
        } catch (err) {
            
            next(err)
        }


}

export const deleteDigitalstore = async(req,res,next) => {
    try {
      const digitalstore = await Digitalstore.findById(req.params.id);
      if (digitalstore.userId !== req.userId)
        return next(createError(403, "You can delete only your digitalstore(book)!"));
  
      await Digitalstore.findByIdAndDelete(req.params.id);
      res.status(200).send("Digitalstore has been deleted!");
    } catch (err) {
      next(err);
    }
  };

export const getDigitalstore = async (req,res,next) => {
    try {
        const digitalstore = await Digitalstore.findById(req.params.id);
        (!digitalstore) && (next(createError(404, "Digitalstore(book) not found or deleted!")));
        res.status(200).send(digitalstore);
    } catch (err) {
        next(err)
        
    }
    
}

export const getDigitalstoregallery = async (req,res,next) => {
    

    const q = req.query;
    const filters = {
      ...(q.userId && { userId: q.userId }),
      ...(q.cat && { cat: q.cat }),
      ...((q.min || q.max) && {
        price: {
          ...(q.min && { $gt: q.min }),
          ...(q.max && { $lt: q.max }),
        },
      }),
      ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    };
    
    try {
        const books = await Digitalstore.find(filters).sort({ [q.sort]: -1 });
        res.status(200).send(books);
      } catch (err) {
        next(err);
      }
};