import React from 'react';

const TrackOrderShimmer = () => {
    return (
        <section className="trackorder-wrapper py-5">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        {/* Page Title Shimmer */}
                        <div className="shimmer-placeholder shimmer-page-title mb-3"></div>
                        
                        {/* Description Shimmer */}
                        <div className="shimmer-placeholder shimmer-description-line mb-4"></div>
                        
                        {/* Form Shimmer */}
                        <div className="mb-4">
                            {/* Input Field Shimmer */}
                            <div className="shimmer-placeholder shimmer-form-input mb-4"></div>
                            
                            {/* Submit Button Shimmer */}
                            <div className="shimmer-placeholder shimmer-btn-large"></div>
                        </div>

                        {/* Results Section Shimmer */}
                        <div className="mt-5">
                            {/* Results Title Shimmer */}
                            <div className="shimmer-placeholder shimmer-section-title mb-4"></div>
                            
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    <div className="card">
                                        <div className="card-header bg-light">
                                            {/* Order Number Shimmer */}
                                            <div className="shimmer-placeholder shimmer-order-id-label"></div>
                                        </div>
                                        <div className="card-body">
                                            {/* Generate 3 tracking items shimmer */}
                                            {Array.from({ length: 3 }, (_, index) => (
                                                <div key={index} className="mb-4">
                                                    <div className="d-flex align-items-center mb-2">
                                                        {/* Status Badge Shimmer */}
                                                        <div className="shimmer-placeholder shimmer-order-status me-3"></div>
                                                        {/* Date Shimmer */}
                                                        <div className="shimmer-placeholder shimmer-order-date"></div>
                                                    </div>
                                                    <div className="ms-4">
                                                        {/* Order Item ID Shimmer */}
                                                        <div className="shimmer-placeholder shimmer-order-product-title mb-2"></div>
                                                        {/* Status Code Shimmer */}
                                                        <div className="shimmer-placeholder shimmer-order-qty mb-2"></div>
                                                        {/* Last Updated Shimmer */}
                                                        <div className="shimmer-placeholder shimmer-order-date"></div>
                                                    </div>
                                                    {index < 2 && <hr />}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Help Section Shimmer */}
                        <div className="text-center mt-5">
                            {/* Help Title Shimmer */}
                            <div className="shimmer-placeholder shimmer-section-title mb-3"></div>
                            {/* Email Shimmer */}
                            <div className="shimmer-placeholder shimmer-form-label mb-2"></div>
                            {/* Phone Shimmer */}
                            <div className="shimmer-placeholder shimmer-form-label"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrackOrderShimmer;
