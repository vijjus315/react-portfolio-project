// import React, { useEffect, useMemo, useState } from 'react';
// import { createRoot } from 'react-dom/client';
// import '../styles/bootstrap';
// import Header from '../layouts/Navbar.jsx';
// import Footer from '../layouts/Footer.jsx';
// import Reviews from '../components/review.jsx';
// import CustomCourtModal from '../components/customeCourt.jsx';
// import LoginModal from '../components/login.jsx';
// import SignupModal from '../components/signup.jsx';
// import VerifyEmailModal from '../components/verifyEmail.jsx';
// import ChangePasswordModal from '../components/changePassword.jsx';
// import EditProfileModal from '../components/editProfile.jsx';
// import { getProductBySlug, getProductById } from '../services/product.js';
// import { getImageUrl, getVideoUrl } from '../utils/imageUtils.js';
// import { addToCart, getCartItems } from '../services/cart.js';

// //! import useLocalStorage
// import { useLocalStorage } from '../customHooks/useLocalStorage.jsx';

// function getSlugFromLocation() {
//     try {
//         const parts = (window.location.pathname || '').split('/').filter(Boolean);
//         const idx = parts.findIndex(p => p === 'product-detail');
//         if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];

//         const el = document.getElementById('react-product-detail-root');
//         if (el && el.dataset && el.dataset.slug) return el.dataset.slug;
//     } catch (_) {}
//     return '';
// }

// function getProductIdFromLocation() {
//     try {
//         // Try to get product ID from URL parameters
//         const urlParams = new URLSearchParams(window.location.search);
//         const productId = urlParams.get('id') || urlParams.get('product_id');
//         if (productId) return productId;

//         // Try to get from pathname if it's in the format /product-detail/4 or similar
//         const parts = (window.location.pathname || '').split('/').filter(Boolean);
//         const idx = parts.findIndex(p => p === 'product-detail');
//         if (idx !== -1 && parts[idx + 1]) {
//             // Check if the next part is a number (product ID)
//             const potentialId = parts[idx + 1];
//             if (!isNaN(potentialId)) return potentialId;
//         }

//         // Try to get from dataset
//         const el = document.getElementById('react-product-detail-root');
//         if (el && el.dataset && el.dataset.productId) return el.dataset.productId;
//     } catch (_) {}
//     return null;
// }

// function getUserId() {
//     try {
//         // Try to get user ID from localStorage
//         const userData = localStorage.getItem('user_data');
//         if (userData) {
//             const parsed = JSON.parse(userData);
//             return parsed.id || parsed.user_id || 34; // fallback to default
//         }
        
//         // Try to get from auth token or other sources
//         const authToken = localStorage.getItem('auth_token');
//         if (authToken) {
//             // You might need to decode the token to get user ID
//             // For now, return default
//             return 34;
//         }
//     } catch (_) {}
//     return 34; // Default user ID
// }

// // Dummy product list
// const DUMMY_PRODUCTS = [
//   {
//     id: 'fb-1',
//     title: 'Premium Spike Ball Court',
//     slug: 'premium-spike-ball-court',
//     average_rating: 0,
//     category: { id: 3, title: 'SPIKE BALL COURTS' },
//     product_images: [
//       { image_url: 'https://www.portacourts.com/storage/images/bz80kmVC0wHP1aSYI4AJ3RfifHp36YpDOcAEEURj.jpg' },
//       { image_url: 'https://www.portacourts.com/storage/images/MwOWDU6u3gZWw2xGZKLhzMEtaTrD1uCWNzeOxZr7.jpg' },
//       { image_url: 'https://www.portacourts.com/storage/images/1mwIKdn4x9UgwWgKeZYBMTXUfISXhMC79Zvndj93.jpg' },
//       { image_url: 'https://www.portacourts.com/storage/images/LXgJdOo0LJenoJGkcrXbs2tDDhFmuzV8aYmk4YRg.jpg' },
//       { image_url: 'https://www.portacourts.com/storage/images/VdVUqOQYn0r9MzeM0xMS1GSClVPWv7VSfzixU004.jpg' },
//       { image_url: 'https://www.portacourts.com/storage/images/3NQISPIM4mEq7dIlUy7QFFdMNwRNcid5wZ9u7OuA.jpg' },
//       { image_url: 'https://www.portacourts.com/storage/images/yUitO7Vwhio6cW6v4RuGTxAQj6gB0lkyqFwEaHps.jpg' },
//     ],
//     variants: [
//       {
//         type: "standard",
//         price: 5200,
//         discounted_price: 4160,
//         length: 20,
//         width: 10,
//         thickness: 30,
//         discount: 20,
//       },
//       {
//         type: "shipping",
//         domestic: "Flat fee of $350 within the U.S.",
//         international: "International shipping available (email for quote).",
//       },
//       {
//         type: "preOrder",
//         offer: "10% OFF on Pre-Orders",
//         expectedDelivery: "Early October 2025 or earlier",
//       },
//     ],
//     description: `<p>What if your workout could feel more like play? With our portable Spikeball Courts, you can make every session the most exciting part of your day. Our professional-grade courts are scientifically designed to provide superior bounce and stability, offering the finest experience in each rally. Lightweight material and tool-free assembly ensure that you can have your court ready on the go with no hassle. Plus, with a minimum service life of 3-5 years, you won't have to worry about wear and tear, even in the harshest conditions.</p>`,
//     video: null,
//   },
// ];

