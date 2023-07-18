// routes/blogRoutes.js

import express from 'express';
import {
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  createBlogPost,
  deleteBlogPost,
} from '../controllers/blogPost.controllers.js';

const blogPostRoute = express.Router();

// Get all blog posts
blogPostRoute.get('/', getAllBlogPosts);

// Get a specific blog post by ID
blogPostRoute.get('/:id', getBlogPostById);

// Create a new blog post
blogPostRoute.post('/', createBlogPost);

// Update a blog post by ID
blogPostRoute.put(`/:id`, updateBlogPost);

// Delete a blog post by ID
blogPostRoute.delete(`/:id`, deleteBlogPost);

export default blogPostRoute;
