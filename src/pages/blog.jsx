import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { useNavigate } from "react-router-dom";       
import LoginModal from '../components/login.jsx';
import SignupModal from '../components/signup.jsx';
import VerifyEmailModal from '../components/verifyEmail.jsx';
import ChangePasswordModal from '../components/changePassword.jsx';
import EditProfileModal from '../components/editProfile.jsx';
import ForgetPasswordModal from '../components/forgetPassword.jsx';
import { getBlogs, transformBlogData, sortBlogsByPriority } from '../services/blog.js';
import "../styles/bootstrap";
import BlogDetail from "./blogDetail.jsx";

const Blog = () => {
  const [blogPost, setBlogPost] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        console.log('📝 Blog: Fetching blogs from API...');
        const response = await getBlogs();
        
        if (response.success && response.body && response.body.data && response.body.data.rows) {
          console.log('📝 Blog: API response received:', response.body.data.rows.length, 'blogs');
          
          // Transform API data to match UI structure
          const transformedBlogs = response.body.data.rows.map(transformBlogData);
          
          // Sort blogs to prioritize specific IDs at the top
          const sortedBlogs = sortBlogsByPriority(transformedBlogs);
          setBlogPost(sortedBlogs);
          
          console.log('📝 Blog: Blogs transformed, sorted, and set:', sortedBlogs.length, 'blogs');
          console.log('📝 Blog: Priority blogs at top:', sortedBlogs.slice(0, 4).map(b => `ID: ${b.id} - ${b.title}`));
        } else {
          console.log('📝 Blog: No blogs found in API response');
          setBlogPost([]);
        }
      } catch (error) {
        console.error('❌ Blog: Failed to load blogs from API:', error);
        setError('Failed to load blogs. Please try again later.');
        
        // Fallback to empty array on error
        setBlogPost([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Static blog content - commented out as we're now using API data
  // const blogContent = [
  //   {
  //     id: 1,
  //     title: "10 Best Portable Pickleball Courts for Your Backyard in 2025",
  //     url: "https://www.portacourts.com/blog-detail/10-best-portable-pickleball-courts-2025",
  //     image: "https://www.portacourts.com/storage/images/Zdswxs9g2GZjNiviuZKAVLlCitS4uaZdwphaDKuD.jpg",
  //     date: "May 23, 2025",
  //     author: {
  //       name: "Hammy Owens",
  //       role: "CEO and Founder",
  //       image: "https://www.portacourts.com/dummy.png",
  //     },
  //   },
  //   // ... rest of static data commented out
  // ];


  const openBlogDetail = (post) => {
    setSelectedBlog(post);
    // Navigate to blog detail page using React Router
    navigate(`/blog-detail/${post.id}`);
  };

  return (
    <>
      <section className="py-5">
        <div className="container">
          {!selectedBlog ? (
            <>
              <div className="text-center">
                <h1 className="mb-1" style={{ fontSize: "3.75rem" }}>Porta Courts Blogs</h1>
                <p className="mb-5 f18 text-grey">
                  Stay updated with the latest trend!
                </p>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-grey">Loading blogs...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  <h4 className="alert-heading">Oops!</h4>
                  <p>{error}</p>
                  <hr />
                  <p className="mb-0">Please refresh the page or try again later.</p>
                </div>
              )}

              {/* Blog Posts Grid */}
              {!isLoading && !error && (
                <>
                  {/* Top 3 Blogs - 3 Column Layout */}
                  {blogPost.length > 0 && (
                    <div className="row mb-5" style={{ marginBottom: "4rem" }}>
                      {blogPost.slice(0, 3).map((post) => (
                        <div
                          className="col-md-6 col-lg-4 mb-4 mb-lg-0"
                          key={post.id}
                        >
                          <div
                            className="blog-grid d-block"
                            style={{ cursor: "pointer" }}
                            onClick={() => openBlogDetail(post)}
                          >
                            <div>
                              <img
                                src={post.image}
                                className="img-fluid mb-3 blog-grid-image"
                                alt={post.title}
                              />
                            </div>
                            <div className="text-carousel">
                              <div className="post-meta pb-3">
                                <span className="f16 black-grey fw-500">Created</span>
                                <span className="f14 text-grey">- {post.date}</span>
                              </div>
                              <h4 className="black-grey pb-3 mb-0 oneline-blog" style={{ fontSize: "1.25rem" }}>
                                {post.title}
                              </h4>
                              <div className="four-line mb-4 padding-blog text-grey fw-400">
                                <p className="text-grey fw-400">{post.description}</p>
                              </div>
                              <div className="post-author d-flex align-items-center gap-2">
                                <div className="author-pic">
                                  <img
                                    src="https://www.portacourts.com/dummy.png"
                                    alt={post.author}
                                  />
                                </div>
                                <div className="text">
                                  <p className="f20 black-grey fw-600 pb-0 lh-sm mb-0">
                                    {post.author}
                                  </p>
                                  <p className="text-grey mb-0">{post.role}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Remaining Blogs - 2 Column Layout */}
                  {blogPost.length > 3 && (
                    <div className="row" style={{ marginTop: "2rem" }}>
                      {blogPost.slice(3).map((post) => (
                        <div
                          className="col-lg-6 mb-4"
                          key={post.id}
                        >
                          <div
                            className="sports"
                            style={{ cursor: "pointer" }}
                            onClick={() => openBlogDetail(post)}
                          >
                            <div className="mb-4">
                              <div className="d-md-flex gap-3 align-items-center">
                                <div className="listimage-blog">
                                  <img
                                    src={post.image}
                                    className="listblog-image"
                                    alt={post.title}
                                  />
                                </div>

                                <div className="text-carousel mt-3 mt-md-0">
                                  <div className="post-meta pb-2">
                                    <span className="f16 black-grey fw-500">
                                      Created
                                    </span>
                                    <span className="f14 text-grey">
                                      - {post.date}
                                    </span>
                                  </div>
                                  <h4 className="black-grey pb-3 mb-0 blogone f18">
                                    {post.title}
                                  </h4>
                                  <div className="post-author d-flex align-items-center gap-2 mt-2">
                                    <div className="author-pic">
                                      <img
                                        src="https://www.portacourts.com/dummy.png"
                                        alt={post.author}
                                      />
                                    </div>
                                    <div className="text">
                                      <p className="f20 black-grey fw-600 pb-0 lh-sm mb-0">
                                        {post.author}
                                      </p>
                                      <p className="text-grey mb-0">
                                        {post.role}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* No Blogs Message */}
                  {blogPost.length === 0 && (
                    <div className="col-12 text-center py-5">
                      <h3 className="text-grey">No blogs found</h3>
                      <p className="text-grey">Check back later for new blog posts!</p>
                    </div>
                  )}
                </>
              )}

              {/* Additional Blog Content Section - Removed as we're using API data */}
              {/* The blogContent section has been removed since we're now fetching all blogs from the API */}
            </>
          ) : (
            <BlogDetail blogPage={[selectedBlog]} />
          )}
        </div>
      </section>
      
      {/* Login and Signup Modals */}
      <LoginModal />
      <SignupModal />
      <VerifyEmailModal />
      <ChangePasswordModal />
      <EditProfileModal />
      <ForgetPasswordModal />
    </>
  );
};

// Export the component for use in router
export default Blog;

// Auto-mount
if (typeof window !== "undefined") {
  const el = document.getElementById("react-blogs-root");
  if (el) {
    const root = createRoot(el);
    root.render(<Blog />);
  }
}