// const ProductDetail = () => {
//     const [allProducts, setAllProducts] = useState([]);
//     const [product, setProduct] = useState(null);
//     const [activeImageIdx, setActiveImageIdx] = useState(0);
//     const [activeVariantIdx, setActiveVariantIdx] = useState(0);
//     const [quantity, setQuantity] = useState(1);
//     // const [review, setReview] = useState(0);
//     const [showCourtModal, setShowCourtModal] = useState(false);
//     const [isAddingToCart, setIsAddingToCart] = useState(false);
//     const [cartItems, setCartItems] = useState([]);

//     // useLocalStorage
//     const { setItem } = useLocalStorage('value');

//     // Helper function to update cart count in localStorage
//     const updateCartCountInStorage = (cartItems) => {
//         const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
//         localStorage.setItem('cart_count', totalItems.toString());
//     };

//     const handleModal = () => {
//         setShowCourtModal(true);
//     }

//     useEffect(() => {
//         async function loadProduct() {
//             const slug = getSlugFromLocation();
//             const productId = getProductIdFromLocation();
//             const userId = getUserId();
            
//             if (!slug && !productId) {
//                 // Fallback to dummy data if no slug or product ID
//                 const list = DUMMY_PRODUCTS;
//                 setAllProducts(list);
//                 setProduct(list[0] || null);
//                 return;
//             }

//             try {
//                 let productData = null;

//                 // Priority 1: If we have product ID, use getProductById (most reliable)
//                 if (productId) {
//                     productData = await getProductById(productId, userId);
//                 }
                
//                 // Priority 2: If no product ID or failed, try by slug
//                 if (!productData && slug) {
//                     productData = await getProductBySlug(slug, userId);
//                 }

//                 if (productData) {
//                     // Transform API data to match expected format
//                     const transformedProduct = {
//                         id: productData.id,
//                         title: productData.title,
//                         slug: productData.slug,
//                         average_rating: productData.average_rating || 0,
//                         rating_count: productData.rating_count || 0,
//                         category_id: productData.cat_id,
//                         product_images: productData.product_images || [],
//                         variants: productData.product_variants || [],
//                         description: productData.description,
//                         video: productData.video,
//                         is_featured: productData.is_featured,
//                         is_fav: productData.is_fav,
//                         ratings: productData.ratings || [],
//                         status: productData.status,
//                         created_at: productData.created_at,
//                         updated_at: productData.updated_at
//                     };
//                     setProduct(transformedProduct);
//                     setAllProducts([transformedProduct]);
//                 } else {
//                     // Fallback to dummy data if product not found
//                     const list = DUMMY_PRODUCTS;
//                     setAllProducts(list);
//                     const found = list.find(p => p.slug === slug) || list[0] || null;
//                     setProduct(found);
//                 }
//             } catch (error) {
//                 console.error('Failed to load product data', error);
//                 // Fallback to dummy data on error
//                 const list = DUMMY_PRODUCTS;
//                 setAllProducts(list);
//                 const found = list.find(p => p.slug === slug) || list[0] || null;
//                 setProduct(found);
//             }
//         }
//         loadProduct();
//     }, []);

//     // Fetch cart items on component mount
//     useEffect(() => {
//         const fetchCartItems = async () => {
//             try {
//                 console.log('📋 ProductDetail: Fetching existing cart items (READ ONLY)');
//                 const response = await getCartItems();
//                 if (response.success && response.body && response.body.cartItems) {
//                     console.log('📋 ProductDetail: Found existing cart items:', response.body.cartItems.length, 'items');
//                     setCartItems(response.body.cartItems);
//                     // Update cart count in localStorage
//                     updateCartCountInStorage(response.body.cartItems);
//                 } else {
//                     console.log('📋 ProductDetail: No cart items found');
//                     updateCartCountInStorage([]);
//                 }
//             } catch (error) {
//                 console.error('Error fetching cart items:', error);
//             }
//         };
//         fetchCartItems();
//     }, []);

//     // Buy Now handler
//     const handleBuyNow = async () => {
//         // console.log('🛒 Buy Now button clicked - Starting cart addition process');
        
//         if (!product || !product.variants || product.variants.length === 0) {
//             //console.error('No product or variants available');
//             return;
//         }

//         const variant = product.variants[activeVariantIdx];
//         if (!variant || !variant.id) {
//             //console.error('No valid variant selected');
//             return;
//         }

//         console.log('🛒 Adding product to cart:', {
//             productId: product.id,
//             variantId: variant.id,
//             quantity: quantity
//         });

//         setIsAddingToCart(true);

//         try {
//             // Check if item already exists in cart
//             const existingCartItem = cartItems.find(item => 
//                 item.product_id === product.id && item.variant_id === variant.id
//             );

//             if (existingCartItem) {
//                 // If item exists, update quantity
//                 const newQuantity = existingCartItem.quantity + quantity;
//                 const { updateCartItemQuantity } = await import('../services/cart.js');
//                 await updateCartItemQuantity(product.id, newQuantity, variant.id);
                
//                 // Update local cart items and localStorage
//                 const updatedItems = cartItems.map(item => 
//                     item.id === existingCartItem.id 
//                         ? { ...item, quantity: newQuantity }
//                         : item
//                 );
//                 setCartItems(updatedItems);
//                 updateCartCountInStorage(updatedItems);
//             } else {
//                 // If item doesn't exist, add to cart
//                 await addToCart(product.id, quantity, variant.id);
                
//                 // Update local cart items and localStorage
//                 const newItem = {
//                     id: Date.now(), // Temporary ID for local state
//                     product_id: product.id,
//                     variant_id: variant.id,
//                     quantity: quantity,
//                     product_variants: variant,
//                     products: { id: product.id, title: product.title }
//                 };
//                 const updatedItems = [...cartItems, newItem];
//                 setCartItems(updatedItems);
//                 updateCartCountInStorage(updatedItems);
//                 //! use setItems
//                 setItem(updatedItems);
//             }

