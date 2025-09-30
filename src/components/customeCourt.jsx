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
          <div className="modal-content modal-content-width" style={{ borderRadius: '20px' }}>
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
                      <label className="primary-theme">Phone Number</label>
                      <div className="iti iti--allow-dropdown iti--separate-dial-code">
                        <div className="iti__flag-container">
                          <div className="iti__selected-flag" role="combobox" aria-controls="iti-0__country-listbox" aria-owns="iti-0__country-listbox" aria-expanded="false" tabIndex="0" title="India (भारत): +91" aria-activedescendant="iti-0__item-in">
                            <div className="iti__flag iti__in"></div>
                            <div className="iti__selected-dial-code">+91</div>
                            <div className="iti__arrow"></div>
                          </div>
                          <ul className="iti__country-list iti__hide" id="iti-0__country-listbox" role="listbox" aria-label="List of countries">
                            <li className="iti__country iti__preferred" tabIndex="-1" id="iti-0__item-us-preferred" role="option" data-dial-code="1" data-country-code="us" aria-selected="false">
                              <div className="iti__flag-box"><div className="iti__flag iti__us"></div></div>
                              <span className="iti__country-name">United States</span>
                              <span className="iti__dial-code">+1</span>
                            </li>
                            <li className="iti__country iti__preferred" tabIndex="-1" id="iti-0__item-gb-preferred" role="option" data-dial-code="44" data-country-code="gb" aria-selected="false">
                              <div className="iti__flag-box"><div className="iti__flag iti__gb"></div></div>
                              <span className="iti__country-name">United Kingdom</span>
                              <span className="iti__dial-code">+44</span>
                            </li>
                            <li className="iti__divider" role="separator" aria-disabled="true"></li>
                            <li className="iti__country iti__standard iti__active iti__highlight" tabIndex="-1" id="iti-0__item-in" role="option" data-dial-code="91" data-country-code="in" aria-selected="true">
                              <div className="iti__flag-box"><div className="iti__flag iti__in"></div></div>
                              <span className="iti__country-name">India (भारत)</span>
                              <span className="iti__dial-code">+91</span>
                            </li>
                          </ul>
                        </div>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          placeholder="Enter here" 
                          className="contact-input form-control" 
                          autoComplete="off" 
                          data-intl-tel-input-id="0" 
                          style={{paddingLeft: '85px'}}
                        />
                      </div>
                      <span className="text-danger error-message" id="cerror-phone"></span>
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
