

import React, { useState, useEffect } from 'react';
import './BlogForm.scss';
import upload from '../../utils/upload.js';
import newRequest from '../../utils/newRequest';
import { useParams, useNavigate } from 'react-router-dom';

const BlogForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [blogPostDetails, setBlogPostDetails] = useState(null);
  const navigate = useNavigate()
//this useeffect fetches the single post in case you are deleting
  useEffect(() => {
    const fetchBlogPostDetails = async () => {
      try {
        const response = await newRequest.get(`/blog/${id}`);
        const blogPostDetails = response.data;

        // Set the initial values of the form inputs using the fetched blog post details
        setBlogPostDetails(blogPostDetails);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchBlogPostDetails();
  }, [id]);
//this one updates the state of the inputs with the blogposts details fetched for editing
  useEffect(() => {
    if (blogPostDetails) {
      setTitle(blogPostDetails.title || '');
      setContent(blogPostDetails.content || '');
      setAuthor(blogPostDetails.author || '');
      setCategory(blogPostDetails.category || '');
      setCoverImage(blogPostDetails.coverImage || '');
    } else {
      setTitle('');
      setContent('');
      setAuthor('');
      setCategory('');
      setCoverImage('');
    }
  }, [blogPostDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedImageUrl = coverImage;
      if (typeof coverImage !== 'string') {
        uploadedImageUrl = await upload(coverImage); // Upload cover image to Cloudinary
      }

      const data = {
        title,
        content,
        author,
        category,
        coverImage: uploadedImageUrl,
      };

      let response;
      if (blogPostDetails) {
        // Update existing blog post
        response = await newRequest.put(`/blog/${id}`, data);
      } else {
        // Create new blog post
        response = await newRequest.post('/blog', data);
      }

      setLoading(false);
      navigate('/blog')
      // onSubmit(response.data);
    } catch (error) {
      console.error(error);
      setError('Failed to save the blog post.');
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setCoverImage('');
  };

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

      <label htmlFor="content">Content:</label>
      <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} />

      <label htmlFor="author">Author:</label>
      <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />

      <label htmlFor="category">Category:</label>
      <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />

      <label htmlFor="coverImage">Cover Image:</label>
      {coverImage ? (
        <div className={`cover-image-preview ${typeof coverImage === 'string' ? 'selected' : ''}`}>
          <img src={coverImage} alt="Cover" />
          <button type="button" onClick={handleRemoveImage}>
            Remove
          </button>
        </div>
      ) : (
        <div className="file-input-wrapper">
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
          <button className="file-input-button" type="button">
            Select Image
          </button>
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
      {error && <div className="error-message">{error}</div>}
    </form>
    
  );
};

export default BlogForm;








