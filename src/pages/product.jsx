import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import LoginModal from '../components/login.jsx';
import SignupModal from '../components/signup.jsx';
import VerifyEmailModal from '../components/verifyEmail.jsx';
import ChangePasswordModal from '../components/changePassword.jsx';
import EditProfileModal from '../components/editProfile.jsx';
import { getProducts } from '../services/product.js';
import { addToWishlist, removeFromWishlist } from '../services/wishlist.js';
import { isAuthenticated } from '../services/auth.js';
import { getImageUrl } from '../utils/imageUtils.js';
import '../styles/bootstrap';

const ProductsPage = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [sortBy, setSortBy] = useState('desc'); // Default to high to low sorting
    const [priceRange, setPriceRange] = useState([0, 15000]);
    const [isLoading, setIsLoading] = useState(true);
    const [wishlistItems, setWishlistItems] = useState(new Set());
    const [updatingWishlist, setUpdatingWishlist] = useState(new Set());
    
    // Applied filter states (what's actually filtering the products)
    const [appliedCategoryIds, setAppliedCategoryIds] = useState([]);
    const [appliedSortBy, setAppliedSortBy] = useState('desc');
    const [appliedPriceRange, setAppliedPriceRange] = useState([0, 15000]);

    useEffect(() => {
        async function load() {
            try {
                const res = await getProducts(); // Will automatically use current user ID
                const apiProducts = res.body || [];


                
                // Transform API data to match expected format
                const transformedProducts = apiProducts.map(product => ({
                    id: product.id,
                    title: product.title,
                    slug: product.slug,
                    average_rating: product.average_rating || 0,
                    category_id: product.cat_id,
                    product_images: product.product_images || [],
                    variants: product.product_variants || [],
                    description: product.description,
                    video: product.video,
                    is_featured: product.is_featured,
                    is_fav: product.is_fav || false
                }));
                
                setAllProducts(transformedProducts);
                
                // Initialize wishlist state based on product data
                const wishlistSet = new Set();
                transformedProducts.forEach(product => {
                    if (product.is_fav) {
                        wishlistSet.add(product.id);
                    }
                });
                setWishlistItems(wishlistSet);
                
                // Set categories based on the products
                const uniqueCategories = [...new Set(transformedProducts.map(p => p.category_id))];
                const categoryMap = {
                    1: 'TENNIS BALL COURTS',
                    2: 'PICKLEBALL COURTS', 
                    3: 'SPIKE BALL COURTS'
                };
                
                const categories = uniqueCategories.map(id => ({
                    id: id,
                    title: categoryMap[id] || `Category ${id}`
                }));
                
                setCategories(categories);
            } catch (error) {
                console.error('Failed to load products data', error);
                // Fallback to original dummy data if API fails
                const fallbackProducts = [
                    {
                        id: 'fb-1',
                        title: 'Premium Spike Ball Court',
                        slug: 'premium-spike-ball-court',
                        average_rating: 0,
                        category_id: 3,
                        product_images: [{ image_url: 'https://www.portacourts.com/storage/images/bz80kmVC0wHP1aSYI4AJ3RfifHp36YpDOcAEEURj.jpg' }],
                        variants: [{ price: 5200, discounted_price: 4160 }],
                    },
                    {
                        id: 'fb-2',
                        title: 'Pickleball Court – Standard Court',
                        slug: 'pickleball-court-standard-court',
                        average_rating: 0,
                        category_id: 2,
                        product_images: [{ image_url: 'https://www.portacourts.com/storage/images/LAJbtgX3kexrZLI8fp7yUfQrdPqRf4VLyUdVefD6.jpg' }],
                        variants: [{ price: 7300, discounted_price: 6570 }],
                    },
                    {
                        id: 'fb-3',
                        title: 'Pickleball Court – Premium (with Acrylic Top)',
                        slug: 'pickleball-court-premium-with-acrylic-top',
                        average_rating: 0,
                        category_id: 2,
                        product_images: [{ image_url: 'https://www.portacourts.com/storage/images/ZZFA0LxRbGtSVsLxyeiGzhyvUqCVZlMEBKwhli4W.jpg' }],
                        variants: [{ price: 9800, discounted_price: 8820 }],
                    },
                ];
                setAllProducts(fallbackProducts);
                setCategories([
                    { id: 1, title: 'TENNIS BALL COURTS' },
                    { id: 2, title: 'PICKLEBALL COURTS' },
                    { id: 3, title: 'SPIKE BALL COURTS' },
                ]);
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, []);

    const toggleCategory = (id) => {
        setSelectedCategoryIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleApplyFilter = (e) => {
        e.preventDefault();
        // Apply the current form state to the applied filters
        setAppliedCategoryIds([...selectedCategoryIds]);
        setAppliedSortBy(sortBy);
        setAppliedPriceRange([...priceRange]);
    };

    const handleWishlistToggle = async (productId, event) => {
        event.preventDefault();
        event.stopPropagation();
        
        // Check if user is logged in
        if (!isAuthenticated()) {
            if (window.toastr) {
                window.toastr.error('Please login first');
            } else {
                alert('Please login first');
            }
            return;
        }
        
        if (updatingWishlist.has(productId)) {
            return; // Prevent multiple clicks while updating
        }

        try {
            setUpdatingWishlist(prev => new Set([...prev, productId]));
            
            const isInWishlist = wishlistItems.has(productId);
            let response;
            
            if (isInWishlist) {
                response = await removeFromWishlist(productId);
            } else {
                response = await addToWishlist(productId);
            }

            if (response.success) {
                setWishlistItems(prev => {
                    const newSet = new Set(prev);
                    if (isInWishlist) {
                        newSet.delete(productId);
                    } else {
                        newSet.add(productId);
                    }
                    return newSet;
                });

                // Update the product's is_fav status in allProducts
                setAllProducts(prev => prev.map(product => 
                    product.id === productId 
                        ? { ...product, is_fav: !isInWishlist }
                        : product
                ));

                // Dispatch custom event to update header wishlist count
                window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
                    detail: { 
                        productId, 
                        isAdded: !isInWishlist,
                        message: isInWishlist ? 'Product removed from wishlist' : 'Product added to wishlist'
                    } 
                }));

                // Show toast notification
                if (window.toastr) {
                    window.toastr.success(isInWishlist ? 'Product removed from wishlist' : 'Product added to wishlist');
                }
            }
        } catch (error) {
            console.error('Error toggling wishlist:', error);
            if (window.toastr) {
                window.toastr.error('Failed to update wishlist. Please try again.');
            }
        } finally {
            setUpdatingWishlist(prev => {
                const newSet = new Set(prev);
                newSet.delete(productId);
                return newSet;
            });
        }
    };

    // Filter and sort products based on applied filters
    const filteredProducts = useMemo(() => {
        let list = [...allProducts];

        if (appliedCategoryIds.length) {
            list = list.filter((p) => appliedCategoryIds.includes(String(p.category_id)));
        }
        list = list.filter((p) => {
            const v = (p.variants && p.variants[0]) || {};
            const price = Number(v.price || 0);
            return price >= appliedPriceRange[0] && price <= appliedPriceRange[1];
        });
        if (appliedSortBy) {
            list.sort((a, b) => {
                const va = Number(((a.variants && a.variants[0]) || {}).discounted_price || 0);
                const vb = Number(((b.variants && b.variants[0]) || {}).discounted_price || 0);
                return appliedSortBy === 'asc' ? va - vb : vb - va;
            });
        }
        return list;
    }, [allProducts, appliedCategoryIds, appliedSortBy, appliedPriceRange]);

    useEffect(() => {
        // Initialize jQuery UI slider if available to match original design
        try {
            if (window.$ && window.$.fn && typeof window.$.fn.slider === 'function') {
                const [$min, $max] = priceRange;
                const $slider = window.$('#slider-range');
                if ($slider.data('ui-slider')) {
                    $slider.slider('values', 0, $min).slider('values', 1, $max);
                } else {
                    $slider.slider({
                        range: true,
                        min: 0,
                        max: 15000,
                        values: [$min, $max],
                        slide: function (_e, ui) {
                            const [v1, v2] = ui.values;
                            window.$('#amount').val(`$${v1} - $${v2}`);
                            // Update the price range state but don't apply until Apply Filter is clicked
                            setPriceRange([v1, v2]);
                        }
                    });
                }
                window.$('#amount').val(`$${$min} - $${$max}`);
            }
        } catch (e) {
            // noooop
        }
    }, [priceRange]);

    return (
        <>
        <section className="filter-wrapper py-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <h3 className="font-oswald mb-3" style={{ fontSize: "1.5rem"}}>Filters</h3>
                        <form method="GET" id="filter-form" onSubmit={handleApplyFilter}>
                        <div className="filter-inner" >
                            <div>
                                <h4 className="font-oswald py-2" style={{ fontSize: "1.25rem" }}>Category</h4>
                            </div>
                            <ul className="ps-0 category-listed ms-0" id="category-list">
                                <li className="text-grey font-Yantramanav fw-400 category-item" data-category-id="1">
                                    <input type="checkbox" name="catID[]" value="1" id="category-1" className="category-checkbox" checked={selectedCategoryIds.includes('1')} onChange={() => toggleCategory('1')} style={{ marginRight: '12px', position: 'relative', top: "2px" }} />
                                    <label htmlFor="category-1">TENNIS BALL COURTS</label>
                                </li>
                                <li className="text-grey font-Yantramanav fw-400 category-item" data-category-id="2">
                                    <input type="checkbox" name="catID[]" value="2" id="category-2" className="category-checkbox" checked={selectedCategoryIds.includes('2')} onChange={() => toggleCategory('2')} style={{ marginRight: '12px', position: 'relative', top: "2px" }} />
                                    <label htmlFor="category-2">PICKLEBALL COURTS</label>
                                </li>
                                <li className="text-grey font-Yantramanav fw-400 category-item" data-category-id="3">
                                    <input type="checkbox" name="catID[]" value="3" id="category-3" className="category-checkbox" checked={selectedCategoryIds.includes('3')} onChange={() => toggleCategory('3')} style={{ marginRight: '12px', position: 'relative', top: "2px" }} />
                                    <label htmlFor="category-3">SPIKE BALL COURTS</label>
                                </li>
                            </ul>

                            <div>
                                <h4 className="font-oswald py-2" style={{ fontSize: "1.25rem"}}>Shop By Price</h4>
                                <div className="price-range-slider pt-4">
                                    {/* this is range slider */}
                                    <div id="slider-range" className="range-bar"></div>
                                    <div className="d-flex align-items-center mt-3 justify-content-between">
                                        <h6 className="price-filter">Prices Range</h6>
                                        <p className="range-value primary-theme">
                                            <input type="text" id="amount" />
                                            <input type="hidden" name="min_price" id="min-price" value={priceRange[0]} />
                                            <input type="hidden" name="max_price" id="max-price" value={priceRange[1]} />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-oswald pb-2 pt-3" style={{ fontSize: "1.5rem"}}>Sort By</h3>
                            </div>
                            <ul className="ps-0 category-listed" id="sort-list">
                                <li className="text-grey font-Yantramanav fw-400 sort-item" data-sort-by="desc">
                                    <input type="radio" name="sort_by" id="sort-desc" checked={sortBy === 'desc'} onChange={() => setSortBy('desc')} className="sort-radio" value="desc" />
                                    <label htmlFor="sort-desc" class="form-check-label ms-1">High to Low</label>
                                </li>
                                <li className="text-grey font-Yantramanav fw-400 sort-item" data-sort-by="asc">
                                    <input type="radio" name="sort_by" id="sort-asc" checked={sortBy === 'asc'} onChange={() => setSortBy('asc')} className="sort-radio" value="asc" />
                                    <label htmlFor="sort-asc" class="form-check-label ms-1">Low to High</label>
                                </li>
                            </ul>

                            <button type="submit" className="green-btn w-100 mt-3">Apply Filter</button>
                        </div>
                        </form>
                    </div>

                    <div className="col-lg-9">
                        <h3 className="font-oswald mb-3" style={{ fontSize: "1.5rem"}}>Products</h3>
                        {(appliedCategoryIds.length > 0 || (appliedSortBy && appliedSortBy !== 'desc')) && (
                            <div className="productfilter d-flex align-items-baseline gap-2">
                                <p className="fw-500 mb-0 lh-1">Filter:</p>
                                <div className="d-flex gap-2 align-items-center flex-wrap" id="applied-filters">
                                    {appliedCategoryIds.map(id => {
                                        const c = categories.find(x => String(x.id) === String(id));
                                        if (!c) return null;
                                        return (
                                            <button
                                                key={id}
                                                className="border-0 filterbtn primary-theme fw-400 font-Yantramanav d-flex align-items-center gap-2"
                                                onClick={() => {
                                                    const newAppliedIds = appliedCategoryIds.filter(x => x !== id);
                                                    setAppliedCategoryIds(newAppliedIds);
                                                    setSelectedCategoryIds(newAppliedIds);
                                                }}
                                            >
                                                <span>{c.title}</span>
                                                <img src={`${window.location.origin}/webassets/img/crossfilter.svg`} />
                                            </button>
                                        );
                                    })}
                                    {appliedSortBy && appliedSortBy !== 'desc' && (
                                        <button
                                            className="border-0 filterbtn primary-theme fw-400 font-Yantramanav d-flex align-items-center gap-2"
                                            onClick={() => {
                                                setAppliedSortBy('desc');
                                                setSortBy('desc');
                                            }}
                                        >
                                            <span>{appliedSortBy === 'desc' ? 'High to Low' : 'Low to High'}</span>
                                            <img src={`${window.location.origin}/webassets/img/crossfilter.svg`} />
                                        </button>
                                    )}
                                    <a
                                        className="border-0 clear-filter fw-400 font-Yantramanav d-flex align-items-center gap-2"
                                        href="/products"
                                        onClick={(e) => { 
                                            e.preventDefault(); 
                                            setSelectedCategoryIds([]); 
                                            setSortBy('desc'); 
                                            setPriceRange([0, 15000]);
                                            setAppliedCategoryIds([]);
                                            setAppliedSortBy('desc');
                                            setAppliedPriceRange([0, 15000]);
                                        }}
                                        style={{ textDecoration: "none" }}
                                    >
                                        Clear All Filter
                                    </a>
                                </div>
                            </div>
                        )}
                        
                        <div className="row pt-4">
                            {isLoading ? (
                                <div className="d-flex mx-auto justify-content-center align-items-center my-5 h-100">
                                    <div className="text-center">
                                        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="mt-3 text-muted">Loading products...</p>
                                    </div>
                                </div>
                            ) : filteredProducts.length === 0 ? (
                                <div className="d-flex mx-auto justify-content-center align-items-center my-5 h-100">
                                    <img src={`${window.location.origin}/webassets/img/wishlist-empty.png`} className=" no-data-found" />
                                </div>
                            ) : (
                                filteredProducts.map((p) => {
                                const image = (p.product_images && p.product_images[0]) || {};
                                const item = (p.variants && p.variants[0]) || {};
                                const imgSrc = getImageUrl(image.image_url);
                                console.log(imgSrc);
                                return (
                                    <div className="col-md-6 col-xl-4 mb-3" key={p.id}>
                                        {/* /product-detail */}
                                        <a href={`/product-detail/${p.slug}?id=${p.id}`} className="text-decoration-none">
                                            <div className="feature-pro" style={{
                                                border: "2px solid white",borderRadius: "0px",boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",backgroundColor: "#fff",
                                
                                            }}>
                                                <div className="product-feature-img product-bg position-relative">
                                                    <img alt="product_images" src={imgSrc} className="img-fluid" style={{ height: "100%" }}/>

                                                    {/* <img alt="product_images" src={imgSrc} className="img-fluid product-pic" /> */}
                                                    <a 
                                                        className="icon-wish-product addwishlist" 
                                                        data-product-id={p.id}
                                                        onClick={(e) => handleWishlistToggle(p.id, e)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        {updatingWishlist.has(p.id) ? (
                                                            <div className="spinner-border spinner-border-sm text-white" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        ) : (
                                                            <img 
                                                                src={wishlistItems.has(p.id) 
                                                                    ? `${window.location.origin}/webassets/img/green-wishlist-bg.svg` 
                                                                    : `${window.location.origin}/webassets/img/unfillwishlist.svg`
                                                                } 
                                                                className="wishlist-icon rounded-md bg-green-300 shadow-xl" 
                                                                alt={wishlistItems.has(p.id) ? "Remove from wishlist" : "Add to wishlist"}
                                                            />
                                                        )}
                                                    </a>
                                                </div>
                                                <div className="px-3 py-4 text-black">
                                                    <h3 className="text-capitalize mb-2 fw-400 one-line text-black" style={{ fontSize: "1.5rem"}}>{p.title}</h3>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div>
                                                            <p className="mb-0">
                                                                <span className="primary-theme price-offer">${item.discounted_price || ''}.00</span>
                                                                <span className="ms-2 price-old">${item.price || ''}.00</span>
                                                            </p>
                                                            <div className="d-flex align-items-center gap-1">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <i
                                                                        key={i}
                                                                        className={i < Math.floor(p.average_rating || 0) ? 'fa fa-star' : 'fa fa-star-o'}
                                                                        aria-hidden="true"
                                                                    ></i>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <img src={`${window.location.origin}/webassets/img/cart.svg`} />
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                );
                                })
                            )}
                        </div>
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

export default ProductsPage;
// Auto-mount when included directly as a script module
if (typeof window !== 'undefined') {
    const el = document.getElementById('react-products-root');
    if (el) {
        const root = createRoot(el);
        root.render(<ProductsPage />);
    }
}

