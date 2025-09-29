import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Header from '../layouts/Navbar.jsx';
import Footer from '../layouts/Footer.jsx';
import LoginModal from '../components/login.jsx';
import SignupModal from '../components/signup.jsx';
import VerifyEmailModal from '../components/verifyEmail.jsx';
import ChangePasswordModal from '../components/changePassword.jsx';
import EditProfileModal from '../components/editProfile.jsx';
import { getMyOrders } from '../services/order.js';
import '../styles/bootstrap';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState(null);

    // Function to get CSRF token
    const getCsrf = () => {
        const token = document.querySelector('meta[name="csrf-token"]');
        return token ? token.getAttribute('content') : '';
    };

    // Fetch orders data
    const fetchOrders = async (page = 1) => {
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await getMyOrders(page);
            if (response.success) {
                setOrders(response.data || []);
                setPagination(response.pagination || null);
            } else {
                setError(response.message || 'Failed to fetch orders');
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to load orders');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Handle pagination
    const handlePageChange = (page) => {
        fetchOrders(page);
    };

    // Format date helper
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // Get status text
    const getStatusText = (status) => {
        switch (status) {
            case 1: return 'placed';
            case 2: return 'shipping';
            case 3: return 'out for delivery';
            case 4: return 'deliverd';
            case 5: return 'cancel';
            default: return 'placed';
        }
    };

    // Render pagination
    const renderPagination = () => {
        if (!pagination) return null;

        const { current_page, last_page, links } = pagination;
        
        return (
            <div className="pagination-order py-3 d-flex align-items-center justify-content-center">
                <nav aria-label="Page navigation example mb-4">
                    <ul className="pagination align-items-center">
                        {/* Previous button */}
                        {links && links.length > 0 && (
                            <li className={`page-item ${current_page === 1 ? 'disabled' : ''}`}>
                                <button 
                                    className="page-link custom-page fw-500 font-Yantramanav px-1 icon-prev"
                                    onClick={() => handlePageChange(current_page - 1)}
                                    disabled={current_page === 1}
                                >
                                    <img src="/webassets/img/right-arrow-pagi.svg" alt="Previous" />
                                </button>
                            </li>
                        )}

                        {/* Page numbers */}
                        {Array.from({ length: last_page }, (_, i) => i + 1).map((page) => (
                            <li key={page} className="page-item">
                                <button
                                    className={`page-link custom-page fw-500 font-Yantramanav ${page === current_page ? 'active' : ''}`}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            </li>
                        ))}

                        {/* Next button */}
                        {links && links.length > 0 && (
                            <li className={`page-item ${current_page === last_page ? 'disabled' : ''}`}>
                                <button 
                                    className="page-link custom-page fw-500 font-Yantramanav px-1 next-icon"
                                    onClick={() => handlePageChange(current_page + 1)}
                                    disabled={current_page === last_page}
                                >
                                    <img src="/webassets/img/left-arrow-pagi.svg" alt="Next" />
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        );
    };

    if (isLoading) {
        return (
            <>
                <section className="py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="border-line"></div>
                                <h2 className="text-capitalize">My orders</h2>
                            </div>
                            <div className="col-12 text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3">Loading your orders...</p>
                            </div>
                        </div>
                    </div>
                </section>
                <LoginModal />
                <SignupModal />
                <VerifyEmailModal />
                <ChangePasswordModal />
                <EditProfileModal />
            </>
        );
    }

    if (error) {
        return (
            <>
                
                <section className="py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="border-line"></div>
                                <h2 className="text-capitalize" style={{ fontSize: "2.5rem"}}>My orders</h2>
                            </div>
                            <div className="col-12 text-center py-5">
                                <div className="alert alert-danger">
                                    <h4 style={{ fontSize: "1.25rem"}}>Error</h4>
                                    <p>{error}</p>
                                    <button className="btn btn-primary" onClick={() => fetchOrders()}>
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <LoginModal />
                <SignupModal />
                <VerifyEmailModal />
                <ChangePasswordModal />
                <EditProfileModal />
                
            </>
        );
    }

    return (
        <>
            
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="border-line"></div>
                            <h2 className="text-capitalize">My orders</h2>
                        </div>
                        {orders.length > 0 ? (
                            <div className="col-12 pt-4">
                                <div className="">
                                    <div className="table-responsive table-height ">
                                        <table className=" w-100 table cart-table my-order-table">
                                            <tbody style={{ verticalAlign: 'middle' }} className="order-tbody my-order-tbody">
                                                {orders.map((singleitem) => (
                                                    <tr key={singleitem.id} style={{ borderRadius: '10px', height: '60px', borderStyle: 'none !important' }} className="bg-white border-radius-tr">
                                                        <td className="py-3" style={{ textAlign: 'start', fontSize: '16px', fontStyle: 'normal', fontWeight: '500' }}>
                                                            <div className="d-flex justify-content-start gap-3 cilent-profile-column">
                                                                <img 
                                                                    src={`/storage/${singleitem.product?.product_images?.[0]?.image_url}`} 
                                                                    className="client-profile cart-client-profile"
                                                                    alt={singleitem.product?.title}
                                                                />
                                                                <div>
                                                                    <p className="font-oswald f20 fw-400 one-line text-black mb-0 cart-item-title">
                                                                        {singleitem.product?.title}
                                                                    </p>
                                                                    <div className="d-flex align-items-center gap-2">
                                                                        <p className="qty-btn font-Yantramanav mt-2">Qty: {singleitem.qty}</p>
                                                                        <p className="qty-btn font-Yantramanav mt-2">
                                                                            Size: {singleitem.variant?.length}ftX{singleitem.variant?.width}ftx{singleitem.variant?.thickness}mm
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-3" style={{ textAlign: 'center', fontSize: '16px', fontStyle: 'normal', fontWeight: '600' }}>
                                                            <span className="primary-theme item-price">
                                                                $ {singleitem.discount_price * singleitem.qty}
                                                            </span>
                                                        </td>
                                                        <td className="py-3" style={{ textAlign: 'center', fontSize: '16px', fontStyle: 'normal', fontWeight: '600' }}>
                                                            {singleitem.delivertack && (
                                                                <h6 className="font-Yantramanav sky-blue-text mb-0">
                                                                    Delivered on {formatDate(singleitem.delivertack.created_at)}
                                                                </h6>
                                                            )}
                                                            <p className="mb-0 fw-400 thank-text font-Yantramanav lh-base">
                                                                Your Item has been {getStatusText(singleitem.status)}
                                                            </p>
                                                            {singleitem.delivertack && (
                                                                <a href={`/product-detail/${singleitem.product_id}`}>
                                                                    <span className="mb-0 fw-400 thank-text font-Yantramanav primary-theme">
                                                                        <i className="fa fa-star me-2" aria-hidden="true"></i>
                                                                        Rate & Review Product delivered
                                                                    </span>
                                                                </a>
                                                            )}
                                                        </td>
                                                        <td className="py-3" style={{ textAlign: 'end', fontSize: '16px', fontStyle: 'normal', fontWeight: '600' }}>
                                                            <a href={`/order-detail/${singleitem.id}`} className="rounded-pill green-btn">
                                                                View Details
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {renderPagination()}
                                </div>
                            </div>
                        ) : (
                            <div className="col-12 ">
                                <div className="empty-cart text-center h-100 py-5">
                                    <img src="/webassets/img/EmptyCart.svg" className="img-fluid" alt="Empty orders" />
                                    <h4 className="fw-400">Hey, it's feel so light</h4>
                                    <p className="fw-400 pb-2">There is nothing in your order. Let's add some items.</p>
                                    <a href="/wishlist" className="green-btn py-3">Add Items From Wishlist</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Login and Signup Modals */}
            <LoginModal />
            <SignupModal />
            <VerifyEmailModal />
            <ChangePasswordModal />
            <EditProfileModal />

            
        </>
    );
};

export default MyOrders;

// Auto-mount when included directly as a script module
if (typeof window !== 'undefined') {
    const el = document.getElementById('react-myorders-root');
    if (el) {
        const root = createRoot(el);
        root.render(<MyOrders />);
    }
}
