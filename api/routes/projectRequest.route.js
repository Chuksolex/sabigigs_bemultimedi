import express from "express";
import {createProjectRequest } from "../controllers/projectRequest.controllers.js";



const projectRequestRoute = express.Router();

projectRequestRoute.post("/", createProjectRequest};

export default projectRequestRoute;
