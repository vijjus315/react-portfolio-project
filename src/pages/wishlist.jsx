import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { getWishlistItems, addToWishlist, removeFromWishlist } from '../services/wishlist.js';
import { isAuthenticated } from '../services/auth.js';
import { getImageUrl } from '../utils/imageUtils.js';
import LoginModal from '../components/login.jsx';
import SignupModal from '../components/signup.jsx';
import VerifyEmailModal from '../components/verifyEmail.jsx';
import ChangePasswordModal from '../components/changePassword.jsx';
import EditProfileModal from '../components/editProfile.jsx';
import '../styles/bootstrap';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check authentication status and fetch wishlist items on component mount
    useEffect(() => {
        const checkAuthAndFetch = async () => {
            try {
                const authenticated = isAuthenticated();
                setIsLoggedIn(authenticated);
                
                if (authenticated) {
                    await fetchWishlistItems();
                } else {
                    // For non-logged-in users, show empty wishlist immediately
                    setIsLoading(false);
                    setWishlistItems([]);
                }
            } catch (err) {
                console.error('Error checking authentication:', err);
                setIsLoading(false);
                setError('Failed to check authentication status');
            }
        };
        
        checkAuthAndFetch();
    }, []);

    const fetchWishlistItems = async () => {
        try {
            setIsLoading(true);
            const response = await getWishlistItems();
            if (response.success) {
                setWishlistItems(response.body || []);
            } else {
                setError(response.message || 'Failed to fetch wishlist items');
            }
        } catch (err) {
            console.error('Error fetching wishlist items:', err);
            setError('Failed to fetch wishlist items');
        } finally {
            setIsLoading(false);
        }
    };

    const handleWishlistToggle = async (productId, isInWishlist) => {
        // Don't allow wishlist operations for non-logged-in users
        if (!isLoggedIn) {
            if (window.toastr) {
                window.toastr.warning('Please log in to manage your wishlist.');
            } else {
                alert('Please log in to manage your wishlist.');
            }
            return;
        }

        try {
            if (isInWishlist) {
                // Remove from wishlist
                const response = await removeFromWishlist(productId);
                if (response.success) {
                    setWishlistItems(prev => prev.filter(item => item.product_id !== productId));
                    // Dispatch event to update header count
                    window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
                        detail: { isAdded: false } 
                    }));
                }
            } else {
                // Add to wishlist
                const response = await addToWishlist(productId);
                if (response.success) {
                    // Refresh wishlist items
                    fetchWishlistItems();
                    // Dispatch event to update header count
                    window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
                        detail: { isAdded: true } 
                    }));
                }
            }
        } catch (err) {
            console.error('Error toggling wishlist:', err);
        }
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = (rating - fullStars) >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        return (
            <div className="d-flex align-items-center gap-1">
                {[...Array(fullStars)].map((_, i) => (
                    <i key={i} className="fa fa-star" aria-hidden="true"></i>
                ))}
                {halfStar === 1 && (
                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <i key={i} className="fa fa-star-o" aria-hidden="true"></i>
                ))}
            </div>
        );
    };

    if (isLoading) {
        return (
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="border-line"></div>
                            <h2 className="text-capitalize">My Wishlist</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-3">Loading your wishlist...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="border-line"></div>
                            <h2 className="text-capitalize">My Wishlist</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center py-5">
                            <div className="alert alert-danger">
                                <h4>Error</h4>
                                <p>{error}</p>
                                <button className="btn btn-primary" onClick={fetchWishlistItems}>
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
        <section className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="border-line"></div>
                        <h2 className="text-capitalize">My Wishlist</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="row pt-4">
                        {wishlistItems.length > 0 ? (
                            wishlistItems.map((item) => {
                                const product = item.wishlist_products;
                                const variant = product?.product_variants?.[0];
                                const isInWishlist = true; // Since it's in wishlist
                                
                                return (
                                    <div key={item.id} className="col-md-6 col-lg-3 mb-3">
                                        <div className="feature-pro">
                                            <div className="product-feature-img product-bg position-relative">
                                                <a href={`/product-detail/${product?.slug}`}>
                                                    <img 
                                                        src={product?.product_images?.[0] ? getImageUrl(product.product_images[0].image_url) : '/webassets/img/placeholder.jpg'} 
                                                        className="img-fluid product-pic"
                                                        alt={product?.title}
                                                    />
                                                </a>
                                                <a 
                                                    className="icon-wish-product addwishlist" 
                                                    data-product-id={item.product_id} 
                                                    data-in-wishlist={isInWishlist}
                                                    onClick={() => handleWishlistToggle(item.product_id, isInWishlist)}
                                                >
                                                    <img 
                                                        src={`${window.location.origin}/webassets/img/green-wishlist-bg.svg`} 
                                                        className="wishlist-icon"
                                                        alt="Remove from wishlist"
                                                    />
                                                </a>
                                            </div>
                                            <div className="px-3 py-4">
                                                <h3 className="mb-2 fw-400 one-line">
                                                    <a href={`/product-detail/${product?.slug}`} className="text-black">
                                                        {product?.title}
                                                    </a>
                                                </h3>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="">
                                                        <p className="mb-0">
                                                            <span className="primary-theme price-offer">
                                                                ${variant?.discounted_price || variant?.price || '0'}.00
                                                            </span>
                                                            {variant?.discounted_price && variant?.price && variant.discounted_price !== variant.price && (
                                                                <span className="price-old ms-2">
                                                                    ${variant.price}.00
                                                                </span>
                                                            )}
                                                        </p>
                                                        {renderStars(product?.average_rating || 0)}
                                                    </div>
                                                    <a href={`/product-detail/${product?.slug}`}>
                                                        <img src={`${window.location.origin}/webassets/img/cart.svg`} alt="View product" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-12">
                                <div className="empty-cart text-center h-100 py-5">
                                    <img 
                                        src={`${window.location.origin}/webassets/img/EmptyCart.svg`} 
                                        className="img-fluid"
                                        alt="Empty wishlist"
                                    />
                                    <h4 className="fw-400">Hey, it's feel so light</h4>
                                    <p className="fw-400 pb-2">There is nothing in your wishlist. Let's add some items.</p>
                                    {!isLoggedIn && (
                                        <div className="mt-3">
                                            <button 
                                                className="btn text-white" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#loginmodal" 
                                                type="button"
                                                style={{ backgroundColor: "var(--primary-theme)",
                                                color: "#fff", padding: "12px 28px", fontSize: "1rem" }}
                                            >
                                                Login to manage wishlist
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
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

// Auto-mount when included directly as a script module
if (typeof window !== 'undefined') {
    const el = document.getElementById('react-wish-root');
    if (el) {
        const root = createRoot(el);
        root.render(<Wishlist />);
    }
}

export default Wishlist;