import React from 'react';

const MyOrdersShimmer = () => {
    return (
        <section className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="shimmer-placeholder shimmer-border-line mb-3"></div>
                        <div className="shimmer-placeholder shimmer-page-title"></div>
                    </div>
                    <div className="col-12 pt-4">
                        <div className="">
                            <div className="table-responsive table-height">
                                <table className="w-100 table cart-table my-order-table">
                                    <tbody style={{ verticalAlign: 'middle' }} className="order-tbody my-order-tbody">
                                        {/* Generate 5 order shimmer rows */}
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <tr key={index} style={{ borderRadius: '10px', height: '60px', borderStyle: 'none !important' }} className="bg-white border-radius-tr">
                                                <td className="py-3" style={{ textAlign: 'start', fontSize: '16px', fontStyle: 'normal', fontWeight: '500' }}>
                                                    <div className="d-flex justify-content-start gap-3 cilent-profile-column">
                                                        {/* Product Image Shimmer */}
                                                        <div className="shimmer-placeholder shimmer-order-product-image"></div>
                                                        <div>
                                                            {/* Product Title Shimmer */}
                                                            <div className="shimmer-placeholder shimmer-order-product-title mb-2"></div>
                                                            <div className="d-flex align-items-center gap-2">
                                                                {/* Quantity Shimmer */}
                                                                <div className="shimmer-placeholder shimmer-order-qty mt-2"></div>
                                                                {/* Size Shimmer */}
                                                                <div className="shimmer-placeholder shimmer-order-size mt-2"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3" style={{ textAlign: 'center', fontSize: '16px', fontStyle: 'normal', fontWeight: '600' }}>
                                                    {/* Price Shimmer */}
                                                    <div className="shimmer-placeholder shimmer-order-price"></div>
                                                </td>
                                                <td className="py-3" style={{ textAlign: 'center', fontSize: '16px', fontStyle: 'normal', fontWeight: '600' }}>
                                                    <div>
                                                        {/* Status Shimmer */}
                                                        <div className="shimmer-placeholder shimmer-order-status mb-2"></div>
                                                        {/* Date Shimmer */}
                                                        <div className="shimmer-placeholder shimmer-order-date mb-2"></div>
                                                        {/* Review Link Shimmer */}
                                                        <div className="shimmer-placeholder shimmer-order-review-link"></div>
                                                    </div>
                                                </td>
                                                <td className="py-3" style={{ textAlign: 'end', fontSize: '16px', fontStyle: 'normal', fontWeight: '600' }}>
                                                    {/* View Details Button Shimmer */}
                                                    <div className="shimmer-placeholder shimmer-order-button"></div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Pagination Shimmer */}
                            <div className="pagination-order py-3 d-flex align-items-center justify-content-center">
                                <nav aria-label="Page navigation example mb-4">
                                    <ul className="pagination align-items-center">
                                        {/* Previous Button Shimmer */}
                                        <li className="page-item">
                                            <div className="shimmer-placeholder shimmer-pagination-btn"></div>
                                        </li>
                                        
                                        {/* Page Numbers Shimmer */}
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <li key={i} className="page-item">
                                                <div className="shimmer-placeholder shimmer-pagination-number"></div>
                                            </li>
                                        ))}
                                        
                                        {/* Next Button Shimmer */}
                                        <li className="page-item">
                                            <div className="shimmer-placeholder shimmer-pagination-btn"></div>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyOrdersShimmer;
