
import express from "express"
import BlogPost from "../models/blogPost.model.js";

// Get all blog posts
export const getAllBlogPosts = async (req, res, next) => {
  try {
    const blogPosts = await BlogPost.find();
    res.json(blogPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a specific blog post by ID
export const getBlogPostById = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    res.json(blogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new blog post
export const createBlogPost = async (req, res) => {
  const { title, content, author, category, coverImage } = req.body;

  try {
    const newBlogPost = new BlogPost({ title, content, author, category, coverImage });
    await newBlogPost.save();
    res.status(201).json(newBlogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a blog post by ID
export const deleteBlogPost = async (req, res, next) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



// Update a blog post by ID
export const updateBlogPost = async (req, res) => {
  const { title, content, author, category, coverImage } = req.body;

  try {
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title, content, author, category, coverImage },
      { new: true }
    );

    if (!updatedBlogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json(updatedBlogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
