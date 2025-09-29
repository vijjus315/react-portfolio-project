import React, { useState, useEffect } from "react";
import ReviewSubmit from "./reviewSubmit";

const Reviews = ({ productRatings = [] }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [showReviewSubmit, setShowReviewSubmit] = useState(false);

  // Transform API ratings to match component format
  useEffect(() => {
    if (productRatings && productRatings.length > 0) {
      const transformedReviews = productRatings.map(apiReview => ({
        id: apiReview.id,
        name: apiReview.user?.name || "Anonymous User",
        profile: apiReview.user?.profile || "https://www.portacourts.com/webassets/img/profile.png",
        date: new Date(apiReview.created_at).toLocaleDateString(),
        rating: parseInt(apiReview.rating),
        comment: apiReview.comment || "",
        user_id: apiReview.user_id
      }));
      setReviews(transformedReviews);
    }
  }, [productRatings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim() || rating === 0) return;

    const newReview = {
      id: Date.now(),
      name: "Guest User",
      profile: "https://www.portacourts.com/webassets/img/profile.png",
      date: new Date().toLocaleDateString(),
      rating,
      comment: reviewText,
    };

    setReviews([newReview, ...reviews]);
    setReviewText("");
    setRating(0);

    setShowReviewSubmit(true);
  };

  return (
    <div
      className="tab-pane fade"
      id="review"
      role="tabpanel"
      aria-labelledby="review-tab"
    >
      <div className="row mt-4 mb-5">
        {/* Left Side - Reviews List */}
        <div className="col-12 col-lg-6 p-3">
          {/* Header + Sort */}
          <div className="row pb-3 pb-md-4 pt-md-0 align-items-center comment-text">
            <div className="col-md-6">
              <h5 className="mb-0 fw-500 f18">All Reviews ({reviews.length})</h5>
            </div>

            <div className="col-md-6 pt-3 pt-md-0">
              <div className="sort-drop text-end gap-2">
                <p className="sort-text mb-0">Sort by :</p>
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle drop-btn-sort fw-500 border-0"
                    type="button"
                    id="newest-dropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Newest
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="newest-dropdown">
                    <li>
                      <a
                        className="dropdown-item"
                        href="?filter=newest"
                      >
                        Newest
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="?filter=oldest"
                      >
                        Oldest
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          {reviews.map((review) => (
            <div className="comment-section" key={review.id}>
              <div className="comment-inner-box">
                <div>
                  <img
                    src={review.profile}
                    alt="User Profile"
                    className="profile-comment"
                  />
                </div>
                <div className="d-flex justify-content-between w-100">
                  <div className="profile-name-comment">
                    <p className="f16 fw-500 text-black mb-0 lh-0">{review.name}</p>
                    <p className="mb-0 fw-400 lh-0 mt-4">{review.date}</p>
                    <div className="star-comment mt-2">
                      {[...Array(5)].map((_, i) => (
                        <img
                          key={i}
                          src={
                            i < review.rating
                              ? "https://www.portacourts.com/webassets/img/yellow-star.svg"
                              : "https://www.portacourts.com/webassets/img/grey-star.svg"
                          }
                          alt=""
                        />
                      ))}
                    </div>
                  </div>
                  <div className="edit-drop-review">
                    <div className="dropdown">
                      <button
                        className="btn"
                        type="button"
                        id={`dropdownMenuButton-${review.id}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src="https://www.portacourts.com/webassets/img/hori-dots.svg"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mb-0 fw-400 text-black pt-2 pt-sm-3 line-24 f16 description-div3">
                {review.comment}
              </p>
              <hr />
            </div>
          ))}
        </div>

        {/* Right Side: Review Form */}
        <div className="col-12 col-lg-6 p-3">
          <div className="review-user">
            <div className="mt-2">
              <div className="px-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 position-relative">
                    <label className="fw-500 mb-2">Ratings</label>
                    <div className="d-flex justify-content-start gap-3 align-items-center">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <i
                          key={val}
                          className={`cus-star-icon fa fa-star ${
                            rating >= val ? "fillstar" : "unfillstar"
                          }`}
                          data-value={val}
                          aria-hidden="true"
                          style={{ cursor: "pointer" }}
                          onClick={() => setRating(val)}
                        ></i>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 position-relative">
                    <label className="fw-500 mb-2" htmlFor="comment">
                      Your review
                    </label>
                    <textarea
                      id="comment"
                      className="form-control delivary-input pwd-field pe-5 bg-white border-0 resize-none"
                      placeholder="Write your review"
                      rows="8"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    id="submitReview"
                    className="btn green-btn w-100 mt-2"
                    style={{ backgroundColor: "var(--primary-theme)",
                                    color: "#fff", 
                                    borderRadius: "10px", 
                                    padding: "11px 31px", 
                                    height: "50px", 
                                    border: "0",
                                    textTransform: "capitalize", 
                                    fontSize: "16px"
                    }}
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* show review submitted page */}
      {showReviewSubmit && <ReviewSubmit onClose={() => setShowReviewSubmit(false)} />}
    </div>
  );
};

export default Reviews;
