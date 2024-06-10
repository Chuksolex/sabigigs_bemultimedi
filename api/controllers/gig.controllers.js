import express from "express";
import createError from "../utils/createError.js";
import Gig from "../models/gig.model.js";
import { verifyToken } from "../middleware/jwt.js";
import Order from "../models/order.model.js";
import {convertCurrency, exchangeRates} from "./currency.controllers.js"; //removed getExchangeRates //import manually generated exchangeRates
import axios from "axios";
import fx from "money";

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
    res.status(201).json({ message: "Gig created successfully!" });
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
// ...

// Function to fetch a single gig and convert the prices to the selected currency
export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      return next(createError(404, "Gig not found or deleted!"));
    }

    // Fetch the user's selected currency from their session
    //const selectedCurrency = req.session.selectedCurrency ||  'USD';
    const selectedCurrency = req.params.selectedCurrency || 'USD';

    // Convert gig prices to the selected currency using your currency conversion function or library
    const convertedPrice_basic = convertCurrency(gig.price_basic, 'USD', selectedCurrency).toFixed(2);
    const convertedPrice_standard = convertCurrency(gig.price_standard, 'USD', selectedCurrency).toFixed(2);
    const convertedPrice_premium = convertCurrency(gig.price_premium, 'USD', selectedCurrency).toFixed(2);

    // Create a new gig object with converted prices
    const gigWithConvertedPrices = {
      ...gig.toObject(),
      price_basic: convertedPrice_basic,
      price_standard: convertedPrice_standard,
      price_premium: convertedPrice_premium,
    };

    const responseData = {
      currencyCode: selectedCurrency,
      gig: gigWithConvertedPrices,
    };

    // Send the response data to the client
    res.status(200).json(responseData);

    
  } catch (err) {
    next(err);
  }
};

// ...


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

            // Fetch the user's selected currency from their session

            //const selectedCurrency = req.session.selectedCurrency || 'USD';
          const selectedCurrency = q.currency || 'USD';
            console.log("selected currency at backend", selectedCurrency);
            // Call the getExchangeRates function to fetch the exchange rates
           // const exchangeRates = await getExchangeRates();
         

            if (exchangeRates) {
              // Set the obtained exchange rates in the money.js library
              fx.base = exchangeRates.base;
              fx.rates = exchangeRates.rates;

              // Convert gig prices to the selected currency using your currency conversion function or library
              const convertedGigs = gigs.map((gig) => {
                const convertedPrice_basic = convertCurrency(gig.price_basic, 'USD', selectedCurrency).toFixed(2);
                const convertedPrice_standard = convertCurrency(gig.price_standard, 'USD', selectedCurrency).toFixed(2);
                const convertedPrice_premium = convertCurrency(gig.price_premium, 'USD', selectedCurrency).toFixed(2);

                return {
                  ...gig.toObject(),
                    price_basic: convertedPrice_basic,
                    price_standard: convertedPrice_standard,
                    price_premium: convertedPrice_premium,
                };
              });
              
              const responseData = {
                currencyCode: selectedCurrency,
                gigs: convertedGigs,
              };
          
              // Send the response data to the client
              res.status(200).json(responseData);
            } else {
              // If exchange rates couldn't be fetched, send the original gigs
              res.status(200).send(gigs);
            }
          } catch (err) {
            next(err);
            console.log(err)
          }
    };

  

    // Function to update multiple properties of a gig
    export const updateGig = async (req, res) => {
      const gigId = req.params.id;
      console.log("gigId from req.params", gigId);
      const updatedProperties = req.body;
      console.log("updated data", req.body);

      try {
        const gig = await Gig.findByIdAndUpdate(gigId, updatedProperties, { new: true });
        res.status(200).json(gig);
      } catch (error) {
        res.status(500).json({ message: 'Failed to update the gig.' });
      }
    };



    export const configureDiscount = async (req, res, next) => {
      // Extract discount configuration data from the request body
      try{
      const { discountType, startDate, validThrough } = req.body;
      
      console.log("configure discount:", req.body);
    

    // Update all gigs in the database with the new discount configuration
    // This might involve iterating through all gigs and updating their fields
    // based on the provided configuration.

    // Example pseudocode:
    const allGigs = await Gig.find(); // Assuming you have a Gig model

    for (const gig of allGigs) {
      gig.discountType = discountType;
      gig.discountStartDate = startDate;
      gig.discountValidThrough = validThrough;
      // Update other discount-related fields as needed
      await gig.save(); // Save the updated gig
    }

    // Send a success response
    res.status(200).json({ message: 'Discounts updated successfully' });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

    
    
    





   