//             // Dispatch cart update event for header
//             window.dispatchEvent(new CustomEvent('cartUpdated'));

//             // Show success message (you can replace this with a toast notification)
//             // alert('Product added to cart successfully!');
            
//             // Redirect to cart page
//             window.location.href = '/cart';

//         } catch (error) {
//             console.error('Error adding to cart:', error);
//             alert('Failed to add product to cart. Please try again.');
//         } finally {
//             setIsAddingToCart(false);
//         }
//     };

//     const images = useMemo(() => {
//         if (!product) return [];
//         const imgs = product.product_images || [];
//         return imgs.map(i => getImageUrl(i.image_url));
//     }, [product]);

//     const variant = useMemo(() => {
//         if (!product) return {};
//         const arr = product.variants || [];
//         return arr[activeVariantIdx] || arr[0] || {};
//     }, [product, activeVariantIdx]);

//     if (!product) {
//         return (
//             <>
//                 <section className="py-5">
//                     <div className="container">
//                         <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
//                             <div className="text-center">
//                                 <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
//                                     <span className="visually-hidden">Loading...</span>
//                                 </div>
//                                 <p className="mt-3 text-muted">Loading product details...</p>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </>
//         );
//     }

//     return (
//         <>
//             {/* Main Product Sectioon */}
//             <section className="py-5">
//                 <div className="container">
//                     <div className="row">

//                         {/* LEFT COLUMN: Product Image Gallery slider*/}
//                         <div className="col-lg-6">
//                             <div className="">
//                                 <div className="slider__flex ">

//                                     {/* Thumbnails */}
//                                     <div className="slider__col">
//                                         <div className="slider_thumbs">
//                                             {/* slider bana lena  */}
//                                             <div className="swiper-container overflow-scroll" style={{ height: "550px"}}>
//                                                 <div className="thumbnail-slider d-flex flex-lg-column gap-0.5">
//                                                     {images.map((src, idx) => (
//                                                         <div key={idx} className="swiper-slide" onClick={() => setActiveImageIdx(idx)} 
//                                                         style={{cursor:'pointer', 
//                                                             color: "#0d6efd", 
//                                                             border: idx === activeImageIdx ? "2px Solid blue" : "1px solid #ccc",
//                                                         }}>
//                                                             <div className="slider__image">
//                                                                 <img src={src} className="img-fluid d-block" />
//                                                             </div>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Main Image */}
//                                     <div className="slider__images" style={{ height: "400px" }} >
//                                         <div className="swiper-container border">
//                                             <div className="swiper-wrapper ">
//                                                 <div className="swiper-slide">
//                                                     <div className="slider__image ">
//                                                         <img src={images[activeImageIdx]}
//                                                         className="img-fluid"
//                                                         style={{ height: "550px", objectFit: "cover", width: "100%" }}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* RIGHT COLUMN: Product Info */}
//                         <div className="col-lg-6 mt-4 mt-lg-0">
//                             <div className="product-slider-detail">
//                                 <h2 className="fw-400 mb-3 product-name">{product.title}</h2>

//                                 <div className="d-flex align-items-center gap-4 mb-3">
//                                     <div className="rating-product">
//                                         {/* {[...Array(5)].map((_, i) => (
//                                             <i key={i} className={i < Math.floor(product.average_rating || 0) ? 'fa fa-star': 'https://www.portacourts.com/webassets/img/grey-star.svg'} />
//                                         ))} */}
//                                         {[...Array(5)].map((_, i) => i < Math.floor(product.average_rating || 0) ? (
//                                             <i key={i} className="fa fa-star" />
//                                         ) : (
//                                         <img key={i} 
//                                         src="https://www.portacourts.com/webassets/img/grey-star.svg"
//                                         alt="grey star" className="star-icon"
//                                         />
//                                         )
//                                         )}
//                                     </div>
//                                 </div>
//                                 <hr />

//                                 {/* Variant Size */}
//                                 <h6 className="mb-2 fw-700 f20">Size</h6>
//                                 <div className="variant-select-not">
//                                     <div className="variant-box position-relative">
//                                         <div className="variant-data">
//                                             {variant.length} ft X {variant.width} ft X {variant.thickness} mm
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <hr />

//                                 {/* Pricing */}
//                                 <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
//                                     <h1 className=" mb-0 product-price sky-blue-text fw-500">${variant.discounted_price}.<span className="f18-size">00</span></h1>
//                                     <h3 className="mb-0 price-strike fw-400 font-Yantramanav">${variant.price}.00</h3>
//                                     {!!variant.discount && (<p className="green-btn mb-0 savepro-btn fw-400">Save {variant.discount}%</p>)}
//                                     <p className="productvariant mb-3"><b>Shipping:</b><br/> Flat fee of $350 within the U.S.<br/> International shipping available (email for quote).<br/><b>Pre-Order Offer:</b><br/>✅ 10% OFF on Pre-Orders<br/>📦 Expected Delivery: Early October 2025 or earlier</p>
//                                 </div>
//                                 <hr />

//                                 {/* Category */}
//                                 <h6 className="mb-2 fw-700 f20 ">Category</h6>
//                                 <div className="d-flex align-items-center gap-3 mb-3">
//                                     <p className="fw-400 f20 mb-0">{(product.category && product.category.title) || ''}</p>
//                                 </div>

//                                 {/* Quantity */}
//                                 <h6 className="mb-3 fw-700 f20 ">Quantity</h6>
//                                 <div className="mt-3 mb-4 d-flex align-items-center gap-2">
//                                     <span className="minus-pro" onClick={() => setQuantity(q => Math.max(1, q - 1))}><i className="fa fa-minus"></i></span>
//                                     <span className="num">{String(quantity).padStart(2,'0')}</span>
//                                     <span className="plus-pro" onClick={() => setQuantity(q => q + 1)}><i className="fa fa-plus"></i></span>
//                                 </div>

