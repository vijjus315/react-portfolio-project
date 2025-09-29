// import React from 'react';

// const Wishlist = () => {
//   return (
//     <div className="wishlist-page">
//       <div className="container">
//         <h1>My Wishlist</h1>
//         <p>Your wishlist items will appear here.</p>
//       </div>
//     </div>
//   );
// };

// export default Wishlist;
import React, { useEffect, useState } from 'react';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadWishlistItems();
    }, []);

    const loadWishlistItems = async () => {
        try {
            const res = await window.axios.get('/wishlist-items');
            setWishlistItems(res.data.items || []);
        } catch (error) {
            console.error('Error loading wishlist items:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            const res = await window.axios.delete(`/wishlist/remove/${productId}`);
            if (res.data.success) {
                setWishlistItems(prev => prev.filter(item => item.product_id !== productId));
                window.toastr.success('Item removed from wishlist');
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            window.toastr.error('Error removing from wishlist');
        }
    };

    const addToCart = async (productId, variantId = null) => {
        try {
            const res = await window.axios.post('/cart/add', {
                product_id: productId,
                variant_id: variantId,
                quantity: 1
            });
            if (res.data.success) {
                window.toastr.success('Item added to cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            window.toastr.error('Error adding to cart');
        }
    };

    if (loading) {
        return (
            <div className="container py-5">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    // return (
    //     <div className="wishlist-page">
    //         <div className="container py-5">
    //             <div className="row">
    //                 <div className="col-12">
    //                     <h1 className="mb-5">My Wishlist</h1>
    //                 </div>
    //             </div>

    //             {wishlistItems.length === 0 ? (
    //                 <div className="text-center py-5">
    //                     <h3>Your wishlist is empty</h3>
    //                     <p>Add some products to your wishlist!</p>
    //                     <a href="/products" className="btn btn-primary">
    //                         Shop Now
    //                     </a>
    //                 </div>
    //             ) : (
    //                 <div className="row">
    //                     {wishlistItems.map(item => {
    //                         const variant = item.product?.variants?.[0];
    //                         const image = item.product?.product_images?.[0];
                            
    //                         return (
    //                             <div key={item.id} className="col-lg-4 col-md-6 mb-4">
    //                                 <div className="card h-100">
    //                                     <div className="position-relative">
    //                                         <img 
    //                                             src={`/storage/${image?.image_url}`} 
    //                                             className="card-img-top" 
    //                                             alt={item.product?.title}
    //                                             style={{ height: '250px', objectFit: 'cover' }}
    //                                         />
    //                                         <div className="position-absolute top-0 end-0 p-2">
    //                                             <button 
    //                                                 className="btn btn-danger btn-sm"
    //                                                 onClick={() => removeFromWishlist(item.product_id)}
    //                                             >
    //                                                 <i className="fa fa-heart"></i>
    //                                             </button>
    //                                         </div>
    //                                     </div>
    //                                     <div className="card-body d-flex flex-column">
    //                                         <h5 className="card-title">{item.product?.title}</h5>
    //                                         <p className="card-text flex-grow-1">
    //                                             {(item.product?.description || '').replace(/<[^>]*>?/gm, '').substring(0, 100)}...
    //                                         </p>
    //                                         <div className="mt-auto">
    //                                             <div className="d-flex justify-content-between align-items-center mb-3">
    //                                                 <span className="h5 text-primary mb-0">
    //                                                     ${variant?.discounted_price || variant?.price || '0'}.00
    //                                                 </span>
    //                                                 {variant?.discounted_price && variant?.price && (
    //                                                     <span className="text-muted text-decoration-line-through">
    //                                                         ${variant.price}.00
    //                                                     </span>
    //                                                 )}
    //                                             </div>
    //                                             <div className="d-grid gap-2">
    //                                                 <a 
    //                                                     href={`/product-detail/${item.product?.slug}`} 
    //                                                     className="btn btn-outline-primary"
    //                                                 >
    //                                                     View Details
    //                                                 </a>
    //                                                 <button 
    //                                                     className="btn btn-primary"
    //                                                     onClick={() => addToCart(item.product_id, variant?.id)}
    //                                                 >
    //                                                     Add to Cart
    //                                                 </button>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         );
    //                     })}
    //                 </div>
    //             )}
    //         </div>
    //     </div>
    // );

     return (
    <div className="wishlist-page">
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <div style={{ height: '8px', width: '95px', backgroundColor: "var(--primary-theme)",
                                    color: "#fff", marginBottom: '5px' }}></div>
            <h1 className="mb-3">My Wishlist</h1>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-5">
            {/* Image above the text */}
            <img
              src="/webassets/img/EmptyCart.svg"
              alt="Empty Wishlist"
              style={{ maxWidth: '200px', marginBottom: '20px' }}
            />
            <h3 style={{ fontSize: "20px" }}>Hey, it's feel so light</h3>
            <p style={{  color: "gray", fontWeight: 400 }}>There is nothing in your wishlist. Let's add some items.</p>
            {/* Removed the button */}
          </div>
        ) : (
          <div className="row">
            {wishlistItems.map((item) => {
              const variant = item.product?.variants?.[0];
              const image = item.product?.product_images?.[0];

              return (
                <div key={item.id} className="col-lg-4 col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="position-relative">
                      <img
                        src={`/storage/${image?.image_url}`}
                        className="card-img-top"
                        alt={item.product?.title}
                        style={{ height: '250px', objectFit: 'cover' }}
                      />
                      <div className="position-absolute top-0 end-0 p-2">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => removeFromWishlist(item.product_id)}
                          aria-label="Remove from wishlist"
                        >
                          <i className="fa fa-heart"></i>
                        </button>
                      </div>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{item.product?.title}</h5>
                      <p className="card-text flex-grow-1">
                        {(item.product?.description || '')
                          .replace(/<[^>]*>?/gm, '')
                          .substring(0, 100)}
                        ...
                      </p>
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="h5 text-primary mb-0">
                            ${variant?.discounted_price || variant?.price || '0'}.00
                          </span>
                          {variant?.discounted_price && variant?.price && (
                            <span className="text-muted text-decoration-line-through">
                              ${variant.price}.00
                            </span>
                          )}
                        </div>
                        <div className="d-grid gap-2">
                          <a
                            href={`/product-detail/${item.product?.slug}`}
                            className="btn btn-outline-primary"
                          >
                            View Details
                          </a>
                          <button
                            className="btn btn-primary"
                            onClick={() => addToCart(item.product_id, variant?.id)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
  };

export default Wishlist;