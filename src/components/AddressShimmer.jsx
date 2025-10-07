import React from 'react';

const AddressShimmer = () => {
    return (
        <section className="py-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="shimmer-placeholder shimmer-border-line mb-3"></div>
                        <div className="shimmer-placeholder shimmer-page-title"></div>
                    </div>
                    <div className="col-6 text-end">
                        {/* Add Address Button Shimmer */}
                        <div className="shimmer-placeholder shimmer-add-address-btn"></div>
                    </div>
                </div>
                
                <div className="row pt-4">
                    {/* Generate 3 address cards shimmer */}
                    {Array.from({ length: 3 }, (_, index) => (
                        <div key={index} className="col-md-4 mb-3">
                            <div className="address-inner bg-white p-3 br15 d-flex justify-content-between">
                                <div className="">
                                    <div className="addres-detail">
                                        {/* Name Shimmer */}
                                        <div className="shimmer-placeholder shimmer-address-name mb-2"></div>
                                    </div>
                                    <div className="address-drop">
                                        {/* Address Lines Shimmer */}
                                        <div className="shimmer-placeholder shimmer-address-line-1 mb-2"></div>
                                        <div className="shimmer-placeholder shimmer-address-line-2 mb-2"></div>
                                        <div className="shimmer-placeholder shimmer-address-line-3"></div>
                                    </div>
                                </div>
                                <div className="d-flex flex-column justify-content-between align-items-end">
                                    {/* Dropdown Menu Shimmer */}
                                    <div className="dropdown drop-address">
                                        <div className="shimmer-placeholder shimmer-dropdown-btn"></div>
                                    </div>
                                    {/* Address Type Badge Shimmer */}
                                    <div className="">
                                        <div className="shimmer-placeholder shimmer-address-type-badge"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AddressShimmer;
