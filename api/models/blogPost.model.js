// models/BlogPost.js

import mongoose from 'mongoose'

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String },
  coverImage: { type: String },
  date: { type: Date, default: Date.now },
});


export default mongoose.model("BlogPost", blogPostSchema)


