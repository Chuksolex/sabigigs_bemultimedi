import express from 'express';
import { nanoid } from 'nanoid';


// Endpoint to generate a session ID
 export const generateSessionId = (req, res, next) => {
  const sessionID = nanoid(); // This will generate a unique 21-character session ID
  res.send({ sessionID });
};
// Your other routes and server configurations...
