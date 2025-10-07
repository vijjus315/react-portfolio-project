import React from 'react';

const OrderDetailShimmer = () => {
    return (
        <section className="py-5">
            <div className="container">
                <div className="row mb-3">
                    <div className="col-12">
                        <div className="shimmer-placeholder shimmer-border-line mb-3"></div>
                        <div className="shimmer-placeholder shimmer-page-title"></div>
                    </div>
                </div>
                
                <div className="order-detail-wrapper bg-white p-4 br15">
                    <div className="row">
                        <div className="col-12">
                            {/* Order ID Shimmer */}
                            <div className="d-flex align-items-center gap-2 mb-3">
                                <div className="shimmer-placeholder shimmer-order-id-label"></div>
                                <div className="shimmer-placeholder shimmer-order-id-value"></div>
                            </div>
                            <hr />
                        </div>
                        
                        <div className="col-lg-6">
                            <div className="border-right-order">
                                {/* Delivery Address Section Shimmer */}
                                <div className="mb-3">
                                    <div className="shimmer-placeholder shimmer-section-title mb-3"></div>
                                    <div className="address-delivery mb-3 border-right">
                                        <div className="d-inline-block mt-1">
                                            <div className="shimmer-placeholder shimmer-home-badge"></div>
                                        </div>
                                        <div className="shimmer-placeholder shimmer-address-line-1 mt-2 mb-2"></div>
                                        <div className="shimmer-placeholder shimmer-address-line-2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-6">
                            <div className="">
                                {/* Payment Details Section Shimmer */}
                                <div className="mb-3">
                                    <div className="shimmer-placeholder shimmer-section-title mb-3"></div>
                                    <div className="address-delivery mb-3">
                                        <div className="shimmer-placeholder shimmer-transaction-id mb-2"></div>
                                        <div className="shimmer-placeholder shimmer-payment-type mb-2"></div>
                                        <div className="shimmer-placeholder shimmer-total-price"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                    
                    <div className="row">
                        <div className="col-lg-4 mb-4">
                            {/* Product Information Shimmer */}
                            <div className="d-flex align-items-center gap-3">
                                <div className="shimmer-placeholder shimmer-order-product-image"></div>
                                <div className="">
                                    <div className="shimmer-placeholder shimmer-product-title mb-2"></div>
                                    <div className="shimmer-placeholder shimmer-product-description mb-2"></div>
                                    <div className="d-flex gap-2 mb-2">
                                        <div className="shimmer-placeholder shimmer-qty-info"></div>
                                        <div className="shimmer-placeholder shimmer-size-info"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-8 mb-4">
                            {/* Order Progress Steps Shimmer */}
                            <div className="orderdetail-progress checkout-steps steps steps-light pt-2 pb-2">
                                {/* Step 1: Order Placed */}
                                <div className="step-item active">
                                    <div className="shimmer-placeholder shimmer-step-label mb-2"></div>
                                    <div className="shimmer-placeholder shimmer-step-progress"></div>
                                    <div className="shimmer-placeholder shimmer-step-date"></div>
                                </div>
                                
                                {/* Step 2: Shipped */}
                                <div className="step-item">
                                    <div className="shimmer-placeholder shimmer-step-label mb-2"></div>
                                    <div className="shimmer-placeholder shimmer-step-progress"></div>
                                    <div className="shimmer-placeholder shimmer-step-date"></div>
                                </div>
                                
                                {/* Step 3: Out For Delivery */}
                                <div className="step-item">
                                    <div className="shimmer-placeholder shimmer-step-label mb-2"></div>
                                    <div className="shimmer-placeholder shimmer-step-progress"></div>
                                    <div className="shimmer-placeholder shimmer-step-date"></div>
                                </div>
                                
                                {/* Step 4: Delivered */}
                                <div className="step-item">
                                    <div className="shimmer-placeholder shimmer-step-label mb-2"></div>
                                    <div className="shimmer-placeholder shimmer-step-progress"></div>
                                    <div className="shimmer-placeholder shimmer-step-date"></div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderDetailShimmer;
