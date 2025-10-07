import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from '../layouts/Navbar.jsx';
import Footer from '../layouts/Footer.jsx';
import LoginModal from '../components/login';
import SignupModal from '../components/signup.jsx';
import ChangePasswordModal from '../components/changePassword.jsx';
import EditProfileModal from '../components/editProfile.jsx';
import '../styles/bootstrap';
import VerifyEmailModal from '../components/verifyEmail';

const AboutUs = () => {
  return (
    <>
      {/* <Header /> */}
      {/* Banner */}
      <section className="about-wrapper pt-70 pb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="banner-text">
                <h1 className="font-oswald fw-600 text-uppercase" style={{ fontSize: "3.75rem" }}>
                  <span className="color-change primary-theme" >A</span>
                  BOUT US
                </h1>
                <p className="text-white">
                  Welcome to PortaCourts, where innovation and quality meet to
                  provide you with the best sports flooring solutions. Our courts
                  are designed with a professional surface grain that ensures
                  anti-skid safety, allowing for free and dynamic movement on the
                  court. Tailored specifically for pickleball, our floors meet the
                  required friction coefficient standards, ensuring both
                  performance and safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* about view */}
      <section className="about-view pt-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="border-line"></div>
              <h2 className="text-capitalize mb-3" style={{ fontSize: "2.5rem"}}>Our View</h2>
              <p className="">
                <span className="font-36 primary-theme">W</span>elcome to
                PortaCourts, where innovation and excellence converge to deliver
                premium sports flooring solutions. Our courts feature a
                professionally engineered surface grain that guarantees anti-skid
                safety, enabling unrestricted and dynamic movement. Specifically
                designed for pickleball, our flooring adheres to{" "}
                <b>industry friction coefficient standards</b>, ensuring optimal
                performance and safety.
              </p>
              <p className="">
                Our courts are crafted from UV-resistant acrylic materials with
                superior traction control, ensuring players have the perfect grip,
                even in extreme weather conditions ranging from{" "}
                <b>-40°C to 80°C</b>. With advanced shock absorption technology and
                a rebound rate of over 90%, our pickleball courts offer smooth
                gameplay and consistent ball response.
              </p>
              <p className="">
                For spikeball enthusiasts, we offer premium courts made from a
                lightweight yet durable mix of raw <b>NBR rubber and PVC</b>,
                featuring foldable, tool-free assembly. Our Spikeball Courts also
                come with an adjustable net tensioning system to maintain
                consistent bounds in each rally. Thus,{" "}
                <b>achieving a net rebound rate of over 90%</b> for quick-paced
                rallies and fastball returns.
              </p>
              <p className="">
                For spikeball enthusiasts, we offer premium courts made from a
                lightweight yet durable mix of raw <b>NBR rubber and PVC</b>,
                featuring foldable, tool-free assembly. Our Spikeball Courts also
                come with an adjustable net tensioning system to maintain
                consistent bounds in each rally. Thus,{" "}
                <b>achieving a net rebound rate of over 90%</b> for quick-paced
                rallies and fastball returns.
              </p>
              <p className="">
                Wanna know more about the industry trends, advanced court
                solutions, and technical know-how behind the designing and
                manufacturing of professional courts? Chip into our{" "}
                <a href="/blog">blog</a> section!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* inner-gallery */}
      <section className="py-4 abouts-inner-gallery">
        <div className="container">
          <div className="row gallery h-100">
            <div className="col-md-4">
              <img
                src="https://www.portacourts.com/webassets/img/gallery-one.png"
                alt="Image 1"
                className="img-fluid h-100 object-fit-cover"
              />
            </div>
            <div className="col-md-4">
              <img
                src="https://www.portacourts.com/webassets/img/gallery-long.png"
                alt="Image 2"
                className="img-fluid h-100 object-fit-cover"
              />
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <img
                    src="https://www.portacourts.com/webassets/img/gallery-two.png"
                    alt="Image 3"
                    className="img-fluid h-100 object-fit-cover"
                  />
                </div>
                <div className="col-md-12">
                  <img
                    src="https://www.portacourts.com/webassets/img/gallery-three.png"
                    alt="Image 4"
                    className="img-fluid h-100 object-fit-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* our story */}
      <section className="bout-view py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="border-line"></div>
              <h2 className="text-capitalize mb-3" style={{ fontSize: "2.5rem"}}>Our Story</h2>
              <p>
                <span className="font-36 primary-theme">A</span>t PortaCourts, our
                journey began with a passion for creating exceptional sports
                experiences. As avid sports enthusiasts, we recognized the
                importance of high-quality, durable courts that enhance
                performance while ensuring safety and longevity. Driven by this
                vision, we set out to revolutionize the sports flooring industry
                with innovative designs and state-of-the-art technology.
              </p>
              <p>
                With a focus on sustainability and cost-effectiveness, our
                engineering team developed a super stable structure capable of
                withstanding extreme temperatures, making our floors suitable for
                all environments. Our advanced manufacturing processes ensure
                precision and perfection in every court we produce, from minimal
                splicing errors to flawless parquet alignments.
              </p>
              <p>
                Over the years, PortaCourts has grown from a small team of
                innovators to a leading provider of premium sports flooring
                solutions. We remain committed to our core values of quality,
                safety, and customer satisfaction, continuously striving to
                deliver the best in sports court technology.
              </p>
              <p>
                Join us on our journey as we continue to push the boundaries of
                what’s possible in sports flooring, helping athletes and
                enthusiasts unlock their full potential with every game.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="testimonials-wrapper py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-9 col-lg-8 mx-auto">
              <div className="contain">
                <div className="item">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="testimonial-image position-relative">
                        <img src="https://www.portacourts.com/storage/images/eVJ82A8WLHTxXDp19uCg4J5nbVkq37eOlThNMti7.jpg" className="img-fluid" />
                        <div className="name-testi">
                          <img src="https://www.portacourts.com/webassets/img/ellipse.svg" className="img-fluid" />
                          <h6 className="text-center black-grey">Hammy Owen</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8 mt-3 mt-md-0">
                      <div className="testimonials-text ps-md-4">
                        <h2 className="text-white">CEO <br/>
                        </h2>
                        <p className="text-white "></p>
                        <div>This all started when I wanted to avoid painting lines on my tennis court and found the temporary options unsatisfactory. After extensive research and beta testing, I believe we've created an incredible alternative that's not only high quality but also much cheaper than a permanent court and fully portable. We've used this setup everywhere—from backyard blacktops to tennis courts, and even in corporate conference rooms during meetings.</div>
                        <div><br/></div>
                        <div>Whether you're looking for a semi-permanent or permanent solution, or even considering starting a side hustle, this court is perfect for you. Market data shows that this is a lot more fun than renting bounce houses 🤪 (with daily rentals fetching $350-$450/day). You can organize tournaments, play in unique locations, or have your own court ready when you can't find an open one. Be an early adopter!</div> 
                        <p></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* dark elements */}
      <section className="bgdark-grey py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div className="shipping-inner">
                <img src="https://www.portacourts.com/webassets/img/shipping.svg" />
                <div>
                  <h4 className="fw-500 text-white" style={{ fontSize: "1.25rem"}}>FREE SHIPPING</h4>
                  <p className="f18 mb-0 text-white">
                    Free shipping within the continental US.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div className="shipping-inner">
                <img src="https://www.portacourts.com/webassets/img/return.svg" />
                <div>
                  <h4 className="fw-500 text-white" style={{ fontSize: "1.25rem"}}>ESTIMATED PRODUCTION</h4>
                  <p className="f18 mb-0 text-white">7 - 10 Days</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div className="shipping-inner">
                <img src="https://www.portacourts.com/webassets/img/return.svg" />
                <div>
                  <h4 className="fw-500 text-white" style={{ fontSize: "1.25rem"}}>ESTIMATED SHIPPING TIME</h4>
                  <p className="f18 mb-0 text-white">35 - 45 Days</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div className="shipping-inner">
                <img src="https://www.portacourts.com/webassets/img/secure.svg" />
                <div>
                  <h4 className="fw-500 text-white" style={{ fontSize: "1.25rem"}}>SECURE PAYMENT</h4>
                  <p className="f18 mb-0 text-white">100% Secure Payment</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 text-center">
              <h4 className="text-white mb-0" style={{ fontSize: "1.25rem"}}>
                Costs might vary outside the continental US.
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* stay tuned */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="text-center">
                <h2 className="head-color" style={{ fontSize: "2.5rem"}}>Stay Tuned for Updates</h2>
                <p>
                  Don’t miss out on the latest news, innovations, and exclusive
                  offers from PortaCourts. Stay tuned for updates and be the first
                  to know about our new products and exciting developments!
                </p>
              </div>
            </div>
          </div>

          <div className="row pt-3">
            <div className="col-lg-4 pb-5 pb-lg-0">
              <div className="stay-blog">
                <div className="blog-img">
                  <img
                    src="https://www.portacourts.com/storage/images/NJ1arMgWpEVJRmNg7qWFQ8xZXvpsKrqrA0F5JLFy.webp"
                    className="img-fluid"
                    alt="Blog 1"
                  />
                </div>
                <div className="stay-blog-details bg-white">
                  <div className="inner-blog-detail">
                    <p className="f18 fw-400 mb-1 d-flex align-items-center gap-2">
                      <img
                        src="https://www.portacourts.com/webassets/img/calender.svg"
                        alt="Calendar"
                      />
                      May 31, 2025
                    </p>
                    <h4 className="one-line textcolor" style={{ fontSize: "1.25rem"}}>
                      How to Turn Your Driveway into a Portable Pickleball Court
                    </h4>
                    <span className="four-line mb-4 padding-blog">
                      {/* Blog text here */}
                    </span>
                    <a
                      className="black-btn"
                      href="/blogs/12"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 pb-5 pb-lg-0">
              <div className="stay-blog">
                <div className="blog-img">
                  <img
                    src="https://www.portacourts.com/storage/images/HHsz6ZgYbKFBVZ2b7Ca9OxN84QjdxQLJE942snKf.webp"
                    className="img-fluid"
                    alt="Blog 2"
                  />
                </div>
                <div className="stay-blog-details bg-white">
                  <div className="inner-blog-detail">
                    <p className="f18 fw-400 mb-1 d-flex align-items-center gap-2">
                      <img
                        src="https://www.portacourts.com/webassets/img/calender.svg"
                        alt="Calendar"
                      />
                      May 28, 2025
                    </p>
                    <h4 className="one-line textcolor" style={{ fontSize: "1.25rem"}}>
                      Portable vs Permanent Pickleball Courts: Which One to Choose?
                    </h4>
                    <span className="four-line mb-4 padding-blog">
                      {/* Blog text here */}
                    </span>
                    <a
                      className="black-btn"
                      href="/blogs/10"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 pb-5 pb-lg-0">
              <div className="stay-blog">
                <div className="blog-img">
                  <img
                    src="https://www.portacourts.com/storage/images/KVg1BcM1feJYsTMxg25qMmuIezcXMDk4iHgpkDJL.webp"
                    className="img-fluid"
                    alt="Blog 3"
                  />
                </div>
                <div className="stay-blog-details bg-white">
                  <div className="inner-blog-detail">
                    <p className="f18 fw-400 mb-1 d-flex align-items-center gap-2">
                      <img
                        src="https://www.portacourts.com/webassets/img/calender.svg"
                        alt="Calendar"
                      />
                      May 26, 2025
                    </p>
                    <h4 className="one-line textcolor" style={{ fontSize: "1.25rem"}}>
                      How to Set Up a Portable Pickleball Court in 20 Minutes
                    </h4>
                    <span className="four-line mb-4 padding-blog">
                      {/* Blog text here */}
                    </span>
                    <a
                      className="black-btn"
                      href="/blogs/15"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Login and Signup Modals */}
      <LoginModal />
      <SignupModal />
      <VerifyEmailModal />
      <ChangePasswordModal />
      <EditProfileModal />
      
      {/* <Footer /> */}
    </>
  );
};

export default AboutUs;

// Auto-mount when included directly as a script module
if (typeof window !== 'undefined') {
    const el = document.getElementById('react-about-root');
    if (el) {
        const root = createRoot(el);
        root.render(<AboutUs />);
    }
}

