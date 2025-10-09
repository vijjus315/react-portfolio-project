import React from 'react';

const CartShimmer = ({ rows = 3 }) => {
    return (
        <div className="row common-card-bg">
            {/* Left Side - Cart Items Shimmer */}
            <div className="col-lg-8 mb-3 mb-lg-0 h-100">
                <div className="add-cart-detail px-2">
                    <div className="table-responsive table-height" 
                        style={{ backgroundColor: "#fff", height: "100%", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                        <table className="w-100 table cart-table">
                            <thead
                                style={{ verticalAlign: 'middle', height: '70px' }}
                                className="border-grey"
                            >
                                <tr>
                                    <th
                                        className="font-Yantramanav"
                                        style={{
                                            fontSize: '20px',
                                            fontWeight: 600,
                                            color: '#01073D',
                                            textAlign: 'start',
                                        }}
                                    >
                                        Product
                                    </th>
                                    <th
                                        className="font-Yantramanav"
                                        style={{
                                            fontSize: '20px',
                                            fontWeight: 600,
                                            color: '#01073D',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Size
                                    </th>
                                    <th
                                        className="font-Yantramanav"
                                        style={{
                                            fontSize: '20px',
                                            fontWeight: 600,
                                            color: '#01073D',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Unit Price
                                    </th>
                                    <th
                                        className="font-Yantramanav"
                                        style={{
                                            fontSize: '20px',
                                            fontWeight: 600,
                                            color: '#01073D',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Qty
                                    </th>
                                    <th
                                        className="font-Yantramanav"
                                        style={{
                                            fontSize: '20px',
                                            fontWeight: 600,
                                            color: '#01073D',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody style={{ verticalAlign: 'middle' }}>
                                {Array.from({ length: rows }, (_, index) => (
                                    <tr key={index} style={{ height: '60px' }} className="go-to-order">
                                        {/* Product Column with Image and Title */}
                                        <td className="py-3" style={{ textAlign: 'start', fontSize: '16px', fontWeight: 500 }}>
                                            <div className="d-flex justify-content-start gap-3 align-items-center cilent-profile-column">
                                                {/* Product Image Shimmer */}
                                                <div className="shimmer-placeholder shimmer-order-product-image"></div>
                                                <div>
                                                    {/* Product Title Shimmer */}
                                                    <div className="shimmer-placeholder shimmer-order-product-title mb-2"></div>
                                                    {/* Remove Button Shimmer */}
                                                    <div className="shimmer-placeholder" style={{ 
                                                        width: '60px', 
                                                        height: '16px', 
                                                        borderRadius: '4px' 
                                                    }}></div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {/* Size Column */}
                                        <td className="py-3" style={{ textAlign: 'center', fontSize: '16px', fontWeight: 600 }}>
                                            <div className="d-flex justify-content-center">
                                                <div className="shimmer-placeholder shimmer-size-info"></div>
                                            </div>
                                        </td>
                                        
                                        {/* Unit Price Column */}
                                        <td className="py-3" style={{ textAlign: 'center', fontSize: '16px', fontWeight: 600 }}>
                                            <div className="d-flex justify-content-center">
                                                <div className="shimmer-placeholder shimmer-order-price"></div>
                                            </div>
                                        </td>
                                        
                                        {/* Quantity Column */}
                                        <td className="py-3" style={{ textAlign: 'center', fontSize: '16px', fontWeight: 500 }}>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                {/* Decrement Button */}
                                                <div className="shimmer-placeholder" style={{ 
                                                    width: '24px', 
                                                    height: '24px', 
                                                    borderRadius: '4px' 
                                                }}></div>
                                                {/* Quantity Number */}
                                                <div className="shimmer-placeholder shimmer-qty-info"></div>
                                                {/* Increment Button */}
                                                <div className="shimmer-placeholder" style={{ 
                                                    width: '24px', 
                                                    height: '24px', 
                                                    borderRadius: '4px' 
                                                }}></div>
                                            </div>
                                        </td>
                                        
                                        {/* Total Price Column */}
                                        <td className="py-3" style={{ textAlign: 'center', fontSize: '16px', fontWeight: 600 }}>
                                            <div className="d-flex justify-content-center">
                                                <div className="shimmer-placeholder shimmer-order-price"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                {/* Place Order Button Shimmer */}
                <div className="text-end mt-4 mb-2 d-flex ms-auto justify-content-end align-items-end">
                    <div className="shimmer-placeholder" style={{ 
                        width: '150px', 
                        height: '50px', 
                        borderRadius: '10px',
                        marginLeft: '20px'
                    }}></div>
                </div>
            </div>

            {/* Right Side - Order Summary Shimmer */}
            <div className="col-lg-4">
                <div className="order-details-side px-1 px-md-3 py-3 bg-white" 
                    style={{ backgroundColor: "#fff", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                    {/* Order Summary Title */}
                    <div className="shimmer-placeholder shimmer-section-title mb-3"></div>
                    
                    <ul className="ps-0 list-style-none pt-3">
                        {/* Total MRP */}
                        <li>
                            <div className="d-flex justify-content-between pb-2 align-items-center">
                                <div className="shimmer-placeholder" style={{ 
                                    width: '80px', 
                                    height: '17px', 
                                    borderRadius: '4px' 
                                }}></div>
                                <div className="shimmer-placeholder shimmer-order-price"></div>
                            </div>
                        </li>
                        
                        {/* Discount on MRP */}
                        <li>
                            <div className="d-flex justify-content-between pb-2 align-items-center">
                                <div className="shimmer-placeholder" style={{ 
                                    width: '120px', 
                                    height: '17px', 
                                    borderRadius: '4px' 
                                }}></div>
                                <div className="shimmer-placeholder shimmer-order-price"></div>
                            </div>
                        </li>
                        
                        {/* Shipping Fee */}
                        <li className="border-bottom">
                            <div className="d-flex justify-content-between pb-2 align-items-center">
                                <div className="shimmer-placeholder" style={{ 
                                    width: '90px', 
                                    height: '17px', 
                                    borderRadius: '4px' 
                                }}></div>
                                <div className="shimmer-placeholder" style={{ 
                                    width: '40px', 
                                    height: '17px', 
                                    borderRadius: '4px' 
                                }}></div>
                            </div>
                        </li>
                        
                        {/* Total Amount */}
                        <li>
                            <div className="d-flex justify-content-between pb-2 pt-3 align-items-center">
                                <div className="shimmer-placeholder" style={{ 
                                    width: '100px', 
                                    height: '17px', 
                                    borderRadius: '4px' 
                                }}></div>
                                <div className="shimmer-placeholder shimmer-total-price"></div>
                            </div>
                        </li>
                    </ul>

                    {/* Coupons Section */}
                    <div className="coupon-section mb-3">
                        <div className="shimmer-placeholder shimmer-section-title mb-3"></div>
                        <div className="d-flex justify-content-between gap-1 pb-2 align-items-center w-100 coupon-res">
                            <div className="d-flex align-items-center gap-2 w-100">
                                {/* Coupon Icon */}
                                <div className="shimmer-placeholder" style={{ 
                                    width: '20px', 
                                    height: '20px', 
                                    borderRadius: '4px' 
                                }}></div>
                                {/* Apply Coupons Text */}
                                <div className="shimmer-placeholder" style={{ 
                                    width: '120px', 
                                    height: '20px', 
                                    borderRadius: '4px' 
                                }}></div>
                            </div>
                            {/* Apply Button */}
                            <div className="shimmer-placeholder" style={{ 
                                width: '100px', 
                                height: '50px', 
                                borderRadius: '10px' 
                            }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartShimmer;