//                                 {/* Action Buttons */}
//                                 <div className="gap-5 quantity-wrapper py-4">
//                                     <div className="mt-3 mt-sm-0 edit-wrapper  d-block align-items-center  d-sm-flex gap-4">
//                                         <button onClick={handleModal} className="green-btn f16 " type="button">Request Custom Court</button>
//                                         <button 
//                                             className="green-btn f16" 
//                                             onClick={handleBuyNow}
//                                             disabled={isAddingToCart}
//                                             style={{ 
//                                                 opacity: isAddingToCart ? 0.6 : 1,
//                                                 cursor: isAddingToCart ? 'not-allowed' : 'pointer'
//                                             }}
//                                         >
//                                             {isAddingToCart ? (
//                                                 <>
//                                                     <div className="spinner-border spinner-border-sm me-2" role="status">
//                                                         <span className="visually-hidden">Loading...</span>
//                                                     </div>
//                                                     Adding...
//                                                 </>
//                                             ) : (
//                                                 'Buy Now'
//                                             )}
//                                         </button>
//                                         <a className=" addwishlist topwish-list">
//                                             <img src={`${window.location.origin}/webassets/img/unfillwishlist.svg`} className="wishlist-icon" />
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div> 
//                         </div>
//                     </div>
//                     {/* Bottom Section: Description & Reviews */}
//                     <div className="row mt-3">
//                         <div className="col-12">
//                             <div className="description-product">
//                                 <nav>
//                                     <div className="nav mb-3 border-0" id="nav-tab" role="tablist">
//                                         <button 
//                                         className="font-oswald fw-500 bg-transparent nav-link active"
//                                         id="description-tab"
//                                         data-bs-toggle="tab"
//                                         data-bs-target="#description"
//                                         type="button"
//                                         role="tab"
//                                         aria-controls="description"
//                                         aria-selected="true"
//                                         >
//                                             <h3>Description</h3>
//                                         </button>
                                        
//                                         <button
//                                         className="font-oswald fw-500 bg-transparent nav-link"
//                                         id="review-tab"
//                                         data-bs-toggle="tab"
//                                         data-bs-target="#review"
//                                         type="button"
//                                         role="tab"
//                                         aria-controls="review"
//                                         aria-selected="false"
//                                         >
//                                             <h3>Reviews</h3>
//                                         </button>
//                                     </div>
//                                 </nav>
//                                 <div className="tab-content" id="nav-tabContent">
                                    
//                                     {/* Description Tab */}
//                                 <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
//                                     <div className="row">
//                                         <div className={product.video ? 'col-lg-7' : 'col-lg-12'}>
//                                             <p 
//                                             className="fw-400 f16 font-Yantramanav lh-lg"
//                                             dangerouslySetInnerHTML={{ __html: product.description || '' }}
//                                             />
//                                         </div>
//                                         {product.video && (
//                                         <div className="col-lg-5 mt-3 mt-lg-0">
//                                             <video height="365" controls style={{ width: '100%' }}>
//                                                 <source src={getVideoUrl(product.video)} type="video/mp4" />
//                                             </video>
//                                         </div>
//                                         )}
//                                     </div>
//                                 </div>
//                                 {/* Reviews Tab */}
//                                 <Reviews productRatings={product.ratings || []} />
                                
//                             </div>
//                         </div>
//                     </div>
//                     </div>
//                 </div>
//             </section>
//             {/* court modal */}
//             {showCourtModal && <CustomCourtModal onClose={() => setShowCourtModal(false)} />}
            
//             {/* Login and Signup Modals */}
//             <LoginModal />
//             <SignupModal />
//             <VerifyEmailModal />
//             <ChangePasswordModal />
//             <EditProfileModal />
        
//         </>
//     );
// };

// export default ProductDetail;

// if (typeof window !== 'undefined') {
//     const el = document.getElementById('react-product-detail-root');
//     if (el) {
//         const root = createRoot(el);
//         root.render(<ProductDetail />);
//     }
// }





import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/bootstrap';
import Header from '../layouts/Navbar.jsx';
import Footer from '../layouts/Footer.jsx';
import Reviews from '../components/review.jsx';
import CustomCourtModal from '../components/customeCourt.jsx';
import LoginModal from '../components/login.jsx';
import SignupModal from '../components/signup.jsx';
import VerifyEmailModal from '../components/verifyEmail.jsx';
import ChangePasswordModal from '../components/changePassword.jsx';
import EditProfileModal from '../components/editProfile.jsx';
import { getProductBySlug, getProductById } from '../services/product.js';
import { getImageUrl, getVideoUrl } from '../utils/imageUtils.js';
import { addToCart, getCartItems } from '../services/cart.js';
import { addToWishlist, removeFromWishlist } from '../services/wishlist.js';
import { isAuthenticated } from '../services/auth.js';

//! import useLocalStorage
import { useLocalStorage } from '../customHooks/useLocalStorage.jsx';

function getSlugFromLocation() {
    try {
        const parts = (window.location.pathname || '').split('/').filter(Boolean);
        const idx = parts.findIndex(p => p === 'product-detail');
        if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];

        const el = document.getElementById('react-product-detail-root');
        if (el && el.dataset && el.dataset.slug) return el.dataset.slug;
    } catch (_) {}
    return '';
}

