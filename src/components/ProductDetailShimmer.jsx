import React from 'react';

const ProductDetailShimmer = () => {
    return (
        <section className="py-5">
            <div className="container">
                <div className="row">
                    {/* LEFT COLUMN: Product Image Gallery Shimmer */}
                    <div className="col-lg-6">
                        <div className="">
                            <div className="slider__flex">
                                {/* Thumbnails Shimmer */}
                                <div className="slider__col">
                                    <div className="slider_thumbs">
                                        <div className="swiper-container overflow-scroll" style={{ height: "550px" }}>
                                            <div className="thumbnail-slider d-flex flex-lg-column gap-0.5">
                                                {/* Generate 6 thumbnail shimmer items */}
                                                {Array.from({ length: 6 }, (_, idx) => (
                                                    <div key={idx} className="swiper-slide shimmer-thumbnail">
                                                        <div className="slider__image">
                                                            <div className="shimmer-placeholder shimmer-thumbnail-img"></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Image Shimmer */}
                                <div className="slider__images" style={{ height: "400px" }}>
                                    <div className="swiper-container border">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <div className="slider__image">
                                                    <div className="shimmer-placeholder shimmer-main-image"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Product Info Shimmer */}
                    <div className="col-lg-6 mt-4 mt-lg-0">
                        <div className="product-slider-detail">
                            {/* Product Title Shimmer */}
                            <div className="shimmer-placeholder shimmer-title mb-3"></div>

                            {/* Rating Shimmer */}
                            <div className="d-flex align-items-center gap-4 mb-3">
                                <div className="rating-product">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="shimmer-placeholder shimmer-star"></div>
                                    ))}
                                </div>
                            </div>
                            <hr />

                            {/* Size Section Shimmer */}
                            <div className="mb-2">
                                <div className="shimmer-placeholder shimmer-label"></div>
                            </div>
                            <div className="variant-select-not mb-3">
                                <div className="variant-box position-relative">
                                    <div className="shimmer-placeholder shimmer-variant-data"></div>
                                </div>
                            </div>
                            <hr />

                            {/* Pricing Section Shimmer */}
                            <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
                                <div className="shimmer-placeholder shimmer-price-large"></div>
                                <div className="shimmer-placeholder shimmer-price-strike"></div>
                                <div className="shimmer-placeholder shimmer-discount-badge"></div>
                                <div className="shimmer-placeholder shimmer-shipping-info"></div>
                            </div>
                            <hr />

                            {/* Category Section Shimmer */}
                            <div className="mb-2">
                                <div className="shimmer-placeholder shimmer-label"></div>
                            </div>
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <div className="shimmer-placeholder shimmer-category"></div>
                            </div>

                            {/* Quantity Section Shimmer */}
                            <div className="mb-2">
                                <div className="shimmer-placeholder shimmer-label"></div>
                            </div>
                            <div className="mt-3 mb-4 d-flex align-items-center gap-2">
                                <div className="shimmer-placeholder shimmer-quantity-btn"></div>
                                <div className="shimmer-placeholder shimmer-quantity-number"></div>
                                <div className="shimmer-placeholder shimmer-quantity-btn"></div>
                            </div>

                            {/* Action Buttons Shimmer */}
                            <div className="gap-5 quantity-wrapper py-4">
                                <div className="mt-3 mt-sm-0 edit-wrapper d-block align-items-center d-sm-flex gap-4">
                                    <div className="shimmer-placeholder shimmer-btn shimmer-btn-large"></div>
                                    <div className="shimmer-placeholder shimmer-btn shimmer-btn-large"></div>
                                    <div className="shimmer-placeholder shimmer-wishlist-btn"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Description & Reviews Shimmer */}
                <div className="row mt-3">
                    <div className="col-12">
                        <div className="description-product">
                            {/* Tab Navigation Shimmer */}
                            <nav>
                                <div className="nav mb-3 border-0" id="nav-tab" role="tablist">
                                    <div className="shimmer-placeholder shimmer-tab"></div>
                                    <div className="shimmer-placeholder shimmer-tab"></div>
                                </div>
                            </nav>

                            {/* Tab Content Shimmer */}
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            {/* Description Content Shimmer */}
                                            <div className="shimmer-placeholder shimmer-description-line mb-2"></div>
                                            <div className="shimmer-placeholder shimmer-description-line mb-2"></div>
                                            <div className="shimmer-placeholder shimmer-description-line mb-2"></div>
                                            <div className="shimmer-placeholder shimmer-description-line mb-2"></div>
                                            <div className="shimmer-placeholder shimmer-description-line mb-2" style={{ width: '70%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailShimmer;
