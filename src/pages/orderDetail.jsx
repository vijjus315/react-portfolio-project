import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useParams } from 'react-router-dom';
import Header from '../layouts/Navbar.jsx';
import Footer from '../layouts/Footer.jsx';
import LoginModal from '../components/login.jsx';
import SignupModal from '../components/signup.jsx';
import VerifyEmailModal from '../components/verifyEmail.jsx';
import ChangePasswordModal from '../components/changePassword.jsx';
import EditProfileModal from '../components/editProfile.jsx';
import { getOrderDetail } from '../services/order.js';
import { getImageUrl } from '../utils/imageUtils.js';
import '../styles/bootstrap';

const OrderDetail = () => {
    const { id } = useParams();
    const [orderItem, setOrderItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderTracking, setOrderTracking] = useState({
        placed: null,
        shipping: null,
        out: null,
        delivered: null
    });

    // Format date helper
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            day: 'numeric', 
            month: 'short' 
        });
    };

    // Fetch order detail data
    const fetchOrderDetail = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            if (!id) {
                throw new Error('Order ID not found in URL');
            }
            
            const response = await getOrderDetail(id);
            if (response.success) {
                setOrderItem(response.data);
                
                // Set order tracking status (simulating the PHP logic)
                // In a real implementation, this would come from the API
                setOrderTracking({
                    placed: response.data.tracking?.placed || null,
                    shipping: response.data.tracking?.shipping || null,
                    out: response.data.tracking?.out || null,
                    delivered: response.data.tracking?.delivered || null
                });
            } else {
                setError(response.message || 'Failed to fetch order details');
            }
        } catch (err) {
            console.error('Error fetching order details:', err);
            setError('Failed to load order details');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderDetail();
    }, [id]);

    if (isLoading) {
        return (
            <section className="py-5">
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="border-line"></div>
                            <h2 className="text-capitalize">Order Detail</h2>
                        </div>
                    </div>
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">Loading order details...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-5">
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="border-line"></div>
                            <h2 className="text-capitalize">Order Detail</h2>
                        </div>
                    </div>
                    <div className="text-center py-5">
                        <div className="alert alert-danger">
                            <h4>Error</h4>
                            <p>{error}</p>
                            <button className="btn btn-primary" onClick={() => fetchOrderDetail()}>
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (!orderItem) {
        return (
            <section className="py-5">
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="border-line"></div>
                            <h2 className="text-capitalize">Order Detail</h2>
                        </div>
                    </div>
                    <div className="text-center py-5">
                        <div className="alert alert-warning">
                            <h4>Order Not Found</h4>
                            <p>The requested order could not be found.</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Parse address JSON (not available in new API response)
    let address = null;
    // Address data is not available in the new API response
    // This would need to be fetched from a separate endpoint if needed

    // Construct image URL
    let imageUrl = `${window.location.origin}/webassets/img/placeholder.jpg`;
    if (orderItem.products?.product_images && orderItem.products.product_images.length > 0) {
        const originalImageUrl = orderItem.products.product_images[0].image_url;
        if (originalImageUrl) {
            imageUrl = getImageUrl(originalImageUrl);
        }
    }

    // Calculate total price
    const unitPrice = parseFloat(orderItem.product_variants?.discounted_price || orderItem.price);
    const totalPrice = unitPrice * orderItem.qty;

    return (
        <section className="py-5">
            <div className="container">
                <div className="row mb-3">
                    <div className="col-12">
                        <div className="border-line"></div>
                        <h2 className="text-capitalize">Order Detail</h2>
                    </div>
                </div>
                <div className="order-detail-wrapper bg-white p-4 br15">
                    <div className="row">
                        <div className="col-12">
                            <h4 className="font-Yantramanav fw-500 order-text">
                                Order ID: <span className="light-grey fw-400">
                                    {orderItem.order_id}
                                </span>
                            </h4>
                            <hr />
                        </div>
                        <div className="col-lg-6">
                            <div className="border-right-order">
                                <h3 className="font-Yantramanav fw-500 order-text mb-0">Delivery Address</h3>
                                <div className="address-delivery mb-3 border-right">
                                    <div className="d-inline-block mt-1">
                                        <a className="primary-theme light light-green border-0 rounded-pill px-3 py-1 d-flex align-items-center gap-1">
                                            <img src={`${window.location.origin}/webassets/img/home-icon.svg`} className="me-1" alt="Home" />
                                            Home
                                        </a>
                                    </div>
                                    <p className="primary-theme fw-500 mb-0 lh-base mt-2">Address information not available</p>
                                    <p className="mb-0 fw-400">Please contact support for delivery details</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="">
                                <h3 className="font-Yantramanav fw-500 order-text mb-0">Payment Details</h3>
                                <div className="address-delivery mb-3">
                                    <p className="f18 fw-500 mb-0 lh-base">
                                        <strong>Transaction Id: </strong>
                                        N/A
                                    </p>
                                    <p className="f18 mb-1 fw-400">
                                        <strong>Payment Type: </strong>Credit Card
                                    </p>
                                    <h3 className="f18 primary-theme">${totalPrice.toFixed(2)}</h3>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="row">
                        <div className="col-lg-4 mb-4">
                            <div className="d-flex align-items-center gap-3">
                                <img 
                                    src={imageUrl}
                                    className="img-fluid pro-order-pic"
                                    alt={orderItem.products?.title}
                                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                    onError={(e) => {
                                        console.error('🖼️ Image failed to load:', imageUrl);
                                        const fallbackUrl = `https://www.portacourts.com/storage/images/placeholder.jpg`;
                                        if (e.target.src !== fallbackUrl) {
                                            e.target.src = fallbackUrl;
                                        } else {
                                            e.target.src = `${window.location.origin}/webassets/img/placeholder.jpg`;
                                        }
                                    }}
                                />
                                <div className="">
                                    <h6 className="thank-text font-Yantramanav fw-500 mb-0">
                                        {orderItem.products?.title}
                                    </h6>
                                    <span className="f11 light-grey fw-500 pb-1">
                                        (Price Includes 1 Net, 4 Paddles and 20 Pickleballs)
                                    </span>
                                    <div className="pt-1">
                                        <p className="qty-btn font-Yantramanav mt-0 d-inline-block">
                                            Qty: {orderItem.qty}
                                        </p>
                                        <p className="qty-btn font-Yantramanav mt-0 d-inline-block">
                                            Size: {orderItem.product_variants?.length} ft X {orderItem.product_variants?.width} ft X {orderItem.product_variants?.thickness} mm
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 mb-4">
                            <div className="orderdetail-progress checkout-steps steps steps-light pt-2 pb-2">
                                <a className="step-item active">
                                    <div className="step-label font-Yantramanav fw-400">
                                        Order Placed
                                    </div>
                                    <div className="step-progress check-step-progress">
                                    </div>
                                    <div className="step-label font-Yantramanav fw-400">
                                        {formatDate(orderItem.created_at)}
                                    </div>
                                </a>
                                <a className="step-item" href="">
                                    <div className="step-label font-Yantramanav fw-400">
                                        Shipped
                                    </div>
                                    <div className="step-progress check-step-progress">
                                        <span className="step-count check-counts">
                                        </span>
                                    </div>
                                    <div className="step-label font-Yantramanav fw-400">
                                    </div>
                                </a>
                                <a className="step-item" href="javascript:">
                                    <div className="step-label font-Yantramanav fw-400">
                                        Out For Delivery
                                    </div>
                                    <div className="step-progress check-step-progress">
                                        <span className="step-count check-counts">
                                        </span>
                                    </div>
                                    <div className="step-label font-Yantramanav fw-400">
                                    </div>
                                </a>
                                <a className="step-item" href="javascript:">
                                    <div className="step-label font-Yantramanav fw-400">
                                        Delivered
                                    </div>
                                    <div className="step-progress check-step-progress">
                                        <span className="step-count check-counts">
                                        </span>
                                    </div>
                                    <div className="step-label font-Yantramanav fw-400">
                                    </div>
                                </a>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="col-12">
                        <div className="">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderDetail;

// Auto-mount when included directly as a script module
if (typeof window !== 'undefined') {
    const el = document.getElementById('react-orderdetail-root');
    if (el) {
        const root = createRoot(el);
        root.render(<OrderDetail />);
    }
}
