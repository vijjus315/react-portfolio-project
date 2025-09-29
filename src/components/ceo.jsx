// import React from 'react';

// const Ceo = () => {
//   return (
//     <section className="testimonials-wrapper py-5">
//       <div className="conatiner">
//         <div className="row">
//           <div className="col-12 col-sm-9 col-lg-8 mx-auto">
//             <div className="contain">
//               <div id="owl-carousel" className="owl-carousel owl-theme owl-testimonial owl-loaded owl-drag">
//                 <div className="owl-stage-outer">
//                   <div className="owl-stage" style={{ transform: 'translate3d(-1231px, 0px, 0px)', transition: 'all', width: '3078px' }}>
                    
//                     {/* START: Testimonial Item */}
//                     <div className="owl-item cloned" style={{ width: '585.552px', marginRight: '30px' }}>
//                       <div className="item">
//                         <div className="row">
//                           <div className="col-md-4">
//                             <div className="testimonial-image position-relative">
//                               <img
//                                 src="https://www.portacourts.com/storage/images/eVJ82A8WLHTxXDp19uCg4J5nbVkq37eOlThNMti7.jpg"
//                                 className="img-fluid"
//                                 alt="CEO"
//                               />
//                               <div className="name-testi">
//                                 <img
//                                   src="https://www.portacourts.com/webassets/img/ellipse.svg"
//                                   className="img-fluid"
//                                   alt="Ellipse"
//                                 />
//                                 <h6 className="text-center black-grey">Hammy Owen</h6>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="col-md-8 mt-3 mt-md-0">
//                             <div className="testimonials-text ps-md-4">
//                               <h2 className="text-white">CEO</h2>
//                               <p className="text-white">
//                                 This all started when I wanted to avoid painting lines on my tennis court and found the temporary options unsatisfactory. After extensive research and beta testing, I believe we’ve created an incredible alternative that’s not only high quality but also much cheaper than a permanent court and fully portable. We’ve used this setup everywhere—from backyard blacktops to tennis courts, and even in corporate conference rooms during meetings.
//                               </p>
//                               <p className="text-white">
//                                 Whether you’re looking for a semi-permanent or permanent solution, or even considering starting a side hustle, this court is perfect for you. Market data shows that this is a lot more fun than renting bounce houses 🤪 (with daily rentals fetching $350-$450/day). You can organize tournaments, play in unique locations, or have your own court ready when you can’t find an open one. Be an early adopter!
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     {/* END: Testimonial Item */}

//                     {/* Repeat the above block as many times as needed (you had cloned items) */}

//                   </div>
//                 </div>
//                 <div className="owl-nav disabled">
//                   <button type="button" role="presentation" className="owl-prev">
//                     <img src="https://www.portacourts.com/webassets/img/left-arrow.svg" className="left-arrow" alt="Previous" />
//                   </button>
//                   <button type="button" role="presentation" className="owl-next">
//                     <img src="https://www.portacourts.com/webassets/img/right-arrow.svg" className="right-arrow" alt="Next" />
//                   </button>
//                 </div>
//                 <div className="owl-dots disabled"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Ceo;

import React from 'react';

const Ceo = () => {
  return (
    <section className="testimonials-wrapper py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-9 col-lg-8 mx-auto">
            <div className="contain">
              <div
                id="owl-carousel"
                className="owl-carousel owl-theme owl-testimonial owl-loaded owl-drag"
              >
                <div className="owl-stage-outer">
                  <div
                    className="owl-stage"
                    style={{
                      transform: 'translate3d(-1231px, 0px, 0px)',
                      transition: 'all',
                      width: '3078px',
                    }}
                  >
                    <div
                      className="owl-item active"
                      style={{ width: '585.552px', marginRight: '30px' }}
                    >
                      <div className="item">
                        <div className="row">
                          <div className="col-md-4">
                            <div className="testimonial-image position-relative">
                              <img
                                src="https://www.portacourts.com/storage/images/eVJ82A8WLHTxXDp19uCg4J5nbVkq37eOlThNMti7.jpg"
                                className="img-fluid"
                                alt="Hammy Owen"
                              />
                              <div className="relative">
                                <img
                                  src="https://www.portacourts.com/webassets/img/ellipse.svg"
                                  className="img-fluid"
                                  alt="Ellipse"
                                />
                                <h6 className="text-center black-grey font-bold text-xl">
                                  Hammy Owen
                                </h6>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-8 mt-3 mt-md-0">
                            <div className="testimonials-text ps-md-4">
                              <h2 className="text-white">CEO</h2>
                              <p className="text-white">
                                This all started when I wanted to avoid painting lines on my tennis court and found the temporary options unsatisfactory. After extensive research and beta testing, I believe we’ve created an incredible alternative that’s not only high quality but also much cheaper than a permanent court and fully portable. We’ve used this setup everywhere—from backyard blacktops to tennis courts, and even in corporate conference rooms during meetings.
                              </p>
                              <p className="text-white">
                                Whether you’re looking for a semi-permanent or permanent solution, or even considering starting a side hustle, this court is perfect for you. Market data shows that this is a lot more fun than renting bounce houses 🤪 (with daily rentals fetching $350-$450/day). You can organize tournaments, play in unique locations, or have your own court ready when you can’t find an open one. Be an early adopter!
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional testimonial items can be added here if needed */}
                    
                  </div>
                </div>

                <div className="owl-nav disabled">
                  <button type="button" role="presentation" className="owl-prev">
                    <img
                      src="https://www.portacourts.com/webassets/img/left-arrow.svg"
                      className="left-arrow"
                      alt="Previous"
                    />
                  </button>
                  <button type="button" role="presentation" className="owl-next">
                    <img
                      src="https://www.portacourts.com/webassets/img/right-arrow.svg"
                      className="right-arrow"
                      alt="Next"
                    />
                  </button>
                </div>

                <div className="owl-dots disabled"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ceo;

