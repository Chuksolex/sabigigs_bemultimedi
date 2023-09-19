// routes/recommendationRoute.js

import express from 'express';
// import { generateRecommendations, createRecommendations } from '../controllers/recommendation.controllers.js';
import { getRecommendedGigsForSessionID } from '../controllers/recommendation.controllers.js';



const recommendationRoute = express.Router();
//these ones are the ones implemented with only local storate: browisng history is what i should have called it
// recommendationRoute.get('/', generateRecommendations);
// recommendationRoute.post('/create', createRecommendations);
//this one below is recommendations stored with sessionId at the gig
recommendationRoute.get(`/`, getRecommendedGigsForSessionID);

export default recommendationRoute;
