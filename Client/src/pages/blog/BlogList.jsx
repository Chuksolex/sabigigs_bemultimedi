// // BlogList.js

// import React, {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom';
// import Sidebar from '../../components/sideBar/sideBar';

// import './BlogList.scss';
// import newRequest from '../../utils/newRequest.js';


// const BlogList = ({recommendedServices}) => {
  

//     const [blogPosts, setBlogPosts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//     const [searchQuery, setSearchQuery] = useState('');

//     useEffect(() => {
//       const fetchBlogPosts = async () => {
//         try {
//           const response = await newRequest.get('/blog');
//         //   setBlogPosts(response.data);
//           const sortedBlogPosts = response.data.sort((a, b) => {
//             return new Date(b.date) - new Date(a.date);
//           });
  
//           setBlogPosts(sortedBlogPosts);
//           setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setError('Failed to fetch blog posts.');
//         setLoading(false);
//       }
//     };
  
//       fetchBlogPosts();
//     }, []);

//     const handleSearch = (e) => {
//         setSearchQuery(e.target.value);
//       };
    
//       // Filter blog posts based on the search query
//       const filteredBlogPosts = blogPosts.filter((blogPost) =>
//         blogPost.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//     if (loading) {
//         return <div className='blog-list'>Loading...</div>;
//       }
    
//       if (error) {
//         return <div className='blog-list'>Error: {error}</div>;
//       }


//   return (
//     <div className="blog-list">
//         <div className='main-content' >
//       {blogPosts.map((post) => (
        
//         <div className="blog-post" key={post._id}>
//           <h2 className="blog-post__title">{post.title}</h2>
//           <p className="blog-post__author">Author: {post.author}</p>
//           <p className="blog-post__date">Date: {post.date}</p>
//           <p className="blog-post__content"> {post.content.length > 100
//               ? `${post.content.substring(0, 100)}...`
//               : post.content}
//           </p>
//           <Link to={`/blog/${post._id}`} className="read-more-button">
//             Read More
//           </Link>
//           {(currentUser.isSeller ===true)  && (
//             <div className="blog-post__actions">
//               <button>Edit</button>
//               <button>Delete</button>
//             </div>
//           )}
//         </div>
//       ))}
//       </div>

//     <div className="sidebar">
//         <Sidebar recommendedServices={recommendedServices} />
//       </div>
//     </div>
//   );
// };

// export default BlogList;
import React, { useState, useEffect } from 'react';
import './BlogList.scss';
import newRequest from '../../utils/newRequest';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/sideBar/sideBar';

const BlogList = ({ recommendedServices }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await newRequest.get('/blog');
        const fetchedBlogPosts = response.data;

        // Sort blog posts by date in descending order
        const sortedBlogPosts = fetchedBlogPosts.sort((a, b) =>
          new Date(b.date) - new Date(a.date)
        );

        setBlogPosts(sortedBlogPosts);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch blog posts.');
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter blog posts based on the search query
  const filteredBlogPosts = blogPosts.filter((blogPost) =>
    blogPost.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="blog-list">Loading...</div>;
  }

  if (error) {
    return <div className="blog-list">Error: {error}</div>;
  }

  return (
    <div className="blog-list">
    
      <div className="main-content">
        <h1>Blog Posts</h1>
       
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
        {filteredBlogPosts.map((blogPost) => (
          <div className="blog-post" key={blogPost._id}>
            <h2 className="blog-post__title">{blogPost.title}</h2>
            <p className="blog-post__author">Author: {blogPost.author}</p>
            <p className="blog-post__date">Date: {blogPost.date}</p>
            <p className="blog-post__content">
              {blogPost.content.length > 100
                ? `${blogPost.content.substring(0, 100)}...`
                : blogPost.content}
            </p>
            <Link to={`/blog/${blogPost._id}`} className="read-more-button">
              Read More
            </Link>
          </div>
        ))}
      </div>
      <div className="sidebar">
        <Sidebar recommendedServices={recommendedServices} />
      </div>
    </div>
  );
};

export default BlogList;
