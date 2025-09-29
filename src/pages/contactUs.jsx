import React from 'react'
import { createRoot } from 'react-dom/client';
import LoginModal from '../components/login.jsx';
import SignupModal from '../components/signup.jsx';
import VerifyEmailModal from '../components/verifyEmail.jsx';
import ChangePasswordModal from '../components/changePassword.jsx';
import EditProfileModal from '../components/editProfile.jsx';
import '../styles/bootstrap';

const ContactUs = () => {
  return (
    <>
    <section className="contact-wrapper">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7">
                        <div className="banner-text">
                            <h1 className="font-oswald fw-600 text-uppercase" style={{ fontSize: "3.75rem" }}>
                                <span className="color-change primary-theme">C</span>ontact uS
                            </h1>
                            <p className="text-white">
                                We’d love to hear from you! Whether you have questions about our products, need assistance with a project, or want to provide feedback, the PortaCourts team is here to help. Reach out to us using the information below, and we’ll get back to you as soon as possible.
                                We’d love to hear from you! Whether you have questions about our products, need assistance with a project, or want to provide feedback, the PortaCourts team is here to help. Reach out to us using the information below, and we’ll get back to you as soon as possible.
                            </p>
                            {/* <button className="green-btn border-0">Shop Now</button> */}
                        </div>
                    </div>
                </div>
            </div>
    </section>

    <section className="product-wrapper product-contact">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4 px-0">
                        <div className="product-inner white-green position-relative" >
                            <h2 className="d-flex align-items-center" style={{ fontSize: "2.5rem"}}>
                                01<span className="line-box"></span>
                            </h2>
                            <h4 className="text-uppercase fw-600" style={{ fontSize: "1.25rem"}}>Visit Us</h4>
                            <p className="f20 fw-400">1002 S Eagle Rd Eagle Idaho 83616</p>
                        </div>
                    </div>
                    <div className="col-lg-4 px-0">
                        <div className="product-inner green-white position-relative">
                            <h2 className="d-flex align-items-center" style={{ fontSize: "2.5rem"}}>
                                02<span className="line-box"></span>
                            </h2>
                            <h4 className="text-uppercase fw-600" style={{ fontSize: "1.25rem"}}>Call us</h4>
                            <p className="text-white f20 fw-400">+1 (800) 272-9717</p>
                        </div>
                    </div>
                    <div className="col-lg-4 px-0">
                        <div className="product-inner black-green position-relative">
                            <h2 className="d-flex align-items-center" style={{ fontSize: "2.5rem"}}>
                                03<span className="line-box"></span>
                            </h2>
                            <h4 className="text-uppercase fw-600" style={{ fontSize: "1.25rem"}}>Contact Us</h4>
                            <p className="text-white f20 fw-400">support@portacourts.com</p>
                        </div>
                    </div>
                </div>
            </div>
    </section>

    <section className="py-5">
            <div className="container">
                <div className="row mb-4">
                    <div className="col-4">
                        <div className="border-line"></div>
                        <h2 className="text-capitalize" style={{ fontSize: "2.5rem" }}>Get In Touch</h2>
                    </div>
                    <div className="col-8 text-end">
                        <img 
                            src="https://www.portacourts.com/webassets/img/getintouch.png" 
                            alt="get-in-contact" 
                            className="get-in-contact" 
                        />
                    </div>
                </div>
            </div>
    </section>

    <section className="get-intouch position-relative">
            <div className="container">
                <div className="sign-up-form">
                    <div className="form-contact">
                        <form id="contactForm" noValidate="novalidate">
                            <input
                                type="hidden"
                                name="_token"
                                value="t6zKFL6eKOidmE2koB2C5Cg6ZNY0lFeLzbAOWaO8"
                                autoComplete="off"
                            />
                            <div className="row">
                                <div className="col-lg-6 mb-5">
                                    <div className="form-group">
                                        <label className="primary-theme">First Name</label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            placeholder="Enter here"
                                            className="contact-input form-control text-white"
                                            style={{ border: 'none',outline: 'none',boxShadow: 'none',backgroundColor: 'transparent', borderBottom: '1px solid #ccc', borderRadius: '0'}}
                                        />
                                        <span className="text-danger error-message" id="error-first_name"
                                        ></span>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-5">
                                    <div className="form-group">
                                        <label className="primary-theme">Your Subjects</label>
                                        <input
                                            type="text"
                                            name="subjects"
                                            placeholder="Enter here"
                                            className="contact-input form-control text-white"
                                            // style={{ border: 'none', outline: 'none', boxShadow: 'none', backgroundColor: 'transparent' }}
                                            style={{ border: 'none',outline: 'none',boxShadow: 'none',backgroundColor: 'transparent', borderBottom: '1px solid #ccc', borderRadius: '0'}}
                                        />
                                        <span className="text-danger error-message" id="error-subjects"></span>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-5">
                                    <div className="form-group">
                                        <label className="primary-theme">Email</label>
                                        <input
                                            type="text"
                                            name="email"
                                            placeholder="Enter here"
                                            className="contact-input form-control text-white"
                                            style={{ border: 'none',outline: 'none',boxShadow: 'none',backgroundColor: 'transparent', borderBottom: '1px solid #ccc', borderRadius: '0'}}
                                        />
                                        <span className="text-danger error-message" id="error-email"></span>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-5">
                                    <div className="form-group">
                                        <label className="primary-theme">Phone Number</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder="Enter here"
                                            className="contact-input form-control text-white"
                                            style={{ border: 'none',outline: 'none',boxShadow: 'none',backgroundColor: 'transparent', borderBottom: '1px solid #ccc', borderRadius: '0'}}
                                        />
                                        <span className="text-danger error-message" id="error-phone"></span>
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-5">
                                    <div className="form-group">
                                        <label className="primary-theme">Your message</label>
                                        <textarea
                                            name="message"
                                            placeholder="Enter here"
                                            className="contact-input form-control text-white"
                                            style={{ border: 'none',outline: 'none',boxShadow: 'none',backgroundColor: 'transparent', borderBottom: '1px solid #ccc', borderRadius: '0'}}
                                        ></textarea>
                                        <span className="text-danger error-message" id="error-message"></span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="green-btn">
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="container-fluid px-0">
                <div className="map-contact">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.427177430322!2d-116.35415512455977!3d43.6951017791187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54aefb91b4bfa6c9%3A0xa74c9bcb24c23ed7!2s1002%20S%20Eagle%20Rd%2C%20Eagle%2C%20ID%2083616%2C%20USA!5e0!3m2!1sen!2sin!4v1721215764336!5m2!1sen!2sin"
                        width="100%"
                        height="800"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map"
                    ></iframe>
                </div>
            </div>
    </section>

    <section className="bgdark-grey py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                        <div className="shipping-inner">
                            <img src="https://www.portacourts.com/webassets/img/shipping.svg" alt="Free Shipping" />
                            <div>
                                <h4 className="fw-500 text-white" style={{ fontSize: "1.25rem"}}>FREE SHIPPING</h4>
                                <p className="f18 mb-0 text-white">Free shipping within the continental US.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                        <div className="shipping-inner">
                            <img src="https://www.portacourts.com/webassets/img/return.svg" alt="Estimated Production" />
                            <div>
                                <h4 className="fw-500 text-white" style={{ fontSize: "1.25rem"}}>ESTIMATED PRODUCTION</h4>
                                <p className="f18 mb-0 text-white">7 - 10 Days</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                        <div className="shipping-inner">
                            <img src="https://www.portacourts.com/webassets/img/return.svg" alt="Estimated Shipping Time" />
                            <div>
                                <h4 className="fw-500 text-white" style={{ fontSize: "1.25rem"}}>ESTIMATED SHIPPING TIME</h4>
                                <p className="f18 mb-0 text-white">35 - 45 Days</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                        <div className="shipping-inner">
                            <img src="https://www.portacourts.com/webassets/img/secure.svg" alt="Secure Payment" />
                            <div>
                                <h4 className="fw-500 text-white" style={{ fontSize: "1.25rem"}}>SECURE PAYMENT</h4>
                                <p className="f18 mb-0 text-white">100% Secure Payment</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 text-center">
                        <h4 className="text-white mb-0" style={{ fontSize: "1.25rem"}}>Costs might vary outside the continental US.</h4>
                    </div>
                </div>
            </div>
    </section>

    <section className="py-5">
  <div className="container">
    <div className="row">
      <div className="col-12 col-lg-10 mx-auto">
        <div className="text-center">
          <h2 className="head-color" style={{ fontSize: "2.5rem" }}>Stay Tuned for Updates</h2>
          <p>
            Don’t miss out on the latest news, innovations, and exclusive offers
            from PortaCourts. Stay tuned for updates and be the first to know
            about our new products and exciting developments!
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
              <h4 className="one-line textcolor" style={{ fontSize: "1.25rem" }}>
                How to Turn Your Driveway into a Portable Pickleball Court
              </h4>
              <span className="four-line mb-4 padding-blog">
                {/* Blog text here */}
              </span>
              <a
                className="black-btn"
                href="https://www.portacourts.com/blog-detail/how-to-turn-your-driveway-into-a-portable-pickleball-court"
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
              <h4 className="one-line textcolor" style={{ fontSize: "1.25rem" }}>
                Portable vs Permanent Pickleball Courts: Which One to Choose?
              </h4>
              <span className="four-line mb-4 padding-blog">
                {/* Blog text here */}
              </span>
              <a
                className="black-btn"
                href="https://www.portacourts.com/blog-detail/portable-vs-permanent-pickleball-courts"
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
              <h4 className="one-line textcolor" style={{ fontSize: "1.25rem" }}>
                How to Set Up a Portable Pickleball Court in 20 Minutes
              </h4>
              <span className="four-line mb-4 padding-blog">
                {/* Blog text here */}
              </span>
              <a
                className="black-btn"
                href="https://www.portacourts.com/blog-detail/how-to-set-up-a-portable-pickleball-court-in-20-minutes"
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
    </>

  )
};
  

export default ContactUs;

// Auto-mount when included directly as a script module
if (typeof window !== 'undefined') {
    const el = document.getElementById('react-contact-root');
    if (el) {
        const root = createRoot(el);
        root.render(<ContactUs />);
    }
}