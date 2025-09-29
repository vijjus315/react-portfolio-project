import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";       
import LoginModal from '../components/login.jsx';
import SignupModal from '../components/signup.jsx';
import VerifyEmailModal from '../components/verifyEmail.jsx';
import ChangePasswordModal from '../components/changePassword.jsx';
import EditProfileModal from '../components/editProfile.jsx';
import "../styles/bootstrap";
import BlogDetail from "./blogDetail.jsx";

const Blog = () => {
  const [blogPost, setBlogPost] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    try {
      const blogProducts = [
        {
          id: 1,
          title: "How to Turn Your Driveway into a Portable Pickleball Court",
          date: "May 31, 2025",
          author: "Hammy Owens",
          role: "CEO and Founder",
          image:
            "https://www.portacourts.com/storage/images/NJ1arMgWpEVJRmNg7qWFQ8xZXvpsKrqrA0F5JLFy.webp",
          description:
            "Transforming your driveway into a portable pickleball court for driveway games is easier than you might think...",
          sections: [
            {
              id: "intro",
              heading: "Introduction",
              content:
                "This is a step-by-step guide to making your driveway a court.",
            },
          ],
        },
        {
          id: 2,
          title: "Portable vs Permanent Pickleball Courts: Which One to Choose?",
          date: "May 28, 2025",
          author: "Hammy Owens",
          role: "CEO and Founder",
          image:
            "https://www.portacourts.com/storage/images/HHsz6ZgYbKFBVZ2b7Ca9OxN84QjdxQLJE942snKf.webp",
          description:
            "When it comes to bringing pickleball to your home, one of the first decisions is portable vs permanent courts...",
          sections: [
            {
              id: "overview",
              heading: "Overview",
              content:
                "Here’s how to choose between permanent and portable options.",
            },
          ],
        },
        {
          id: 3,
          title: "How to Set Up a Portable Pickleball Court in 20 Minutes",
          date: "May 26, 2025",
          author: "Hammy Owens",
          role: "CEO and Founder",
          image:
            "https://www.portacourts.com/storage/images/KVg1BcM1feJYsTMxg25qMmuIezcXMDk4iHgpkDJL.webp",
          description:
            "If you're a pickleball enthusiast who's always on the move or simply short of space, a DIY portable pickleball court could be the ultimate game-changer...",
          sections: [
            {
              id: "setup",
              heading: "Setup Guide",
              content: "Here’s how you can set up a pickleball court in 20 minutes.",
            },
          ],
        },
      ];

      setBlogPost(blogProducts);
    } catch (error) {
      console.error("Failed to load blogs data", error);
    }
  }, []);

  const blogContent = [
  {
    id: 1,
    title: "10 Best Portable Pickleball Courts for Your Backyard in 2025",
    url: "https://www.portacourts.com/blog-detail/10-best-portable-pickleball-courts-2025",
    image: "https://www.portacourts.com/storage/images/Zdswxs9g2GZjNiviuZKAVLlCitS4uaZdwphaDKuD.jpg",
    date: "May 23, 2025",
    author: {
      name: "Hammy Owens",
      role: "CEO and Founder",
      image: "https://www.portacourts.com/dummy.png",
    },
  },
  {
    id: 2,
    title: "Best Cheap Pickleball Paddles in 2025",
    url: "https://www.portacourts.com/blog-detail/best-cheap-pickleball-paddles-2025",
    image: "https://www.portacourts.com/storage/images/3V2h2elmAeiA80ATQQfykp8FonQaHuXS3AQzyxRR.webp",
    date: "May 16, 2025",
    author: {
      name: "Hammy Owens",
      role: "CEO and Founder",
      image: "https://www.portacourts.com/dummy.png",
    },
  },
  {
    id: 3,
    title: "Top Rated Women's Pickleball Shoes: The Ultimate 2025 Guide",
    url: "https://www.portacourts.com/blog-detail/top-rated-womens-pickleball-shoes",
    image: "https://www.portacourts.com/storage/images/fdfRgDs2BqGaLqbNwz70Br7kI4f1iYa44mGbHUzg.webp",
    date: "May 12, 2025",
    author: {
      name: "Hammy Owens",
      role: "CEO and Founder",
      image: "https://www.portacourts.com/dummy.png",
    },
  },
  {
    id: 4,
    title: "Why Pickleball is Called Pickleball - Know the facts!",
    url: "https://www.portacourts.com/blog-detail/why-pickleball-is-called-pickleball",
    image: "https://www.portacourts.com/storage/images/n5QKR3oDfw3msQaUImbxVDHZNxpfnxwnUmmd1xY0.webp",
    date: "May 07, 2025",
    author: {
      name: "Hammy Owens",
      role: "CEO and Founder",
      image: "https://www.portacourts.com/dummy.png",
    },
  },
  {
    id: 5,
    title: "Pickleball Round Robin: The Ultimate Guide to Organizing and Playing",
    url: "https://www.portacourts.com/blog-detail/pickleball-round-robin",
    image: "https://www.portacourts.com/storage/images/ADIlEsg4XT7nOYJKHde2bocrmRrIjGSsjcIbWEBr.webp",
    date: "May 05, 2025",
    author: {
      name: "Hammy Owens",
      role: "CEO and Founder",
      image: "https://www.portacourts.com/dummy.png",
    },
  },
  {
    id: 6,
    title: "Pickleball After 50’s Guide to Stay Active, Healthy, and Social",
    url: "https://www.portacourts.com/blog-detail/pickleball-after-50",
    image: "https://www.portacourts.com/storage/images/T4PMuTtcGnVLaOUpQoVftz6TjqxBiFm3PDvlz0ES.webp",
    date: "May 01, 2025",
    author: {
      name: "Hammy Owens",
      role: "CEO and Founder",
      image: "https://www.portacourts.com/dummy.png",
    },
  },
  {
    id: 7,
    title: "How to Get to a 4.0 in Pickleball - PortaCourts",
    url: "https://www.portacourts.com/blog-detail/how-to-get-to-a-4-in-pickleball",
    image: "https://www.portacourts.com/storage/images/wqy9iltsb59SJ1afbR899Y7odHCQrTWjIA1YxfOT.webp",
    date: "Apr 29, 2025",
    author: {
      name: "Hammy Owens",
      role: "CEO and Founder",
      image: "https://www.portacourts.com/dummy.png",
    },
  },
  {
    id: 8,
    title: "Choosing the Best Surface for Your DIY Sport Court",
    url: "https://www.portacourts.com/blog-detail/best-surface-for-your-diy-sport-court",
    image: "https://www.portacourts.com/storage/images/ICmKsHXPmKp57TLsT4FZk0o5YUgx4rtzMIA8tsso.webp",
    date: "Apr 28, 2025",
    author: {
      name: "Hammy Owens",
      role: "CEO and Founder",
      image: "https://www.portacourts.com/dummy.png",
    },
  },
  {
    id: 9,
    title: "Inside the Paddle - A Complete Guide to Pickleball Paddle Materials",
    url: "https://www.portacourts.com/blog-detail/pickleball-paddle-materials",
    image: "https://www.portacourts.com/storage/images/wz1QbBXf6WOkeAdz6Z154As7oNOSMYu24paMmF16.webp",
    date: "Apr 28, 2025",
    author: {
      name: "Hammy Owens",
      role: "CEO and Founder",
      image: "https://www.portacourts.com/dummy.png",
    },
  },
  {
    id: 10,
    title: "Pickleball Court Rules You Should Know Before Playing",
    url: "https://www.portacourts.com/blog-detail/pickleball-court-rules",
    image: "https://www.portacourts.com/storage/images/KYoRk3OB74i5uy2hyfbsxT3JuDmfzLWI5GZO2Z01.webp",
    date: "Apr 25, 2025",
    author: {
      name: "Hammy Owens",
      role: "CEO and Founder",
      image: "https://www.portacourts.com/dummy.png",
    },
  },
  {
    id: 11,
    title: "Pickleball Court Rules: Your Guide for League Play",
    url: "https://www.portacourts.com/blog-detail/pickleball-court-rules-for-league-play",
    image: "https://www.portacourts.com/storage/images/L5IC1xZlbTtm4LVloebMHErpIgYJ1ikatjIYK0jJ.webp",
    date: "Apr 25, 2025",
    author: {
      name: "Hammy Owens",
      role: "CEO and Founder",
      image: "https://www.portacourts.com/dummy.png",
    },
  },
  {
    id: 12,
    title: "Best Pickleballs for Cold Weather: A Complete Guide to Winter Pickleballs",
    url: "https://www.portacourts.com/blog-detail/best-pickleballs-for-cold-weather",
    image: "https://www.portacourts.com/storage/images/nRKLKECrOPi58V7qLsAbQdFIHTA2dPFNb1qXPxyA.webp",
    date: "Apr 23, 2025",
    author: {
      name: "Hammy Owens",
      role: "CEO and Founder",
      image: "https://www.portacourts.com/dummy.png",
    },
  },
  ];


  const openBlogDetail = (post) => {
    setSelectedBlog(post);
    // responsible for showing /blog-detail in url.
    window.history.pushState({}, "", "/blog-detail");
  };

  return (
    <>
      <section className="py-5">
        <div className="container">
          {!selectedBlog ? (
            <>
              <div className="text-center">
                {/* size increase through fontsize */}
                <h1 className="mb-1" style={{ fontSize: "3.75rem" }}>Porta Courts Blogs</h1>
                <p className="mb-5 f18 text-grey">
                  Stay updated with the latest trend!
                </p>
              </div>
              <div className="row">
                {blogPost.map((post) => (
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
                        <h4 className="black-grey pb-3 mb-0 oneline-blog" style={{ fontSize: "1.25rem"}}>
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

              {/* blogContent */}
              <section className="py-5">
                <div className="container">
                  <div className="row">
                    {blogContent.map((card) => (
                      <div className="col-lg-6 mt-4 mt-lg-0" key={card.id}>
                        <div className="sports">
                          <div className="mb-4">
                            <a
                              className="d-md-flex gap-3 align-items-center"
                              href={card.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: 'none' }}
                            >
                              <div className="listimage-blog">
                                <img
                                  src={card.image}
                                  className="listblog-image"
                                  alt={card.title}
                                />
                              </div>

                              <div className="text-carousel mt-3 mt-md-0">
                                <div className="post-meta pb-2">
                                  <span className="f16 black-grey fw-500">
                                    Created
                                  </span>
                                  <span className="f14 text-grey">
                                    - {card.date}
                                  </span>
                                </div>
                                <h4 className="black-grey pb-3 mb-0 blogone f18">
                                  {card.title}
                                </h4>
                                <div className="post-author d-flex align-items-center gap-2 mt-2">
                                  <div className="author-pic">
                                    <img
                                      src={card.author.image}
                                      alt={card.author.name}
                                    />
                                  </div>
                                  <div className="text">
                                    <p className="f20 black-grey fw-600 pb-0 lh-sm mb-0">
                                      {card.author.name}
                                    </p>
                                    <p className="text-grey mb-0">
                                      {card.author.role}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
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
    </>
  );
};

export default Blog;

// Auto-mount
if (typeof window !== "undefined") {
  const el = document.getElementById("react-blogs-root");
  if (el) {
    const root = createRoot(el);
    root.render(<Blog />);
  }
}


