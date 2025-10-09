import React from 'react';

const WishlistShimmer = ({ count = 4 }) => {
    return (
        <>
            {Array.from({ length: count }, (_, index) => (
                <div className="col-md-6 col-lg-3 mb-3" key={index}>
                    <div className="feature-pro shimmer-container">
                        {/* Product Image Shimmer */}
                        <div className="product-feature-img product-bg position-relative shimmer-image">
                            <div className="shimmer-placeholder"></div>
                            
                            {/* Wishlist Icon Shimmer */}
                            <div className="icon-wish-product shimmer-wishlist">
                                <div className="shimmer-placeholder shimmer-circle"></div>
                            </div>
                        </div>
                        
                        {/* Product Content Shimmer */}
                        <div className="px-3 py-4">
                            {/* Title Shimmer */}
                            <div className="shimmer-placeholder shimmer-title mb-2"></div>
                            
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    {/* Price Shimmer */}
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <div className="shimmer-placeholder shimmer-price"></div>
                                        <div className="shimmer-placeholder shimmer-price-old"></div>
                                    </div>
                                    
                                    {/* Rating Stars Shimmer */}
                                    <div className="d-flex align-items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="shimmer-placeholder shimmer-star"></div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Cart Icon Shimmer */}
                                <div className="shimmer-placeholder shimmer-cart-icon"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default WishlistShimmer;

