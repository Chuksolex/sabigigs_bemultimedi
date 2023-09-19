// controllers/recommendationController.js

//import Recommendation from "../models/recommendation.model.js";
import express from "express";
import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

// // Generate recommendations based on user browsing history// Generate recommendations based on user browsing history
// export const generateRecommendations = async (req, res) => {
//     try {
//       const { gigIds } = req.query;
  
//       // Split the gigIds string into an array of gigId values
//       const gigIdArray = gigIds.split(',');
  
//       // Fetch recommendations based on gigIds
//       const recommendations = await Recommendation.find({ gigId: { $in: gigIdArray } })
//         .populate('gigId')
//         .sort({ score: -1 })
//         .limit(12);
  
//       res.json(recommendations);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to generate recommendations' });
//     }
//   };



// // Create recommendations for all gigs
// export const createRecommendations = async (req, res) => {
//   try {
//     // Fetch all gigs from the database
//     const gigs = await Gig.find();

//     // Generate recommendations based on gigs
//     const recommendations = gigs.map((gig) => ({
//       gigId: gig._id,
//       score: Math.random() * 10, // You can modify the scoring algorithm based on your requirements
//     }));

//     // Delete existing recommendations
//     await Recommendation.deleteMany();

//     // Create new recommendations
//     await Recommendation.create(recommendations);

//     res.json({ message: 'Recommendations created successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create recommendations' });
//   }
// };




export const getRecommendedGigsForSessionID = async (req, res, next) => {
  const {sessionID} = req.query
  try {
    // Step 1: Retrieve Gig Clicks for a SessionID
    const gigClicks = await Gig.find({ 'gigClicks.sessionID': sessionID }).select('gigClicks');

    // Step 2: Collect GigIDs for the SessionID
    const gigIDsForSessionID = gigClicks.map(gig => gig._id.toString());

    // Step 3: Recommend Similar Gigs
    // Find gigs clicked by users with similar sessionIDs (excluding the provided sessionID)
    const similarGigs = await Gig.find({
      _id: { $in: gigIDsForSessionID },
      'gigClicks.sessionID': { $ne: sessionID },
    }).limit(12); // Limit the recommendations to 5 gigs for example purposes

    // Step 4: Sort and Present Recommendations
    // You can further sort the similarGigs based on certain criteria (e.g., clicks, stars, etc.)
    
    // Sort by the number of clicks in descending order
    //similarGigs.sort((gigA, gigB) => gigB.gigClicks.length - gigA.gigClicks.length);

    // Sort by the total number of stars in descending order
    similarGigs.sort((gigA, gigB) => gigB.totalStars - gigA.totalStars);

    return similarGigs;
  } catch (error) {
    console.error('Error getting recommended gigs:', error);
    throw new Error('Failed to get recommended gigs');
  }
};