function getProductIdFromLocation() {
    try {
        // Try to get product ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id') || urlParams.get('product_id');
        if (productId) return productId;

        // Try to get from pathname if it's in the format /product-detail/4 or similar
        const parts = (window.location.pathname || '').split('/').filter(Boolean);
        const idx = parts.findIndex(p => p === 'product-detail');
        if (idx !== -1 && parts[idx + 1]) {
            // Check if the next part is a number (product ID)
            const potentialId = parts[idx + 1];
            if (!isNaN(potentialId)) return potentialId;
        }

        // Try to get from dataset
        const el = document.getElementById('react-product-detail-root');
        if (el && el.dataset && el.dataset.productId) return el.dataset.productId;
    } catch (_) {}
    return null;
}

function getUserId() {
    try {
        // Try to get user ID from localStorage
        const userData = localStorage.getItem('user_data');
        if (userData) {
            const parsed = JSON.parse(userData);
            return parsed.id || parsed.user_id || 34; // fallback to default
        }
        
        // Try to get from auth token or other sources
        const authToken = localStorage.getItem('auth_token');
        if (authToken) {
            // You might need to decode the token to get user ID
            // For now, return default
            return 34;
        }
    } catch (_) {}
    return 34; // Default user ID
}

// Dummy product list
const DUMMY_PRODUCTS = [
  {
    id: 'fb-1',
    title: 'Premium Spike Ball Court',
    slug: 'premium-spike-ball-court',
    average_rating: 0,
    category: { id: 3, title: 'SPIKE BALL COURTS' },
    product_images: [
      { image_url: 'https://www.portacourts.com/storage/images/bz80kmVC0wHP1aSYI4AJ3RfifHp36YpDOcAEEURj.jpg' },
      { image_url: 'https://www.portacourts.com/storage/images/MwOWDU6u3gZWw2xGZKLhzMEtaTrD1uCWNzeOxZr7.jpg' },
      { image_url: 'https://www.portacourts.com/storage/images/1mwIKdn4x9UgwWgKeZYBMTXUfISXhMC79Zvndj93.jpg' },
      { image_url: 'https://www.portacourts.com/storage/images/LXgJdOo0LJenoJGkcrXbs2tDDhFmuzV8aYmk4YRg.jpg' },
      { image_url: 'https://www.portacourts.com/storage/images/VdVUqOQYn0r9MzeM0xMS1GSClVPWv7VSfzixU004.jpg' },
      { image_url: 'https://www.portacourts.com/storage/images/3NQISPIM4mEq7dIlUy7QFFdMNwRNcid5wZ9u7OuA.jpg' },
      { image_url: 'https://www.portacourts.com/storage/images/yUitO7Vwhio6cW6v4RuGTxAQj6gB0lkyqFwEaHps.jpg' },
    ],
    variants: [
      {
        type: "standard",
        price: 5200,
        discounted_price: 4160,
        length: 20,
        width: 10,
        thickness: 30,
        discount: 20,
      },
      {
        type: "shipping",
        domestic: "Flat fee of $350 within the U.S.",
        international: "International shipping available (email for quote).",
      },
      {
        type: "preOrder",
        offer: "10% OFF on Pre-Orders",
        expectedDelivery: "Early October 2025 or earlier",
      },
    ],
    description: `<p>What if your workout could feel more like play? With our portable Spikeball Courts, you can make every session the most exciting part of your day. Our professional-grade courts are scientifically designed to provide superior bounce and stability, offering the finest experience in each rally. Lightweight material and tool-free assembly ensure that you can have your court ready on the go with no hassle. Plus, with a minimum service life of 3-5 years, you won't have to worry about wear and tear, even in the harshest conditions.</p>`,
    video: null,
  },
];

