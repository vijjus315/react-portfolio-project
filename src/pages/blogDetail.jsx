import { useState } from "react";

const BlogDetail = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [sortBy, setSortBy] = useState("Newest");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([{ text: comment, date: new Date() }, ...comments]);
      setComment("");
    }
  };

  return (
    <section className="blog-detail-wrapper py-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="fw-400 mb-4">How to Set Up a Portable Pickleball Court in 20 Minutes</h2>
            <div className="author-section mb-4 d-flex justify-content-between align-items-center">
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
                  <h4 className="mb-0 fw-bold">Hammy Owens</h4>
                  <p className="text-muted mb-0">May 26, 2025</p>
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

            <div className="blog-detailbanner mb-4">
              <img src="https://www.portacourts.com/storage/images/KVg1BcM1feJYsTMxg25qMmuIezcXMDk4iHgpkDJL.webp" className="blogdetail-fluid" alt="How to Set Up a Portable Pickleball Court in 20 Minutes" />
            </div>

            <div className="my-3">
              <div className="row">
                <div className="col-lg-4">
                  <nav className="table-of-contents">
                    <h4 className="text-black">Table of Contents</h4>
                    <ul>
                      <li>
                        <a href="#The Joy of Playing Tennis at Home">The Joy of Playing Tennis at Home</a>
                        <ul>
                          <li><a href="#font-families-used">Convenience and Accessibility</a></li>
                          <li><a href="#font-families-used">Consistent Practice</a></li>
                          <li><a href="#font-families-used">Family Fun and Fitness</a></li>
                          <li><a href="#font-families-used">Social Gatherings</a></li>
                        </ul>
                      </li>
                      <li>
                        <a href="#Another-Section-Title">The Joy of Playing Tennis at Home</a>
                        <ul>
                          <li><a href="#convenience-and-accessibility-2">Convenience and Accessibility</a></li>
                          <li><a href="#consistent-practice-2">Consistent Practice</a></li>
                          <li><a href="#family-fun-and-fitness-2">Family Fun and Fitness</a></li>
                          <li><a href="#social-gatherings-2">Social Gatherings</a></li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>

              <ul>
                <li>
                  If you're a pickleball enthusiast who's always on the move or simply short of space, a <b><a href="https://www.portacourts.com/product-detail/premium-pickleball-court">DIY portable pickleball court</a></b> could be the ultimate game-changer. Whether you're at a local park, driveway, or gymnasium, being able to set up a fully functional court in under 20 minutes means more play, less prep. In this in-depth guide, we'll break down everything you need to know: from selecting the <b>best portable pickleball net</b>, laying out accurate <b>pickleball boundary lines portable</b> options, to choosing from top-rated <b>portable pickleball court kits</b>.
                </li>
              </ul>

              <h2>What Makes a Pickleball Court "Portable"?</h2>
              <p>A <b>portable pickleball court</b> is essentially a temporary setup that mimics a regulation court (20 feet wide by 44 feet long) without requiring a permanent surface or in-ground net posts. Instead, you use:</p>
              <ul>
                <li>A portable net system</li>
                <li>Temporary or removable boundary lines</li>
                <li>A flat surface (asphalt, gym flooring, tennis court, or even grass)</li>
                <li>Optional court kits with pre-measured lines and accessories</li>
              </ul>
              <p>These courts are ideal for:</p>
              <ul>
                <li>Casual games</li>
                <li>Pop-up tournaments</li>
                <li>PE classes or community rec events</li>
                <li>RV and travel enthusiasts</li>
              </ul>

              <h2>Step-by-Step Guide: Set Up in 20 Minutes or Less</h2>
              <p><b><i>Step 1: Choose the Right Location (2-3 minutes)</i></b></p>
              <p>First, scout a flat and clean playing surface. Ideal locations include:</p>
              <ul>
                <li>Tennis courts (just tape your own lines over it)</li>
                <li>Driveways</li>
                <li>Parking lots</li>
                <li>Gym floors</li>
                <li>Turf or sports mats</li>
              </ul>
              <p><b>Pro Tip: </b>Make sure you have enough clearance around the court—at least 5 feet beyond each baseline and 3 feet on the sides.</p>

              <p><b><i>Step 2: Measure and Mark the Court Area (5-6 minutes)</i></b></p>
              <p>You can use:</p>
              <ul>
                <li>Measuring tape (at least 50 ft long)</li>
                <li>Chalk, painter’s tape, or portable court lines (like roll-out tape or rubber markers)</li>
              </ul>
              <p><b>Pickleball Court Dimensions:</b></p>
              <ul>
                <li>20 ft wide x 44 ft long (includes both halves)</li>
                <li>Non-volley zone ("Kitchen"): 7 ft from the net on both sides</li>
              </ul>
              <p><b><i>Marking Tips:</i></b></p>
              <ul>
                <li>Start by laying out the full rectangle.</li>
                <li>Then mark the centerline (dividing left and right service areas)</li>
                <li>Outline the Kitchen lines next</li>
              </ul>

              <p><b><i>Step 3: Assemble the Portable Pickleball Net (5-7 minutes)</i></b></p>
              <p>Not all portable nets are created equal. Look for features such as:</p>
              <ul>
                <li>Regulation height: 36 inch at posts, 34 inch in center</li>
                <li>Sturdy metal frame (powder-coated steel or aluminum)</li>
                <li>Center support rod to prevent sagging</li>
                <li>Weather-resistant netting</li>
                <li>Carrying case</li>
              </ul>

              <h2>Optional but Helpful: Portable Pickleball Court Kits</h2>
              <p>While you can DIY everything, several kits are available that include pre-measured lines, corner markers, and even nets that fold into a compact bag. Benefits include:</p>
              <ul>
                <li>Accuracy of court dimensions</li>
                <li>Faster setup</li>
                <li>Easy storage and transport</li>
                <li>Professional-grade materials</li>
              </ul>

              <h2>Final Thoughts: Play Anywhere, Anytime</h2>
              <p>With a portable pickleball court, your playtime isn’t limited by location. Practice at the park, host a pop-up tournament, or enjoy family games in your driveway. The convenience, flexibility, and fun make investing in a portable setup worthwhile.</p>

              <h2>FAQ: Everything You Need to Know</h2>
              <p><b>Q: What is a portable pickleball court?</b></p>
              <p>A portable pickleball court is a temporary, regulation-sized setup that uses a freestanding net system and removable boundary lines—no permanent posts or surface prep required.</p>

              <p><b>Q: Can I use a tennis court to play pickleball?</b></p>
              <p>Absolutely! Just tape over the existing lines. Many portable kits even include conversion guides for tennis courts.</p>

              <p><b>Q: How long does a DIY portable pickleball court last?</b></p>
              <p>If maintained properly, nets and line markers can last 2-5 years or longer.</p>

              <p><b>Q: Are portable courts allowed in official tournaments?</b></p>
              <p>If your net height (36″ posts, 34″ center) and boundary layout meet USAPA specifications, portable courts are approved for official play.</p>

              <p><b>Q: How quickly can I set up a portable pickleball court?</b></p>
              <p>With practice, you can choose your location, mark lines, and assemble the net in under 20 minutes, making it perfect for spontaneous games.</p>

              <p><b>Q: Do I need a full court kit or can I mark lines myself?</b></p>
              <p>DIY marking with chalk or tape works, but portable court kits save time, ensure regulation accuracy, and include corner guides.</p>

              <p><b>Q: How do I maintain and store my portable court?</b></p>
              <p>After each use, clean net poles, check for tape residue, and store all components (net, lines, carry case) in a dry, labeled container.</p>

              <p><b>Q: Can coaches or clubs use portable courts for multi-court events?</b></p>
              <p>Yes—invest in multi-court boundary systems, wheeled equipment carts, and branded backdrops to scale up for clinics, tournaments, or PE classes.</p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="row mt-5">
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