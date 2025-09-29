import React, { useState } from "react";

const ReviewSubmit = () => {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-modal="true"
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal-content-width">
          <div className="modal-header border-0">
            <button
              type="button"
              className="btn-closed border-0 bg-transparent text-end ms-auto"
              onClick={handleClose}
              aria-label="Close"
            >
              <img
                src="https://www.portacourts.com/webassets/img/cross.svg"
                alt="Close"
              />
            </button>
          </div>
          <div className="modal-body pt-0">
            <div className="text-center">
              <img
                src="https://www.portacourts.com/webassets/img/thanku.png"
                className="img-fluid pb-3"
                alt="Thank you"
              />
              <h1 className="font-oswald pb-1">Thank You!</h1>
              <p className="thank-text fw-500 f20">
                Your review is successfully added
              </p>
            </div>
            <div className="pt-4 pb-3">
              <button
                className="btn green-btn w-100 box-shadow"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmit;