const ProductDetail = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [activeImageIdx, setActiveImageIdx] = useState(0);
    const [activeVariantIdx, setActiveVariantIdx] = useState(0);
    const [quantity, setQuantity] = useState(1);
    // const [review, setReview] = useState(0);
    const [showCourtModal, setShowCourtModal] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isFavorited, setIsFavorited] = useState(false);

    // Load existing cart items from localStorage on component mount and when product changes
    useEffect(() => {
        const loadCartItems = () => {
            try {
                const storedCartItems = localStorage.getItem('cart_items');
                if (storedCartItems) {
                    const parsedItems = JSON.parse(storedCartItems);
                    console.log('🛒 Loading existing cart items from localStorage:', parsedItems);
                    setCartItems(parsedItems);
                } else {
                    console.log('🛒 No cart items found in localStorage');
                    setCartItems([]);
                }
            } catch (error) {
                console.error('Error loading cart items from localStorage:', error);
                setCartItems([]);
            }
        };
        
        loadCartItems();
    }, [product?.id]); // Reload when product changes

    // Listen for cart update events from other pages
    useEffect(() => {
        const handleCartUpdate = () => {
            console.log('🛒 Cart update event received, refreshing cart items');
            try {
                const storedCartItems = localStorage.getItem('cart_items');
                if (storedCartItems) {
                    const parsedItems = JSON.parse(storedCartItems);
                    setCartItems(parsedItems);
                }
            } catch (error) {
                console.error('Error refreshing cart items:', error);
            }
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    // useLocalStorage
    // const { setItem } = useLocalStorage('value');

    // Helper function to update cart count in localStorage
    const updateCartCountInStorage = (cartItems) => {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        localStorage.setItem('cart_count', totalItems.toString());
        
        // Also update the cart count in the header immediately
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = totalItems.toString();
        }
        
        console.log('🛒 Updated cart count in storage and header:', totalItems);
    };

    const handleModal = () => {
        setShowCourtModal(true);
    }

    useEffect(() => {
        async function loadProduct() {
            const slug = getSlugFromLocation();
            const productId = getProductIdFromLocation();
            const userId = getUserId();
            
            if (!slug && !productId) {
                // Fallback to dummy data if no slug or product ID
                const list = DUMMY_PRODUCTS;
                setAllProducts(list);
                setProduct(list[0] || null);
                return;
            }

            try {
                let productData = null;

                // Priority 1: If we have product ID, use getProductById (most reliable)
                if (productId) {
                    productData = await getProductById(productId, userId);
                }
                
                // Priority 2: If no product ID or failed, try by slug
                if (!productData && slug) {
                    productData = await getProductBySlug(slug, userId);
                }

                if (productData) {
                    // Transform API data to match expected format
                    const transformedProduct = {
                        id: productData.id,
                        title: productData.title,
                        slug: productData.slug,
                        average_rating: productData.average_rating || 0,
                        rating_count: productData.rating_count || 0,
                        category_id: productData.cat_id,
                        product_images: productData.product_images || [],
                        variants: productData.product_variants || [],
                        description: productData.description,
                        video: productData.video,
                        is_featured: productData.is_featured,
                        is_fav: productData.is_fav,
                        ratings: productData.ratings || [],
                        status: productData.status,
                        created_at: productData.created_at,
                        updated_at: productData.updated_at
                    };
                    setProduct(transformedProduct);
                    setAllProducts([transformedProduct]);
                    // Set initial wishlist status
                    setIsFavorited(productData.is_fav === 1);
                } else {
                    // Fallback to dummy data if product not found
                    const list = DUMMY_PRODUCTS;
                    setAllProducts(list);
                    const found = list.find(p => p.slug === slug) || list[0] || null;
                    setProduct(found);
                }
            } catch (error) {
                console.error('Failed to load product data', error);
                // Fallback to dummy data on error
                const list = DUMMY_PRODUCTS;
                setAllProducts(list);
                const found = list.find(p => p.slug === slug) || list[0] || null;
                setProduct(found);
            }
        }
        loadProduct();
    }, []);

    // Fetch cart items on component mount
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                console.log('📋 ProductDetail: Fetching existing cart items (READ ONLY)');
                const response = await getCartItems();
                if (response.success && response.body && response.body.cartItems) {
                    console.log('📋 ProductDetail: Found existing cart items:', response.body.cartItems.length, 'items');
                    setCartItems(response.body.cartItems);
                    // Update cart count in localStorage
                    updateCartCountInStorage(response.body.cartItems);
                } else {
                    console.log('📋 ProductDetail: No cart items found');
                    updateCartCountInStorage([]);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
        fetchCartItems();
    }, []);

    // Buy Now handler
    const handleBuyNow = async () => {
        console.log('🛒 Buy Now button clicked - Starting cart addition process');
        
        if (!product || !product.variants || product.variants.length === 0) {
            console.error('No product or variants available');
            return;
        }

        const variant = product.variants[activeVariantIdx];
        if (!variant || !variant.id) {
            console.error('No valid variant selected');
            return;
        }

        console.log('🛒 Adding product to cart:', {
            productId: product.id,
            variantId: variant.id,
            quantity: quantity
        });

        setIsAddingToCart(true);

        try {
            // Always get the latest cart items from localStorage before checking
            let currentCartItems = cartItems;
            try {
                const storedCartItems = localStorage.getItem('cart_items');
                if (storedCartItems) {
                    currentCartItems = JSON.parse(storedCartItems);
                    console.log('🛒 Loaded latest cart items from localStorage:', currentCartItems);
                    console.log('🛒 Current cartItems state:', cartItems);
                    console.log('🛒 Using currentCartItems for comparison:', currentCartItems);
                } else {
                    console.log('🛒 No cart items in localStorage, using current state:', cartItems);
                    currentCartItems = cartItems;
                }
            } catch (e) {
                console.error('Error loading cart items from localStorage:', e);
                currentCartItems = cartItems;
            }
            
            // Check if cart is empty
            const isCartEmpty = !currentCartItems || currentCartItems.length === 0;
            console.log('🛒 Cart is empty:', isCartEmpty, 'Current cart items:', currentCartItems);
            
            if (isCartEmpty) {
                // When cart is empty, always use /cart/add-to-cart API
                console.log('🛒 Cart is empty - using /cart/add-to-cart API');
                await addToCart(product.id, quantity, variant.id);
                
                // Update local cart items and localStorage
                const newItem = {
                    id: Date.now(), // Temporary ID for local state
                    product_id: product.id,
                    variant_id: variant.id,
                    quantity: quantity,
                    product_variants: variant,
                    products: { 
                        id: product.id, 
                        title: product.title,
                        product_images: product.product_images || []
                    }
                };
                console.log('🛒 New item created for empty cart:', newItem);
                const updatedItems = [newItem];
                setCartItems(updatedItems);
                updateCartCountInStorage(updatedItems);
                
                // Store cart items in localStorage for cart page to access
                localStorage.setItem('cart_items', JSON.stringify(updatedItems));
                console.log('🛒 Added item to empty cart, final cart items:', updatedItems);
            } else {
                // When cart is not empty, check if item already exists
                const existingCartItem = currentCartItems.find(item => 
                    item.product_id === product.id && item.variant_id === variant.id
                );

                if (existingCartItem) {
                    // If item exists, update quantity using /cart/update-cart API
                    console.log('🛒 Item exists in cart - using /cart/update-cart API');
                    const newQuantity = existingCartItem.quantity + quantity;
                    const { updateCartItemQuantity } = await import('../services/cart.js');
                    await updateCartItemQuantity(product.id, newQuantity, variant.id);
                    
                    // Update local cart items and localStorage
                    const updatedItems = currentCartItems.map(item => 
                        item.id === existingCartItem.id 
                            ? { 
                                ...item, 
                                quantity: newQuantity,
                                products: {
                                    ...item.products,
                                    product_images: product.product_images || item.products.product_images || []
                                }
                            }
                            : item
                    );
                    setCartItems(updatedItems);
                    updateCartCountInStorage(updatedItems);
                    
                    // Store cart items in localStorage for cart page to access
                    localStorage.setItem('cart_items', JSON.stringify(updatedItems));
                } else {
                    // If item doesn't exist in non-empty cart, add to cart using /cart/add-to-cart API
                    console.log('🛒 Item does not exist in non-empty cart - using /cart/add-to-cart API');
                    await addToCart(product.id, quantity, variant.id);
                    
                    // Update local cart items and localStorage
                    const newItem = {
                        id: Date.now(), // Temporary ID for local state
                        product_id: product.id,
                        variant_id: variant.id,
                        quantity: quantity,
                        product_variants: variant,
                        products: { 
                            id: product.id, 
                            title: product.title,
                            product_images: product.product_images || []
                        }
                    };
                    console.log('🛒 New item created for non-empty cart:', newItem);
                    const updatedItems = [...currentCartItems, newItem];
                    setCartItems(updatedItems);
                    updateCartCountInStorage(updatedItems);
                    
                    // Store cart items in localStorage for cart page to access
                    localStorage.setItem('cart_items', JSON.stringify(updatedItems));
                    console.log('🛒 Added new item to non-empty cart, final cart items:', updatedItems);
                }
            }

            // Dispatch cart update event for header
            window.dispatchEvent(new CustomEvent('cartUpdated'));

            // Show success message (you can replace this with a toast notification)
            // alert('Product added to cart successfully!');
            
            // Small delay to ensure localStorage is set before redirect
            setTimeout(() => {
                window.location.href = '/cart';
            }, 100);

        } catch (error) {
            console.error('Error adding to cart:', error);
            
            // Check if user is logged in
            const authToken = localStorage.getItem('auth_token');
            const isLoggedIn = authToken && !authToken.startsWith('dummy_token_');
            
            if (!isLoggedIn) {
                // For guest users, show a different message
                if (window.toastr) {
                    window.toastr.info('Product added to cart (guest mode). Sign in to save your cart permanently.');
                } else {
                    alert('Product added to cart (guest mode). Sign in to save your cart permanently.');
                }
            } else {
                // For logged-in users, show error message
                if (window.toastr) {
                    window.toastr.error('Failed to add product to cart. Please try again.');
                } else {
                    alert('Failed to add product to cart. Please try again.');
                }
            }
        } finally {
            setIsAddingToCart(false);
        }
    };

    // Wishlist toggle handler
    const handleWishlistToggle = async () => {
        if (!product) return;

        // Check if user is logged in
        if (!isAuthenticated()) {
            if (window.toastr) {
                window.toastr.error('Please login first');
            } else {
                alert('Please login first');
            }
            return;
        }

        try {
            if (isFavorited) {
                // Remove from wishlist
                await removeFromWishlist(product.id);
                setIsFavorited(false);
                if (window.toastr) {
                    window.toastr.success('Removed from wishlist');
                }
            } else {
                // Add to wishlist
                await addToWishlist(product.id);
                setIsFavorited(true);
                if (window.toastr) {
                    window.toastr.success('Added to wishlist');
                }
            }
            
            // Dispatch wishlist update event for header
            window.dispatchEvent(new CustomEvent('wishlistUpdated'));
        } catch (error) {
            console.error('Error toggling wishlist:', error);
            if (window.toastr) {
                window.toastr.error('Failed to update wishlist. Please try again.');
            }
        }
    };

    const images = useMemo(() => {
        if (!product) return [];
        const imgs = product.product_images || [];
        return imgs.map(i => getImageUrl(i.image_url));
    }, [product]);

    const variant = useMemo(() => {
        if (!product) return {};
        const arr = product.variants || [];
        return arr[activeVariantIdx] || arr[0] || {};
    }, [product, activeVariantIdx]);

    if (!product) {
        return (
            <>
                <section className="py-5">
                    <div className="container">
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                            <div className="text-center">
                                <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3 text-muted">Loading product details...</p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            {/* Main Product Sectioon */}
            <section className="py-5">
                <div className="container">
                    <div className="row">

                        {/* LEFT COLUMN: Product Image Gallery slider*/}
                        <div className="col-lg-6">
                            <div className="">
                                <div className="slider__flex ">

                                    {/* Thumbnails */}
                                    <div className="slider__col">
                                        <div className="slider_thumbs">
                                            {/* slider bana lena  */}
                                            <div className="swiper-container overflow-scroll" style={{ height: "550px"}}>
                                                <div className="thumbnail-slider d-flex flex-lg-column gap-0.5">
                                                    {images.map((src, idx) => (
                                                        <div key={idx} className="swiper-slide" onClick={() => setActiveImageIdx(idx)} 
                                                        style={{cursor:'pointer', 
                                                            color: "#0d6efd", 
                                                            border: idx === activeImageIdx ? "2px Solid blue" : "1px solid #ccc",
                                                        }}>
                                                            <div className="slider__image">
                                                                <img src={src} className="img-fluid d-block" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Image */}
                                    <div className="slider__images" style={{ height: "400px" }} >
                                        <div className="swiper-container border">
                                            <div className="swiper-wrapper ">
                                                <div className="swiper-slide">
                                                    <div className="slider__image ">
                                                        <img src={images[activeImageIdx]}
                                                        className="img-fluid"
                                                        style={{ height: "550px", objectFit: "cover", width: "100%" }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Product Info */}
                        <div className="col-lg-6 mt-4 mt-lg-0">
                            <div className="product-slider-detail">
                                <h2 className="fw-400 mb-3 product-name">{product.title}</h2>

                                <div className="d-flex align-items-center gap-4 mb-3">
                                    <div className="rating-product">
                                        {[...Array(5)].map((_, i) => (
                                            <i 
                                                key={i} 
                                                className={`fa fa-star ${i < Math.floor(product.average_rating || 0) ? 'filled-star' : 'empty-star'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <hr />

                                {/* Variant Size */}
                                <h6 className="mb-2 fw-700 f20">Size</h6>
                                <div className="variant-select-not">
                                    <div className="variant-box position-relative">
                                        <div className="variant-data">
                                            {variant.length} ft X {variant.width} ft X {variant.thickness} mm
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                {/* Pricing */}
                                <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
                                    <h1 className=" mb-0 product-price sky-blue-text fw-500">${variant.discounted_price}.<span className="f18-size">00</span></h1>
                                    <h3 className="mb-0 price-strike fw-400 font-Yantramanav">${variant.price}.00</h3>
                                    {!!variant.discount && (<p className="green-btn mb-0 savepro-btn fw-400">Save {variant.discount}%</p>)}
                                    <p className="productvariant mb-3"><b>Shipping:</b><br/> Flat fee of $350 within the U.S.<br/> International shipping available (email for quote).<br/><b>Pre-Order Offer:</b><br/>✅ 10% OFF on Pre-Orders<br/>📦 Expected Delivery: Early October 2025 or earlier</p>
                                </div>
                                <hr />

                                {/* Category */}
                                <h6 className="mb-2 fw-700 f20 ">Category</h6>
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <p className="fw-400 f20 mb-0">{(product.category && product.category.title) || ''}</p>
                                </div>

                                {/* Quantity */}
                                <h6 className="mb-3 fw-700 f20 ">Quantity</h6>
                                <div className="mt-3 mb-4 d-flex align-items-center gap-2">
                                    <span className="minus-pro" onClick={() => setQuantity(q => Math.max(1, q - 1))}><i className="fa fa-minus"></i></span>
                                    <span className="num">{String(quantity).padStart(2,'0')}</span>
                                    <span className="plus-pro" onClick={() => setQuantity(q => q + 1)}><i className="fa fa-plus"></i></span>
                                </div>

                                {/* Action Buttons */}
                                <div className="gap-5 quantity-wrapper py-4">
                                    <div className="mt-3 mt-sm-0 edit-wrapper  d-block align-items-center  d-sm-flex gap-4">
                                        <button onClick={handleModal} className="green-btn f16 " type="button">Request Custom Court</button>
                                        <button 
                                            className="green-btn f16" 
                                            onClick={handleBuyNow}
                                            disabled={isAddingToCart}
                                            style={{ 
                                                opacity: isAddingToCart ? 0.6 : 1,
                                                cursor: isAddingToCart ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            {isAddingToCart ? (
                                                <>
                                                    <div className="spinner-border spinner-border-sm me-2" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                    Adding...
                                                </>
                                            ) : (
                                                'Buy Now'
                                            )}
                                        </button>
                                        <a 
                                            className={`addwishlist topwish-list ${isFavorited ? 'favorited' : ''}`}
                                            onClick={handleWishlistToggle}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <img 
                                                src={isFavorited 
                                                    ? `${window.location.origin}/webassets/img/wishlist.svg` 
                                                    : `${window.location.origin}/webassets/img/unfillwishlist.svg`
                                                } 
                                                className={`wishlist-icon ${isFavorited ? 'favorited' : ''}`}
                                                alt={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                    {/* Bottom Section: Description & Reviews */}
                    <div className="row mt-3">
                        <div className="col-12">
                            <div className="description-product">
                                <nav>
                                    <div className="nav mb-3 border-0" id="nav-tab" role="tablist">
                                        <button 
                                        className="font-oswald fw-500 bg-transparent nav-link active"
                                        id="description-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#description"
                                        type="button"
                                        role="tab"
                                        aria-controls="description"
                                        aria-selected="true"
                                        >
                                            <h3>Description</h3>
                                        </button>
                                        
                                        <button
                                        className="font-oswald fw-500 bg-transparent nav-link"
                                        id="review-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#review"
                                        type="button"
                                        role="tab"
                                        aria-controls="review"
                                        aria-selected="false"
                                        >
                                            <h3>Reviews</h3>
                                        </button>
                                    </div>
                                </nav>
                                <div className="tab-content" id="nav-tabContent">
                                    
                                    {/* Description Tab */}
                                <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                                    <div className="row">
                                        <div className={product.video ? 'col-lg-7' : 'col-lg-12'}>
                                            <p 
                                            className="fw-400 f16 font-Yantramanav lh-lg"
                                            dangerouslySetInnerHTML={{ __html: product.description || '' }}
                                            />
                                        </div>
                                        {product.video && (
                                        <div className="col-lg-5 mt-3 mt-lg-0">
                                            <video height="365" controls style={{ width: '100%' }}>
                                                <source src={getVideoUrl(product.video)} type="video/mp4" />
                                            </video>
                                        </div>
                                        )}
                                    </div>
                                </div>
                                {/* Reviews Tab */}
                                <Reviews productRatings={product.ratings || []} />
                                
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
            {/* court modal */}
            {showCourtModal && <CustomCourtModal onClose={() => setShowCourtModal(false)} />}
            
            {/* Login and Signup Modals */}
            <LoginModal />
            <SignupModal />
            <VerifyEmailModal />
            <ChangePasswordModal />
            <EditProfileModal />
        
        </>
    );
};

export default ProductDetail;

if (typeof window !== 'undefined') {
    const el = document.getElementById('react-product-detail-root');
    if (el) {
        const root = createRoot(el);
        root.render(<ProductDetail />);
    }
}
