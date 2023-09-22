// BlogPostDetails.js

import React, {useState, useEffect} from 'react';
import './BlogPostDetails.scss';
import newRequest from '../../utils/newRequest';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sideBar/sideBar';


const BlogPostDetails = ({recommendedServices}) => {
    const { id } = useParams();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [blogPost, setBlogPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogPost = async () => {
          try {
            const response = await newRequest.get(`/blog/${id}`);
            setBlogPost(response.data);
            setLoading(false);
          } catch (error) {
            console.error(error);
            setError('Failed to fetch blog post.');
            setLoading(false);
          }
        };
    
        fetchBlogPost();
      }, [id]);
    
      if (loading) {
        return <div className="blog-post-details">Loading...</div>;
      }
    
      if (error) {
        return <div className="blog-post-details">Error: {error}</div>;
      }

      const handleEdit = () => {
        
          navigate(`/edit-blog/${blogPost._id}`);
        
        }
      
      
      const handleDelete = async () => {
        try {
          // Make an API request to delete the item
          await newRequest.delete(`/blog/${id}`);
      
          // Handle successful deletion, such as showing a success message or updating the UI
          // For example:
          // showDeleteSuccessMessage();
          // updateItemInList(id);
          navigate("/blog")
        } catch (error) {
            console.error('Error deleting blog post:', error);
            // Handle error
            setError(error.message); // Use error.message instead of the entire error object
          }
      };
      
  
  return (
    <div className="blog-post-details">
        <div className='main-content'>
      <h2 className="blog-post-details__title">{blogPost.title}</h2>
      <p className="blog-post-details__author">Author: {blogPost.author}</p>
      <p className="blog-post-details__date">Date: {blogPost.date}</p>
      <img className="blog-post-details__cover-image" src={blogPost.coverImage} alt="Blog Post Cover" />
      <div className="blog-details__content">
          {blogPost.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      {(currentUser?.isSeller ===true) && (
        <div className="blog-post-details__actions">
          <button onClick={ handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
      </div>
      {/* <div className="sidebar-blogdetails">
        <Sidebar recommendedServices={recommendedServices} />
      </div> */}
      </div>
  );
};

export default BlogPostDetails;
