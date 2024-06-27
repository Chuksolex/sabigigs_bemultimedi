// projectRequest.route.js

import express from "express";
import { createProjectRequest } from "../controllers/projectRequest.controllers.js";

const projectRequestRoute = express.Router();

// Define route for creating a new project request
projectRequestRoute.post("/", createProjectRequest);

export default projectRequestRoute;
