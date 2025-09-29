import React, { useState } from "react";

const CustomCourtModal = () => {

    const [showCustomModal, setShowCustomModal] = useState(true);

    const handleClose = () => {
        setShowCustomModal(false);
    }
    if (!showCustomModal) return null;

  return (
    <div>
      <div
        className="modal fade show"
        id="requestcustomsizebtn"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        data-bs-backdrop="static"
        aria-modal="true"
        role="dialog"
        style={{ display: "block", paddingLeft: 0 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal-content-width">
            <div className="modal-header border-0">
              <button
              onClick={handleClose}
                type="button"
                className="btn-closed border-0 bg-transparent text-end ms-auto"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <img
                  src="https://www.portacourts.com/webassets/img/cross.svg"
                  alt="Close"
                />
              </button>
            </div>
            <div className="modal-body pt-0">
              <form id="customSizeForm" noValidate>
                <input
                  type="hidden"
                  name="_token"
                  value="6jh2fd5qkz5XJszaEBIK6IN0RQZCiBrrqdz175Ak"
                  autoComplete="off"
                />
                <div className="row">
                  <div className="col-lg-6 mb-5">
                    <div className="form-group">
                      <label className="primary-theme" htmlFor="full_name">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        placeholder="Enter here"
                        className="contact-input form-control"
                      />
                      <span
                        className="text-danger error-message"
                        id="cerror-full_name"
                      ></span>
                    </div>
                  </div>

                  <div className="col-lg-6 mb-5">
                    <div className="form-group">
                      <label className="primary-theme" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Enter here"
                        className="contact-input form-control"
                      />
                      <span
                        className="text-danger error-message"
                        id="cerror-email"
                      ></span>
                    </div>
                  </div>

                  <div className="col-lg-6 mb-5">
                    <div className="form-group">
                      <label className="primary-theme" htmlFor="phone">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Enter here"
                        className="contact-input form-control"
                      />
                      <span
                        className="text-danger error-message"
                        id="cerror-phone"
                      ></span>
                    </div>
                  </div>

                  <div className="col-lg-6 mb-5">
                    <div className="form-group">
                      <label className="primary-theme" htmlFor="custom_size">
                        Custom Size
                      </label>
                      <input
                        type="text"
                        name="custom_size"
                        id="custom_size"
                        placeholder="eg. 21 ft X 45 ft X 2.5 mm"
                        className="contact-input form-control"
                      />
                      <span
                        className="text-danger error-message"
                        id="cerror-custom_size"
                      ></span>
                    </div>
                  </div>

                  <div className="col-lg-12 mb-5">
                    <div className="form-group">
                      <label className="primary-theme" htmlFor="autocomplete">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="autocomplete"
                        placeholder="Enter here"
                        className="contact-input form-control pac-target-input"
                        autoComplete="off"
                      />
                      <input type="hidden" name="latitude" id="latitude" />
                      <input type="hidden" name="longitude" id="longitude" />
                      <span
                        className="text-danger error-message"
                        id="cerror-address"
                      ></span>
                    </div>
                  </div>

                  <div className="col-lg-12 mb-5">
                    <div className="form-group">
                      <label className="primary-theme" htmlFor="description">
                        Your Message
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        placeholder="Enter here"
                        className="contact-input form-control"
                      ></textarea>
                      <span
                        className="text-danger cerror-message"
                        id="cerror-description"
                      ></span>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      id="submitCustomSizeBtn"
                      className="green-btn"
                    >
                      <span
                        className="spinner-border spinner-border-sm d-none me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="btn-text">Submit</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCourtModal;
