// routes/recommendationRoute.js

import express from 'express';
import { generateRecommendations, createRecommendations } from '../controllers/recommendation.controllers.js';

const recommendationRoute = express.Router();

recommendationRoute.get('/', generateRecommendations);
recommendationRoute.post('/create', createRecommendations);

export default recommendationRoute;
