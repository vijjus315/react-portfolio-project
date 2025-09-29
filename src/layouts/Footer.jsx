import React from 'react';

const Footer = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return (
        <footer className="bgdark-grey pt-5 pb-3">
            <div className="container">
                <div className="row ">
                    <div className="col-md-6 col-lg-4 mb-3 mb-lg-0">
                        <div className="logo-footer">
                            <a className=" py-0" href="#"><img src={`${origin}/webassets/img/logo.svg`} /></a>
                            <p className="text-white pt-3 mb-0">PortaCourts is your premier destination for high-quality, customizable sports courts. Whether you're looking for a basketball, tennis, or badminton court, we offer durable and innovative solutions tailored to meet your needs.</p>
                        </div>
                    </div>
                    <div className="col-md-6  col-lg-2 mb-3 mb-lg-0">
                        <h5 className="primary-theme" style={{ fontSize: "1.5rem"}}>Service</h5>
                        <ul className="footer-list ps-0 pt-2">
                            <li><a className="text-decoration-none" href="/">Home</a></li>
                            <li><a className="text-decoration-none" href="/about-us">About Us </a></li>
                            <li><a className="text-decoration-none" href="/products">Products</a></li>
                            <li><a className="text-decoration-none" href="/blog">Blog</a></li>
                            <li><a className="text-decoration-none" href="/contact">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="col-md-6  col-lg-3 mb-3 mb-lg-0">
                        <h5 className="primary-theme" style={{ fontSize: "1.5rem"}}>Get In Touch</h5>
                        <ul className="footer-list ps-0 pt-2">
                            <li><a className="text-decoration-none d-flex align-items-baseline" href="tel:+18002729717">
                                <i className="width-icon fa fa-phone" aria-hidden="true"></i>
                                +1 (800) 272-9717</a></li>
                            <li><a className="text-decoration-none d-flex align-items-baseline" href="mailto:support@portacourts.com">
                                <i className="width-icon fa fa-envelope" aria-hidden="true"></i>
                                support@portacourts.com
                            </a></li>
                            <li><a className="text-decoration-none d-flex align-items-baseline">
                                <i className="width-icon fa fa-map-marker" aria-hidden="true"></i>
                                1002 S Eagle Rd<br/>Eagle Idaho 83616</a></li>
                        </ul>
                    </div>
                    <div className="col-md-6  col-lg-3 mb-3 mb-lg-0">
                        <h5 className="primary-theme" style={{ fontSize: "1.5rem"}}>Quick Links</h5>
                        <ul className=" footer-list ps-0 pt-2">
                            <li><a className="text-decoration-none" href="/terms-conditions">Terms & Conditions</a></li>
                            <li><a className="text-decoration-none" href="/privacy-policy"> Privacy Policy</a></li>
                            <li><a className="text-decoration-none" href="/sitemap.xml">Sitemap</a></li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-xl-4 mb-3 mb-lg-0">
                        <div className="logo-footer">
                            <h5 className="primary-theme" style={{ fontSize: "1.5rem"}}>Newsletter</h5>
                            <form id="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group position-relative newletter w-75 pt-3">
                                    <input type="email" name="email" placeholder="Enter your email" />
                                    <button type="submit" className=" send-btn">Send</button>
                                </div>
                                <span className="text-danger error-message" id="error-email"></span>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6  col-xl-2 mb-3 mb-lg-0 d-none d-xl-block">
                    </div>
                    <div className="col-md-6 col-xl-3 d-none d-xl-block mb-3 mb-lg-0">
                    </div>
                    <div className="col-md-6  col-xl-3 mb-3 mb-lg-0">
                        <h5 className="primary-theme " style={{ fontSize: "1.5rem"}}>Follow Us On</h5>
                        <ul className="social-list footer-list ps-0 pt-2">
                            <li><a className="text-decoration-none" href="https://www.instagram.com/portacourts"><img src={`${origin}/webassets/img/Instagram.svg`} /></a></li>
                            <li><a className="text-decoration-none" href="https://www.youtube.com/@PortaCourts"><img src={`${origin}/webassets/img/Youtube.svg`} /> </a></li>
                            <li><a className="text-decoration-none" href="https://www.facebook.com/profile.php?id=61564220253714"><img src={`${origin}/webassets/img/Facebook.svg`} /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <p className="mb-0 text-white">© 2024 PortaCourts. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


