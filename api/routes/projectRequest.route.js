import express from "express";
import {createProjectRequest } from "../controllers/projectRequest.controllers.js";



const projectRequestRoute = express.Router();

projectRequestRoute.post("/projectRequest", createProjectRequest};

export default projectRequestRoute;
