import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [sortBy, setSortBy] = useState("Newest");
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        console.log('Fetching blog with ID:', id);
        
        // Fetch blog detail using the ID from URL
        const apiUrl = `http://18.188.69.99:4235/api/v1/blogs/${id}`;
        console.log('API URL:', apiUrl);
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data.success) {
          setBlog(data.body);
          setComments(data.body.blog_comments || []);
          console.log('Blog loaded successfully:', data.body.title);
        } else {
          console.error('Blog not found with ID:', id);
          setBlog(null);
        }
      } catch (error) {
        console.error('Error fetching blog detail:', error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogDetail();
    } else {
      console.log('No ID found in URL params');
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([{ text: comment, date: new Date() }, ...comments]);
      setComment("");
    }
  };

  if (loading) {
    return (
      <section className="blog-detail-wrapper py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading blog...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="blog-detail-wrapper py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2>Blog not found</h2>
              {!id && <p>No blog ID provided. Please navigate from a blog link.</p>}
              <p>Current URL parameters: {JSON.stringify({ id })}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <section className="blog-detail-wrapper py-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="fw-400 mb-2">{blog.title}</h2>
            <div className="author-section mb-3 d-flex justify-content-between align-items-center">
              {/* Author Info */}
              <div className="author-info d-flex align-items-center">
                <div className="position-relative me-3">
                  <img
                  src="https://www.portacourts.com/webassets/img/user-blue.svg"
                  alt="Author Image"
                  className="author-img"
                  style={{ width: "60px", height: "60px" }}
                  />
                </div>
                <div>
                  <h4 className="mb-0 fw-bold">{blog.user?.name || 'port1'}</h4>
                  <p className="text-muted mb-0">{formatDate(blog.created_at)}</p>
                </div>
              </div>
              {/* Comments */}
              <div className="d-flex">
                <div className="shares-reads me-4  text-end">
                  <h5 className="mb-0" style={{ color: "#7AB751", margin: "32px" }}>{comments.length}</h5>
                  <small style={{ fontWeight: "bold"}}>Comments</small>
                </div>
              </div>
            </div>

            <div className="blog-detailbanner mb-3">
              <img src={blog.image_url} className="blogdetail-fluid" alt={blog.title} />
            </div>

            <div 
              className="blog-content" 
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          </div>
        </div>

        {/* Comments Section */}
        <div className="row mt-4">
          <div className="col-12 col-lg-9 mb-3">
            <div className="row align-items-center">
              <div className="col-6">
                <div className="border-line"></div>
                <h2 className="text-capitalize">COMMENTS</h2>
              </div>
              <div className="col-6 text-end">
                <div className="sort-drop text-end gap-2">
                  <p className="fw-400 mb-0">Sort by :</p>
                  <div className="dropdown">
                    <button className="btn dropdown-toggle drop-btn-sort fw-500 border-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      {sortBy}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><span className="dropdown-item" onClick={() => setSortBy("Newest")}>Newest</span></li>
                      <li><span className="dropdown-item" onClick={() => setSortBy("Oldest")}>Oldest</span></li>
                      <li><span className="dropdown-item" onClick={() => setSortBy("Most Liked")}>Most Liked</span></li>
                      <li><span className="dropdown-item" onClick={() => setSortBy("Recommended")}>Recommended</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <ul className="list-unstyled mt-3">
              {comments.length === 0 && <li>No comments yet.</li>}
              {comments.map((c, index) => (
                <li key={index} className="mb-2 p-2 border rounded">
                  <p className="mb-1">{c.text}</p>
                  <small className="text-muted">{c.date.toLocaleString()}</small>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-3">
            <div className="leavecomment bg-white p-4">
              <h3>Leave A Comment</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label className="pb-2" htmlFor="comment">Comment</label>
                  <textarea id="comment" name="comment" className="h-130 pt-2 form-control common-input resize-none" placeholder="Enter here" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                  <span className="text-danger" id="comment-error"></span>
                </div>
                <div className="pt-4 pb-3">
                  <button type="submit" className="btn green-btn w-100 box-shadow">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;


if (typeof window !== 'undefined') {
    const el = document.getElementById('react-blog-detail-root');
    if (el) {
        const root = createRoot(el);
        root.render(<BlogDetail />);
    }
}