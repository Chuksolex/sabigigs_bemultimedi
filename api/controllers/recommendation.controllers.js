// controllers/recommendationController.js

import Recommendation from "../models/recommendation.model.js";
import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

// Generate recommendations based on user browsing history// Generate recommendations based on user browsing history
export const generateRecommendations = async (req, res) => {
    try {
      const { gigIds } = req.query;
  
      // Split the gigIds string into an array of gigId values
      const gigIdArray = gigIds.split(',');
  
      // Fetch recommendations based on gigIds
      const recommendations = await Recommendation.find({ gigId: { $in: gigIdArray } })
        .populate('gigId')
        .sort({ score: -1 })
        .limit(12);
  
      res.json(recommendations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate recommendations' });
    }
  };



// Create recommendations for all gigs
export const createRecommendations = async (req, res) => {
  try {
    // Fetch all gigs from the database
    const gigs = await Gig.find();

    // Generate recommendations based on gigs
    const recommendations = gigs.map((gig) => ({
      gigId: gig._id,
      score: Math.random() * 10, // You can modify the scoring algorithm based on your requirements
    }));

    // Delete existing recommendations
    await Recommendation.deleteMany();

    // Create new recommendations
    await Recommendation.create(recommendations);

    res.json({ message: 'Recommendations created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create recommendations' });
  }
};
