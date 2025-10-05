import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Link } from 'react-router-dom';
import '../styles/bootstrap';

import LoginModal from '../components/login.jsx';
import SignupModal from '../components/signup.jsx';
import ChangePasswordModal from '../components/changePassword.jsx';
import EditProfileModal from '../components/editProfile.jsx';
import VerifyEmailModal from '../components/verifyEmail.jsx';
import ForgetPasswordModal from '../components/forgetPassword.jsx';
import VerifyOtpModal from '../components/verifyOtp.jsx';
import ResetPasswordModal from '../components/resetPassword.jsx';
import Ceo from '../components/ceo.jsx';
// import Header from '../layouts/Navbar.jsx';
// import Footer from '../layouts/Footer.jsx';

const Home = () => {
    const [banner, setBanner] = useState([]);
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [testimonail, setTestimonail] = useState([]);
    const [post, setPost] = useState([]);

    const fallBackHero = "/webassets/img/bzM09pT0Nlgp5pXMcrdkgt8WCMpyt3xcCSNLmWz5.jpg"

    useEffect(() => {
        async function load() {
            const res = await window.axios.get('/home-data');
            setBanner(res.data.banner || []);
            setCategory(res.data.category || []);
            setProduct(res.data.product || []);
            setTestimonail(res.data.testimonail || []);
            setPost(res.data.post || []);
        }
        load();
    }, []);

    // Initialize carousels after banner data is loaded
    useEffect(() => {
        if (window.$ && typeof window.$.fn.owlCarousel === 'function') {
            // Destroy existing carousel if it exists
            const $banner = window.$('#owl-carousel-banner');
            try { $banner.trigger('destroy.owl.carousel'); } catch (_) {}
            
            // Initialize banner carousel
            $banner.owlCarousel({
                loop: true,
                margin: 0,
                dots: true,
                nav: false,
                items: 1,
                autoplay: true,
                autoplayTimeout: 4000,
                autoplayHoverPause: true,
                responsive: {
                    0: { items: 1 },
                    600: { items: 1 },
                    1000: { items: 1 }
                }
            });
            
            // Initialize testimonials carousel
            const $testimonials = window.$('#owl-carousel');
            try { $testimonials.trigger('destroy.owl.carousel'); } catch (_) {}
            $testimonials.owlCarousel({
                loop: true,
                margin: 30,
                dots: false,
                nav: true,
                items: 1,
                navText: [
                    `<img src='${window.location.origin}/webassets/img/left-arrow.svg' class='left-arrow'/>`,
                    `<img src='${window.location.origin}/webassets/img/right-arrow.svg' class='right-arrow'/>`
                ]
            });
        }
    }, [banner, testimonail]);
    console.log("Banner value:", banner);

    // Fallback slides if no banners are configured in DB
    const fallbackSlides = [
        'https://www.portacourts.com/storage/images/bzM09pT0Nlgp5pXMcrdkgt8WCMpyt3xcCSNLmWz5.jpg',
        'https://www.portacourts.com/storage/images/bzM09pT0Nlgp5pXMcrdkgt8WCMpyt3xcCSNLmWz5.jpg',
        'https://www.portacourts.com/storage/images/bzM09pT0Nlgp5pXMcrdkgt8WCMpyt3xcCSNLmWz5.jpg'
    ];

    return (
        <>
            <LoginModal />
            <SignupModal />
            <VerifyEmailModal />
            <ChangePasswordModal />
            <EditProfileModal />
            <ForgetPasswordModal />
            <VerifyOtpModal />
            <ResetPasswordModal />
            {/* Head meta stays in master; if needed, can be added via react-helmet */}

            {/* SCORE A DEAL hero slider (banner) */}
            <section className="wrapper-slider-banner">
                <div className="contain">
                    <div id="owl-carousel-banner" className="owl-carousel owl-theme">
                        {(banner.length > 0 ? banner : fallbackSlides).map((bannerItem, idx) => {
                            const imageSrc = typeof bannerItem === 'string' ? bannerItem : bannerItem.image_url || bannerItem.image;
                            return (
                                <div className="item" key={`banner-${idx}`}>
                                    <img src={imageSrc} className="img-fluid img-banner-slider" alt="PortaCourts Home Banner" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Category highlight section (01/02/03) */}
            <section className="product-wrapper">
                <div className="container-fluid ">
                    <div className="row">
                        {(category.length ? category : [
                            { id: 1, title: 'TENNIS BALL COURTS', sort_description: 'Experience top-tier gameplay with our professional-grade basketball courts designed for optimal performance.' },
                            { id: 2, title: 'PICKLEBALL COURTS', sort_description: 'UV protective, weather-resistant, built-in shock-absorbing layers, two-floor lining as per professional design ensuring no wear & tear - our Pickleball courts have it all!' },
                            { id: 3, title: 'SPIKE BALL COURTS', sort_description: 'Constructed with impact-resistant surfaces for superior bounce and stability, our Spike Ball Courts ensure optimal player agility and comfort for thrilling matches!' }
                        ]).map((c, idx) => {
                            const classes = ['white-green', 'green-white'];
                            const cls = classes[idx % 2];
                            return (
                                <div className="col-lg-4 px-0" key={c.id}>
                                    <div className={`product-inner  ${cls}`}>
                                        <h2 className="d-flex align-items-center" style={{ fontSize: "2.5rem" }}>
                                            0{idx + 1}<span className="line-box"></span>
                                        </h2>
                                        <h4 className="text-uppercase" style={{fontSize: "20px" }}>{c.title}</h4>
                                        <p className="two-line">{c.sort_description}</p>
                                        <a className="green-btn border-0 py-3 text-transform-none" href="/products" style={{ textTransform: 'none' }}>Learn more</a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="pt-70 featured-product-home">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 mx-auto text-center">
                            <h2 className="head-color " style={{ fontSize: "2.5rem" }}>Our Featured Products</h2>
                            <p>Crafted with UV-resistant advanced polymer surfaces for optimal traction and energy return technology for superior player comfort, ensuring peak performance in every game! Shop PortaCourts’ product of the week now at an unbeatable price.</p>
                        </div>
                    </div>
                    <div className="row pt-4 m-auto justify-content-center ">
                        {/* Ensure Premium and Standard cards are present */}
                        {(!product.some(p => (p.title || '').toLowerCase().includes('pickleball court') && (p.title || '').toLowerCase().includes('premium'))) && (
                            <div className="col-md-6 col-lg-6 mb-4" key="static-premium">
                                <div className="feature-pro"
                                style={{
                                border: "2px solid white",
                                borderRadius: "0px",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                backgroundColor: "#fff",
                                padding: "15px",
                                margin: "10px",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease"
                                }}
                                >
                                    <div className="product-feature-img product-bg position-relative">
                                        <a href="/product-detail/pickleball-court-premium-with-acrylic-top"><img src="https://www.portacourts.com/storage/images/ZZFA0LxRbGtSVsLxyeiGzhyvUqCVZlMEBKwhli4W.jpg" className="img-fluid product-pic" /></a>
                                        <a className="icon-wish-product addwishlist">
                                            <img src={`${window.location.origin}/webassets/img/unfillwishlist.svg`} className="wishlist-icon" />
                                        </a>
                                    </div>
                                    <div className="ps-4  py-3 pe-3 pe-lg-0 py-lg-0 feat_col_home">
                                        <h3 className="mb-2 fw-400 one-line text-capitalize text-black"><a href="/product-detail/pickleball-court-premium-with-acrylic-top" className="text-black">Pickleball Court – Premium (with Acrylic Top)</a></h3>
                                        <p className="f14 lh-base my-4 two-line">Specifically engineered for professionals, PortaCourts presents Pickleball Court Pro for&nbsp;pro-players.&nbsp;Take your pickleball experience to the next level with our Pickleball Court Pro surface – built for unmatched grip, durability, and pro-level bounce. Designed for players who demand performance similar to top-tier tournaments like the PPA Tour, this surface offers the ultimate combination of comfort, stability, and safety.Whether you’re building a community court, upgrading a private space, or setting up for events, Pickleball Court Pro delivers a premium playing experience indoors or outdoors.Key FeaturesProfessional-Grade Surface: Made from durable acrylic roll mats with nano-granule texture for superior grip and wear resistance.Multi-Surface Compatibility: Installs over concrete, asphalt, wood, or any flat base.Flexible Installation:&nbsp; &nbsp; &nbsp; &nbsp; Temporary: Use single or double-sided tape.&nbsp; &nbsp; &nbsp; &nbsp; Permanent: Use glue for a long-lasting setup.Player-Safe Design: Special HIMOP coating offers high grip while protecting knees and joints during intense play.All-Weather Ready: Perfect for both indoor and outdoor courts – rain or shine.SpecificationsMaterial Thickness: 3.0 mmCore Layers: 2mm PVC + Fiberglass underlaymentTop Coat: Soft acrylic with HIMOP coating for grip and bounceWarranty: 3 YearsColor Options: Grey, Light Blue, Dark Blue, Green – or customize to match your brandWeight: Each roll approx. 270 lbs – easy to transport and installCourt Sizes AvailableCourt Pro Max: 24 ft × 50 ftCourt Pro Tour: 30 ft × 60 ftCourt Pro Tour Max: 36 ft × 60 ftCustom Sizes: Available on requestWhy Choose Pickleball Court Pro?As pickleball continues to grow in popularity across the U.S., players are seeking more professional-grade gear and surfaces. Pickleball Court Pro meets that demand with a surface trusted by serious athletes – combining high-end performance with fast, flexible installation.</p>
                                        <p className="mb-1"> <span className="primary-theme price-offer">$8820.00</span><span className="price-old ms-2">$9800.00</span></p>
                                        <div className="d-flex align-items-center gap-1 mb-4">
                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                        </div>
                                        <a className=" green-btn py-3" href="/product-detail/pickleball-court-premium-with-acrylic-top">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none">
                                                <path d="M16.2251 12.1335H7.64816C7.06827 12.1332 6.50637 11.9322 6.0579 11.5645C5.60944 11.1969 5.30207 10.6854 5.18803 10.1168L3.49773 1.67373H0.836779C0.614851 1.67373 0.402013 1.58557 0.245087 1.42864C0.0881603 1.27171 0 1.05888 0 0.836949C0 0.615021 0.0881603 0.402184 0.245087 0.245257C0.402013 0.0883307 0.614851 0.000170233 0.836779 0.000170233H4.18389C4.37965 -0.00377763 4.5706 0.0610485 4.7235 0.183364C4.87639 0.30568 4.98155 0.47774 5.02067 0.669593L6.82811 9.79048C6.86723 9.98233 6.97239 10.1544 7.12529 10.2767C7.27818 10.399 7.46913 10.4638 7.66489 10.4599H16.2251C16.4197 10.4642 16.6097 10.4006 16.7625 10.2799C16.9152 10.1593 17.0211 9.98915 17.0619 9.79885L18.4091 3.52301C18.4357 3.39943 18.4339 3.27144 18.404 3.14865C18.374 3.02585 18.3166 2.91144 18.2361 2.81401C18.1555 2.71658 18.054 2.63865 17.939 2.58609C17.8241 2.53352 17.6987 2.50768 17.5724 2.51051H16.7356C16.5136 2.51051 16.3008 2.42235 16.1439 2.26542C15.987 2.10849 15.8988 1.89565 15.8988 1.67373C15.8988 1.4518 15.987 1.23896 16.1439 1.08204C16.3008 0.925109 16.5136 0.836949 16.7356 0.836949H17.5724C17.9523 0.828177 18.3293 0.905804 18.675 1.06397C19.0206 1.22214 19.3257 1.45673 19.5675 1.75003C19.8092 2.04334 19.9812 2.3877 20.0704 2.75716C20.1597 3.12661 20.1639 3.51151 20.0827 3.88282L18.7187 10.1587C18.5951 10.7252 18.2792 11.2314 17.8246 11.5914C17.3701 11.9514 16.8049 12.1429 16.2251 12.1335Z" fill="white" />
                                                <path d="M14.2246 5.8591H9.20397C8.98204 5.8591 8.7692 5.77094 8.61227 5.61402C8.45535 5.45709 8.36719 5.24425 8.36719 5.02233C8.36719 4.8004 8.45535 4.58756 8.61227 4.43063C8.7692 4.27371 8.98204 4.18555 9.20397 4.18555H14.2246C14.4466 4.18555 14.6594 4.27371 14.8163 4.43063C14.9733 4.58756 15.0614 4.8004 15.0614 5.02233C15.0614 5.24425 14.9733 5.45709 14.8163 5.61402C14.6594 5.77094 14.4466 5.8591 14.2246 5.8591Z" fill="white" />
                                                <path d="M11.7157 8.36806C11.4938 8.36806 11.2809 8.2799 11.124 8.12297C10.9671 7.96604 10.8789 7.75321 10.8789 7.53128V2.51061C10.8789 2.28868 10.9671 2.07584 11.124 1.91892C11.2809 1.76199 11.4938 1.67383 11.7157 1.67383C11.9376 1.67383 12.1505 1.76199 12.3074 1.91892C12.4643 2.07584 12.5525 2.28868 12.5525 2.51061V7.53128C12.5525 7.75321 12.4643 7.96604 12.3074 8.12297C12.1505 8.2799 11.9376 8.36806 11.7157 8.36806Z" fill="white" />
                                            </svg>
                                            Add to Cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {(!product.some(p => (p.title || '').toLowerCase().includes('pickleball court') && (p.title || '').toLowerCase().includes('standard'))) && (
                            <div className="col-md-6 col-lg-6 mb-4" key="static-standard">
                                <div className="feature-pro"
                                style={{
                                    border: "2px solid white",
                                    borderRadius: "0px",
                                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                    backgroundColor: "#fff",
                                    padding: "15px",
                                    margin: "10px",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease"
                                }}
                                >
                                    <div className="product-feature-img product-bg position-relative">
                                        <a href="/product-detail/pickleball-court-standard-court"><img src="https://www.portacourts.com/storage/images/LAJbtgX3kexrZLI8fp7yUfQrdPqRf4VLyUdVefD6.jpg" className="img-fluid product-pic" /></a>
                                        <a className="icon-wish-product addwishlist">
                                            <img src={`${window.location.origin}/webassets/img/unfillwishlist.svg`} className="wishlist-icon" />
                                        </a>
                                    </div>
                                    <div className="ps-4  py-3 pe-3 pe-lg-0 py-lg-0 feat_col_home">
                                        <h3 className="mb-2 fw-400 one-line text-capitalize text-black"><a href="/product-detail/pickleball-court-standard-court" className="text-black">Pickleball Court – Standard Court</a></h3>
                                        <p className="f14 lh-base my-4 two-line">Transform your backyard or recreational space into a top-notch recreational/sports area with Premium PickleBall courts by Portacourts. Our courts are designed for both athletes and casual players. We offer unmatched durability, and high-quality surface pickleball courts with non-slip coatings to our customers. We serve globally and our main motive is providing the best quality products and services.Pickleball Court Dimensions and Size:We have different sizes of portable pickleball courts, which are distinguished on the basis of length and width in (Ft)&nbsp; and thickness of courts in (mm).Court SizeDimensions (Ft)Thickness (mm)Small Court21 ft x 45 ft2.5 mm&nbsp;Medium Court24 ft x 50 ft2.5 mmLarge Court26 ft x 50 ft2.5 mmExtra Large Court28 ft x 60 ft2.5 mmProfessional Court30 ft x 60 ft2.5 mmPremium Court36 ft x 60 ft2.5 mmFeatures of Premium Portable Pickleball CourtHigh-Quality Surface Material: Our portable court is crafted with the finest sports-grade materials, providing optimal traction and bounce. The smooth surface ensures precise ball control, minimizing the risk of injury and enhancing your gameplay.&nbsp;Customizable Design: We offer customization options including specific colors, lines, and patterns, allowing you to reflect your style. Choose from a wide range of designs to make your pickleball court truly unique. Our experts work with 100% accuracy to meet your visionary pickleball court.Easy Installation: Our premium pickleball courts are modular and come with an easy-to-install system. Within a short timeframe, you’ll have a professional-grade court ready for play without extensive groundwork.&nbsp;Non-Slip Surface: Safety is our priority, which is why we use non-slip coatings that provide excellent grip, even during fast-paced games even when it's rainy outside.UV Protection: The surface is coated with UV-resistant layers, ensuring that the colors and quality of your court remain vibrant and intact for years to come.&nbsp;Portable &amp; Scalable: Our premium design allows for easy portability and scalability, whether you want a single court or a larger play area.Technical Specifications of Pickleball CourtWhat makes Portacourts PickleBall Court stand out globally is its technical specification:Technical TermSpecificationMaterial100% raw NBR rubber mixed PVC materialLocationOutdoor and Indoor Pickleball courtsSize30 ft x 60 ft, 26 ft x 60 ft, 24 ft x 50 ft, 20 ft x 44 ftWeight3.5 kg for 2.5 mm, 4.0 kg for 3.0 mmColorAny color design can be printed, never color fades Using Life6-8 yearsFlammabilityB1Temperature Range-40°C to ~80°CUsagePickleball sports courtsThickness2.5 mm / 3.0 mmShock Absorption20% - 75%Vertical Deformation≤1.1 mmPickleball Rebound Rate≥90%Friction Coefficient80 - 100Wear Resistance≤350 mgImpact Resistance≥8N/mSurface TreatmentUV / PUR treatmentSound Insulation≥4 dBSlip ResistanceR9Indentation Resistance≤0.50 mmResidual Indentation0.04 mmDimensional Stability≤0.04%Thermal Resistance≤0.17 m²K/WToxic and Harmful Substances TestNoRecycleYesIncluded in the PackageWe work for customer satisfaction and with years of research and manufacturing processes, Portacourts comes with this top-tier PickleBall Court. With the ordering of the product, you will get the following items, which are included in the package:What's IncludedQuantityDetailsPickleball Court Roll1Professional grade, Durable, long-lasting pickleball court.Pickleball Net1Adjustable and high-quality fabric pickleball net.Pickleball Paddles4Durable paddles designed for optimal control.Pickleballs20Premium pickleballs for the consistent bounce.Why Choose Only Portacourts Premium Pickleball Court?Unmatched Durability: Engineered to last, this court offers long-term value with minimal maintenance required.&nbsp;Professional Standards: We adhere to official pickleball court dimensions and regulations, so you can enjoy the same quality that professionals do.&nbsp;Aesthetic Appeal: Enhance your outdoor space with a visually stunning court that complements your property’s overall design.&nbsp;Versatility: Our court is great for residential homes, schools, clubs, or commercial spaces, suiting all environments.24/7 Customer Support: When selecting a pickleball court, we believe that excellent customer service is just as crucial as product quality. That's why our team provides 24/7 customer support, ensuring that you can contact us anytime, day or night. Whether you have questions about installation, or product details, or need maintenance assistance, we're always just a call or message away.</p>
                                        <p className="mb-1"> <span className="primary-theme price-offer">$6570.00</span><span className="price-old ms-2">$7300.00</span></p>
                                        <div className="d-flex align-items-center gap-1 mb-4">
                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i>
                                        </div>
                                        <a className=" green-btn py-3" href="/product-detail/pickleball-court-standard-court">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none">
                                                <path d="M16.2251 12.1335H7.64816C7.06827 12.1332 6.50637 11.9322 6.0579 11.5645C5.60944 11.1969 5.30207 10.6854 5.18803 10.1168L3.49773 1.67373H0.836779C0.614851 1.67373 0.402013 1.58557 0.245087 1.42864C0.0881603 1.27171 0 1.05888 0 0.836949C0 0.615021 0.0881603 0.402184 0.245087 0.245257C0.402013 0.0883307 0.614851 0.000170233 0.836779 0.000170233H4.18389C4.37965 -0.00377763 4.5706 0.0610485 4.7235 0.183364C4.87639 0.30568 4.98155 0.47774 5.02067 0.669593L6.82811 9.79048C6.86723 9.98233 6.97239 10.1544 7.12529 10.2767C7.27818 10.399 7.46913 10.4638 7.66489 10.4599H16.2251C16.4197 10.4642 16.6097 10.4006 16.7625 10.2799C16.9152 10.1593 17.0211 9.98915 17.0619 9.79885L18.4091 3.52301C18.4357 3.39943 18.4339 3.27144 18.404 3.14865C18.374 3.02585 18.3166 2.91144 18.2361 2.81401C18.1555 2.71658 18.054 2.63865 17.939 2.58609C17.8241 2.53352 17.6987 2.50768 17.5724 2.51051H16.7356C16.5136 2.51051 16.3008 2.42235 16.1439 2.26542C15.987 2.10849 15.8988 1.89565 15.8988 1.67373C15.8988 1.4518 15.987 1.23896 16.1439 1.08204C16.3008 0.925109 16.5136 0.836949 16.7356 0.836949H17.5724C17.9523 0.828177 18.3293 0.905804 18.675 1.06397C19.0206 1.22214 19.3257 1.45673 19.5675 1.75003C19.8092 2.04334 19.9812 2.3877 20.0704 2.75716C20.1597 3.12661 20.1639 3.51151 20.0827 3.88282L18.7187 10.1587C18.5951 10.7252 18.2792 11.2314 17.8246 11.5914C17.3701 11.9514 16.8049 12.1429 16.2251 12.1335Z" fill="white" />
                                                <path d="M14.2246 5.8591H9.20397C8.98204 5.8591 8.7692 5.77094 8.61227 5.61402C8.45535 5.45709 8.36719 5.24425 8.36719 5.02233C8.36719 4.8004 8.45535 4.58756 8.61227 4.43063C8.7692 4.27371 8.98204 4.18555 9.20397 4.18555H14.2246C14.4466 4.18555 14.6594 4.27371 14.8163 4.43063C14.9733 4.58756 15.0614 4.8004 15.0614 5.02233C15.0614 5.24425 14.9733 5.45709 14.8163 5.61402C14.6594 5.77094 14.4466 5.8591 14.2246 5.8591Z" fill="white" />
                                                <path d="M11.7157 8.36806C11.4938 8.36806 11.2809 8.2799 11.124 8.12297C10.9671 7.96604 10.8789 7.75321 10.8789 7.53128V2.51061C10.8789 2.28868 10.9671 2.07584 11.124 1.91892C11.2809 1.76199 11.4938 1.67383 11.7157 1.67383C11.9376 1.67383 12.1505 1.76199 12.3074 1.91892C12.4643 2.07584 12.5525 2.28868 12.5525 2.51061V7.53128C12.5525 7.75321 12.4643 7.96604 12.3074 8.12297C12.1505 8.2799 11.9376 8.36806 11.7157 8.36806Z" fill="white" />
                                            </svg>
                                            Add to Cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {product.map(p => {
                            const variant = (p.variants && p.variants[0]) || {};
                            const image = (p.product_images && p.product_images[0]) || {};
                            return (
                                <div className="col-md-6 col-lg-6 mb-4" key={p.id}>
                                    <div className="feature-pro">
                                        <div className="product-feature-img product-bg position-relative">
                                            <a href={`/product-detail/${p.slug}`}><img src={`/storage/${image.image_url}`} className="img-fluid product-pic" /></a>
                                            <a className="icon-wish-product addwishlist" data-product-id={p.id} data-in-wishlist={p.in_wishlist ? '1' : ''}>
                                                <img src={`${window.location.origin}${p.in_wishlist ? '/webassets/img/green-wishlist-bg.svg' : '/webassets/img/unfillwishlist.svg'}`} className="wishlist-icon" />
                                            </a>
                                        </div>

                                        <div className="px-3 py-4">
                                            <a href={`/product-detail/${p.slug}`} className="text-black">
                                                <h3 className="text-capitalize mb-2 fw-400 one-line">{p.title}</h3>
                                            </a>
                                            <p className="f14 lh-base my-4 two-line">{(p.description || '').replace(/<[^>]*>?/gm, '')}</p>
                                            <p className="mb-1"> <span className="primary-theme price-offer">${variant.discounted_price || ''}.00</span><span className="price-old ms-2">${variant.price || ''}.00</span></p>
                                            <div className="d-flex align-items-center gap-1 mb-4">
                                                {Array.from({ length: Math.floor(p.average_rating || 0) }).map((_, i) => (
                                                    <i className="fa fa-star" aria-hidden="true" key={`fs-${p.id}-${i}`}></i>
                                                ))}
                                                {((p.average_rating || 0) - Math.floor(p.average_rating || 0)) >= 0.5 && (
                                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                )}
                                                {Array.from({ length: 5 - Math.ceil(p.average_rating || 0) }).map((_, i) => (
                                                    <i className="fa fa-star-o" aria-hidden="true" key={`es-${p.id}-${i}`}></i>
                                                ))}
                                            </div>
                                            <a className="green-btn py-3" href={`/product-detail/${p.slug}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none">
                                                    <path d="M16.2251 12.1335H7.64816C7.06827 12.1332 6.50637 11.9322 6.0579 11.5645C5.60944 11.1969 5.30207 10.6854 5.18803 10.1168L3.49773 1.67373H0.836779C0.614851 1.67373 0.402013 1.58557 0.245087 1.42864C0.0881603 1.27171 0 1.05888 0 0.836949C0 0.615021 0.0881603 0.402184 0.245087 0.245257C0.402013 0.0883307 0.614851 0.000170233 0.836779 0.000170233H4.18389C4.37965 -0.00377763 4.5706 0.0610485 4.7235 0.183364C4.87639 0.30568 4.98155 0.47774 5.02067 0.669593L6.82811 9.79048C6.86723 9.98233 6.97239 10.1544 7.12529 10.2767C7.27818 10.399 7.46913 10.4638 7.66489 10.4599H16.2251C16.4197 10.4642 16.6097 10.4006 16.7625 10.2799C16.9152 10.1593 17.0211 9.98915 17.0619 9.79885L18.4091 3.52301C18.4357 3.39943 18.4339 3.27144 18.404 3.14865C18.374 3.02585 18.3166 2.91144 18.2361 2.81401C18.1555 2.71658 18.054 2.63865 17.939 2.58609C17.8241 2.53352 17.6987 2.50768 17.5724 2.51051H16.7356C16.5136 2.51051 16.3008 2.42235 16.1439 2.26542C15.987 2.10849 15.8988 1.89565 15.8988 1.67373C15.8988 1.4518 15.987 1.23896 16.1439 1.08204C16.3008 0.925109 16.5136 0.836949 16.7356 0.836949H17.5724C17.9523 0.828177 18.3293 0.905804 18.675 1.06397C19.0206 1.22214 19.3257 1.45673 19.5675 1.75003C19.8092 2.04334 19.9812 2.3877 20.0704 2.75716C20.1597 3.12661 20.1639 3.51151 20.0827 3.88282L18.7187 10.1587C18.5951 10.7252 18.2792 11.2314 17.8246 11.5914C17.3701 11.9514 16.8049 12.1429 16.2251 12.1335Z" fill="white" />
                                                    <path d="M14.2246 5.8591H9.20397C8.98204 5.8591 8.7692 5.77094 8.61227 5.61402C8.45535 5.45709 8.36719 5.24425 8.36719 5.02233C8.36719 4.8004 8.45535 4.58756 8.61227 4.43063C8.7692 4.27371 8.98204 4.18555 9.20397 4.18555H14.2246C14.4466 4.18555 14.6594 4.27371 14.8163 4.43063C14.9733 4.58756 15.0614 4.8004 15.0614 5.02233C15.0614 5.24425 14.9733 5.45709 14.8163 5.61402C14.6594 5.77094 14.4466 5.8591 14.2246 5.8591Z" fill="white" />
                                                    <path d="M11.7157 8.36806C11.4938 8.36806 11.2809 8.2799 11.124 8.12297C10.9671 7.96604 10.8789 7.75321 10.8789 7.53128V2.51061C10.8789 2.28868 10.9671 2.07584 11.124 1.91892C11.2809 1.76199 11.4938 1.67383 11.7157 1.67383C11.9376 1.67383 12.1505 1.76199 12.3074 1.91892C12.4643 2.07584 12.5525 2.28868 12.5525 2.51061V7.53128C12.5525 7.75321 12.4643 7.96604 12.3074 8.12297C12.1505 8.2799 11.9376 8.36806 11.7157 8.36806Z" fill="white" />
                                                </svg>
                                                Add to Cart
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Extra two cards right after Featured Products */}
            <section className="pt-2 featured-product-home">
                <div className="container">
                    {(() => {
                        const premium = product.find(p => (p.title || '').toLowerCase().includes('pickleball court') && (p.title || '').toLowerCase().includes('premium'));
                        const standard = product.find(p => (p.title || '').toLowerCase().includes('pickleball court') && (p.title || '').toLowerCase().includes('standard'));
                        const selected = [premium, standard].filter(Boolean);
                        const fallback = selected.length < 2 ? product.slice(0, 2 - selected.length) : [];
                        const cards = [...selected, ...fallback].slice(0, 2);
                        if (cards.length === 0) return null;
                        return (
                            <div className="row pt-4 m-auto justify-content-center ">
                                {cards.map(p => {
                                    const variant = (p.variants && p.variants[0]) || {};
                                    const image = (p.product_images && p.product_images[0]) || {};
                                    return (
                                        <div className="col-md-6 col-lg-6 mb-4" key={`extra-${p.id}`}>
                                            <div className="feature-pro">
                                                <div className="product-feature-img product-bg position-relative ">
                                                    <a href={`/product-detail/${p.slug}`}><img src={`/storage/${image.image_url}`} className="img-fluid product-pic" /></a>
                                                    <a className="icon-wish-product addwishlist" data-product-id={p.id} data-in-wishlist={p.in_wishlist ? '1' : ''}>
                                                        <img src={`${window.location.origin}${p.in_wishlist ? '/webassets/img/green-wishlist-bg.svg' : '/webassets/img/unfillwishlist.svg'}`} className="wishlist-icon" />
                                                    </a>
                                                </div>
                                                <div className="px-3 py-4">
                                                    <a href={`/product-detail/${p.slug}`} className="text-black">
                                                        <h3 className="text-capitalize one-line" style={{ fontSize: "0rem" }}>{p.title}</h3>
                                                    </a>
                                                    <p className="f14 lh-base my-4 two-line">{(p.description || '').replace(/<[^>]*>?/gm, '')}</p>
                                                    <p className="mb-1"> <span className="primary-theme price-offer">${variant.discounted_price || ''}.00</span><span className="price-old ms-2">${variant.price || ''}.00</span></p>
                                                    <div className="d-flex align-items-center gap-1 mb-4">
                                                        {Array.from({ length: Math.floor(p.average_rating || 0) }).map((_, i) => (
                                                            <i className="fa fa-star" aria-hidden="true" key={`efs-${p.id}-${i}`}></i>
                                                        ))}
                                                        {((p.average_rating || 0) - Math.floor(p.average_rating || 0)) >= 0.5 && (
                                                            <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                        )}
                                                        {Array.from({ length: 5 - Math.ceil(p.average_rating || 0) }).map((_, i) => (
                                                            <i className="fa fa-star-o" aria-hidden="true" key={`ees-${p.id}-${i}`}></i>
                                                        ))}
                                                    </div>
                                                    <a className="green-btn py-3" href={`/product-detail/${p.slug}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none">
                                                            <path d="M16.2251 12.1335H7.64816C7.06827 12.1332 6.50637 11.9322 6.0579 11.5645C5.60944 11.1969 5.30207 10.6854 5.18803 10.1168L3.49773 1.67373H0.836779C0.614851 1.67373 0.402013 1.58557 0.245087 1.42864C0.0881603 1.27171 0 1.05888 0 0.836949C0 0.615021 0.0881603 0.402184 0.245087 0.245257C0.402013 0.0883307 0.614851 0.000170233 0.836779 0.000170233H4.18389C4.37965 -0.00377763 4.5706 0.0610485 4.7235 0.183364C4.87639 0.30568 4.98155 0.47774 5.02067 0.669593L6.82811 9.79048C6.86723 9.98233 6.97239 10.1544 7.12529 10.2767C7.27818 10.399 7.46913 10.4638 7.66489 10.4599H16.2251C16.4197 10.4642 16.6097 10.4006 16.7625 10.2799C16.9152 10.1593 17.0211 9.98915 17.0619 9.79885L18.4091 3.52301C18.4357 3.39943 18.4339 3.27144 18.404 3.14865C18.374 3.02585 18.3166 2.91144 18.2361 2.81401C18.1555 2.71658 18.054 2.63865 17.939 2.58609C17.8241 2.53352 17.6987 2.50768 17.5724 2.51051H16.7356C16.5136 2.51051 16.3008 2.42235 16.1439 2.26542C15.987 2.10849 15.8988 1.89565 15.8988 1.67373C15.8988 1.4518 15.987 1.23896 16.1439 1.08204C16.3008 0.925109 16.5136 0.836949 16.7356 0.836949H17.5724C17.9523 0.828177 18.3293 0.905804 18.675 1.06397C19.0206 1.22214 19.3257 1.45673 19.5675 1.75003C19.8092 2.04334 19.9812 2.3877 20.0704 2.75716C20.1597 3.12661 20.1639 3.51151 20.0827 3.88282L18.7187 10.1587C18.5951 10.7252 18.2792 11.2314 17.8246 11.5914C17.3701 11.9514 16.8049 12.1429 16.2251 12.1335Z" fill="white" />
                                                            <path d="M14.2246 5.8591H9.20397C8.98204 5.8591 8.7692 5.77094 8.61227 5.61402C8.45535 5.45709 8.36719 5.24425 8.36719 5.02233C8.36719 4.8004 8.45535 4.58756 8.61227 4.43063C8.7692 4.27371 8.98204 4.18555 9.20397 4.18555H14.2246C14.4466 4.18555 14.6594 4.27371 14.8163 4.43063C14.9733 4.58756 15.0614 4.8004 15.0614 5.02233C15.0614 5.24425 14.9733 5.45709 14.8163 5.61402C14.6594 5.77094 14.4466 5.8591 14.2246 5.8591Z" fill="white" />
                                                            <path d="M11.7157 8.36806C11.4938 8.36806 11.2809 8.2799 11.124 8.12297C10.9671 7.96604 10.8789 7.75321 10.8789 7.53128V2.51061C10.8789 2.28868 10.9671 2.07584 11.124 1.91892C11.2809 1.76199 11.4938 1.67383 11.7157 1.67383C11.9376 1.67383 12.1505 1.76199 12.3074 1.91892C12.4643 2.07584 12.5525 2.28868 12.5525 2.51061V7.53128C12.5525 7.75321 12.4643 7.96604 12.3074 8.12297C12.1505 8.2799 11.9376 8.36806 11.7157 8.36806Z" fill="white" />
                                                        </svg>
                                                        Add to Cart
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })()}
                </div>
            </section>

            {/* Exclusive Benefits */}
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-9 mx-auto text-center">
                            <div className="text-center">
                                <h2 className="head-color " style={{fontSize: "2.5rem" }}>Exclusive Benefits Only At PortaCourts</h2>
                                <p>You love sports, and we love you! That’s why we offer 20% off all courts, free shipping across the continental US, personalized designs, dedicated maintenance support, and a seamless online shopping experience—all attuned just for you!</p>
                            </div>
                        </div>
                        <div className="col-12 col-lg-10 mx-auto pt-4">
                            <div className="row">
                                <div className="col-md-6 mb-4 ">
                                    <div className="enjoy-inner-box h-100 border border-white shadow-lg">
                                        <div className="number-enjoy">
                                            <h4 className="mb-0" style={{ fontSize: "1.25rem" }}>01</h4>
                                        </div>
                                        <div className="">
                                            {/* */}
                                            <h5 className="fw-500 blue-text "  style={{fontSize: "1.5rem" }}>Custom Designs</h5>
                                            <p className="mb-0 blue-text fw-400">Turn ordinary courts into stunning showpieces with your own design & color selection.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="enjoy-inner-box h-100 shadow-lg">
                                        <div className="number-enjoy">
                                            <h4 className="mb-0" style={{ fontSize: "1.25rem" }}>02</h4>
                                        </div>
                                        <div className="">
                                            <h5 className="blue-text fw-500" style={{fontSize: "1.5rem" }}>Warranty & Satisfaction Guarantee</h5>
                                            <p className="mb-0 blue-text fw-400">Your Satisfaction is our Guarantee. Comprehensive warranty options so that you can buy with confidence.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="enjoy-inner-box h-100 border border-white shadow-lg">
                                        <div className="number-enjoy">
                                            <h4 className="mb-0" style={{ fontSize: "1.25rem" }}>03</h4>
                                        </div>
                                        <div className="">
                                            <h5 className="blue-text fw-500" style={{fontSize: "1.5rem" }}>Dedicated Maintenance Support</h5>
                                            <p className="mb-0 blue-text fw-400">When it comes to game-time, your focus should be on the game. Leave every other factor to us. We're just one call away!</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="enjoy-inner-box h-100 shadow-lg">
                                        <div className="number-enjoy">
                                            <h4 className="mb-0" style={{ fontSize: "1.25rem" }}>04</h4>
                                        </div>
                                        <div className="">
                                            <h5 className="blue-text fw-500" style={{fontSize: "1.5rem" }}>Deals & Discounts</h5>
                                            <p className="mb-0 blue-text fw-400">Double the fun with 20% off on your favorite Pickleball and Spike Ball Courts.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* About Us */}
            <section className="aboutus-wrapper">
                <div className="container-fluid px-0">
                    <div className="row g-0">
                        <div className="col-lg-7 abouts-inner-text text-white position-relative" style={{ border: "white"}}>
                            
                            <h2 className="primary-theme mb-4" style={{ marginLeft: "135px", fontSize: "2.5rem" }}>About Us</h2>
                            <p className="text-white mb-5" style={{ marginLeft: "135px", paddingRight: "70px" }}>
                                Welcome to PortaCourts, where innovation and quality meet to provide you with the best sports flooring solutions. Our courts are designed with a professional surface grain that ensures anti-skid safety, allowing for free and dynamic movement on the court. Tailored specifically for pickleball, our floors meet the required friction coefficient standards, ensuring both performance and safety.
                                At PortaCourts, we pride ourselves on using a leading process that guarantees lasting beauty. Our design layer is integrated within the board to prevent wear and maintain its original color and elegance over time, offering you a maintenance-free, cost-effective solution.
                            </p>

                            <a className="green-btn border-0  py-3" href="/about-us" style={{ marginLeft: "135px" }}>Read More</a>
                        </div>
                        <div className="col-lg-5 abouts-inner-img px-0">
                            <img src={`${window.location.origin}/webassets/img/abouts-home.png`} className="img-fluid h-100 w-100" alt="About Us" />
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="aboutus-wrapper">
      <div className="container-fluid px-0">
        <div className="row g-0">
          <div className=" col-lg-7 abouts-inner-text text-white position-relative">
            <h2 className="primary-theme mb-4 ">About Us</h2>
            <p className="text-white mb-5 ">
              Welcome to PortaCourts, where innovation and quality meet to provide
              you with the best sports flooring solutions. Our courts are designed
              with a professional surface grain that ensures anti-skid safety,
              allowing for free and dynamic movement on the court. Tailored
              specifically for pickleball, our floors meet the required friction
              coefficient standards, ensuring both performance and safety. At
              PortaCourts, we pride ourselves on using a leading process that
              guarantees lasting beauty. Our design layer is integrated within the
              board to prevent wear and maintain its original color and elegance
              over time, offering you a maintenance-free, cost-effective solution.
            </p>

            <a className="green-btn border-0 py-3" href="/about-us">
              Read More
            </a>
          </div>
          <div className="col-lg-5 abouts-inner-img px-0">
            <img
              src={`${window.location.origin}/webassets/img/abouts-home.png`}
              className="img-fluid h-100 w-100"
              alt="About Us"
            />
          </div>
        </div>
      </div>
    </section> */}
    
            

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

            {/* CEO Section (removed; using carousel version) */}

            {/* Shipping highlights */}
            <section className="bgdark-grey py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                            <div className="shipping-inner">
                                <img src={`${window.location.origin}/webassets/img/shipping.svg`} />
                                <div className="">
                                    <h4 className="fw-500 text-white" style={{ fontSize: "1.25rem"}}>FREE SHIPPING</h4>
                                    <p className="f18 mb-0 text-white">Free shipping within the continental US.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                            <div className="shipping-inner">
                                <img src={`${window.location.origin}/webassets/img/return.svg`} />
                                <div className="">
                                    <h4 className="fw-500 text-white" style={{ fontSize: "1.25rem"}}>ESTIMATED PRODUCTION</h4>
                                    <p className="f18 mb-0 text-white">7 - 10 Days</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                            <div className="shipping-inner">
                                <img src={`${window.location.origin}/webassets/img/return.svg`} />
                                <div className="">
                                    <h4 className="fw-500 text-white" style={{ fontSize: "1.25rem"}}>ESTIMATED SHIPPING TIME</h4>
                                    <p className="f18 mb-0 text-white">35 - 45 Days</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                            <div className="shipping-inner">
                                <img src={`${window.location.origin}/webassets/img/secure.svg`} />
                                <div className="">
                                    <h4 className="fw-500 text-white" style={{ fontSize: "1.25rem"}}>SECURE PAYMENT</h4>
                                    <p className="f18 mb-0 text-white">100% Secure Payment </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3" >
                        <div className="col-12 text-center">
                            <h4 className="text-white mb-0" style={{ fontSize: "1.25rem"}}>Costs might vary outside the continental US.</h4>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog */}
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-10 mx-auto">
                            <div className="text-center">
                                <h2 className="head-color " style={{ fontSize: "2.5rem"}}>Stay Tuned for Updates</h2>
                                <p>Don’t miss out on the latest news, innovations, and exclusive offers from PortaCourts. Stay tuned for updates and be the first to know about our new products and exciting developments! </p>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-3">
                        {/* Static blog cards (always visible) */}
                        <div className="col-lg-4 pb-5 pb-lg-0">
                            <div className="stay-blog shadow-lg">
                                <div className="blog-img ">
                                    <img src="https://www.portacourts.com/storage/images/NJ1arMgWpEVJRmNg7qWFQ8xZXvpsKrqrA0F5JLFy.webp" className="img-fluid" />
                                </div>
                                <div className="stay-blog-details bg-white">
                                    <div className="inner-blog-detail ">
                                        <p className="f18 fw-400 mb-1 d-flex align-items-center gap-2"><img src={`${window.location.origin}/webassets/img/calender.svg`} />May 31, 2025</p>
                                        <h4 className="one-line textcolor" style={{ fontSize: "1.25rem"}}>How to Turn Your Driveway into a Portable Pickleball Court</h4>
                                        <span className=" four-line mb-4 padding-blog " dangerouslySetInnerHTML={{ __html: `<p><b>Transforming your driveway into a portable pickleball court</b> for driveway games is easier than you might think. Whether you’re hosting weekend matches with friends, practicing your dink shots solo, or laying the foundation for a neighborhood pickleball league, a temporary <b><a href=\"https://www.portacourts.com/product-detail/premium-pickleball-court\">pickleball court setup</a></b> turns ordinary concrete into an action-packed arena. In this guide, we’ll  read no surface-level advice here into each step, tool, and technique you need to build a reliable, safe, and hack-proof portable court.</p>` }} />
                                        <Link className="black-btn " to="/blogs/15">Read More</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 pb-5 pb-lg-0">
                            <div className="stay-blog">
                                <div className="blog-img ">
                                    <img src="https://www.portacourts.com/storage/images/HHsz6ZgYbKFBVZ2b7Ca9OxN84QjdxQLJE942snKf.webp" className="img-fluid" />
                                </div>
                                <div className="stay-blog-details bg-white shadow-lg">
                                    <div className="inner-blog-detail ">
                                        <p className="f18 fw-400 mb-1 d-flex align-items-center gap-2"><img src={`${window.location.origin}/webassets/img/calender.svg`} />May 28, 2025</p>
                                        <h4 className="one-line textcolor" style={{ fontSize: "1.25rem"}}>Portable vs Permanent Pickleball Courts: Which One to Choose?</h4>
                                        <span className=" four-line mb-4 padding-blog " dangerouslySetInnerHTML={{ __html: `<p>When it comes to bringing pickleball to your home, community center, or recreational facility, one of the first and biggest decisions you’ll face is whether to invest in a <b>portable vs permanent pickleball court</b>. Both options have their unique advantages, drawbacks, and technical considerations. In this in-depth guide, we’ll dive deep into the terminology, installation processes, performance characteristics, and cost implications of both permanent and <b><a href=\"https://www.portacourts.com/product-detail/premium-pickleball-court\">portable pickleball courts</a></b>. By the end, you’ll be armed with the industry-specific insights you need to make an informed decision.</p>` }} />
                                        <Link className="black-btn " to="/blogs/10">Read More</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 pb-5 pb-lg-0">
                            <div className="stay-blog">
                                <div className="blog-img ">
                                    <img src="https://www.portacourts.com/storage/images/KVg1BcM1feJYsTMxg25qMmuIezcXMDk4iHgpkDJL.webp" className="img-fluid" />
                                </div>
                                <div className="stay-blog-details bg-white shadow-lg">
                                    <div className="inner-blog-detail ">
                                        <p className="f18 fw-400 mb-1 d-flex align-items-center gap-2"><img src={`${window.location.origin}/webassets/img/calender.svg`} />May 26, 2025</p>
                                        <h4 className="one-line textcolor" style={{ fontSize: "1.25rem"}}>How to Set Up a Portable Pickleball Court in 20 Minutes</h4>
                                        <span className=" four-line mb-4 padding-blog " dangerouslySetInnerHTML={{ __html: `<ul><li><span style=\"font-size: 1rem;\">If you're a pickleball enthusiast who's always on the move or simply short of space, a <b><a href=\"https://www.portacourts.com/product-detail/premium-pickleball-court\">DIY portable pickleball court</a></b> could be the ultimate game-changer. Whether you're at a local park, driveway, or gymnasium, being able to set up a fully functional court in under 20 minutes means more play, less prep. In this in-depth guide, we'll break down everything you need to know: from selecting the <b>best portable pickleball net</b>, laying out accurate <b>pickleball boundary lines portable</b> options, to choosing from top-rated <b>portable pickleball court kits</b>.</span></li></ul>` }} />
                                        <Link className="black-btn " to="/blogs/15">Read More</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {post.filter(b => ![
                            'how-to-set-up-a-portable-pickleball-court-in-20-minutes',
                            'portable-vs-permanent-pickleball-courts', 
                            'how-to-turn-your-driveway-into-a-portable-pickleball-court'
                        ].includes(b.slug)).map(b => (
                            <div className="col-lg-4 pb-5 pb-lg-0" key={b.id}>
                                <div className="stay-blog">
                                    <div className="blog-img ">
                                        <img src={`/storage/${b.image_url}`} className="img-fluid" />
                                    </div>
                                    <div className="stay-blog-details bg-white">
                                        <div className="inner-blog-detail ">
                                            <p className="f18 fw-400 mb-1 d-flex align-items-center gap-2">
                                                <img src={`${window.location.origin}/webassets/img/calender.svg`} />
                                                {new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                            </p>
                                            <h4 className="one-line textcolor">{b.title}
                                            </h4>
                                            <span className=" four-line mb-4 padding-blog " dangerouslySetInnerHTML={{ __html: b.description }} />
                                            <Link className="black-btn " to={`/blogs/${b.id}`}>Read More</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

// Export as default for use in app.jsx
export default Home;

// Also mount directly for backward compatibility
const mountEl = document.getElementById('react-home-root');
if (mountEl) {
    const root = createRoot(mountEl);
    root.render(<Home />);
}


