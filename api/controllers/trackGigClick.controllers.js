import express from 'express';
import Gig from '../models/gig.model.js';

export const trackGigClick = (req, res) => {
  const { sessionID, gigID } = req.body;

  // Save the gig click data to the database
  Gig.findById(gigID)
    .then(gig => {
      if (!gig) {
        return res.status(404).json({ error: 'Gig not found' });
        
      }

      // Add the gig click interaction to the gig's gigClicks array
      gig.gigClicks.push({ sessionID });
      
      // Save the updated gig document
      return gig.save();
    })
    .then(savedGig => {
      // Return a success response or the updated gig (if needed)
      res.status(200).json(savedGig);
    })
    .catch(error => {
      console.error('Error saving gig click data:', error);
      // Return an error response (if needed)
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

