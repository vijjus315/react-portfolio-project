import apiClient from "./client.js";

/**
 * Get wishlist items for the current user using the products API with is_fav filter
 */
export const getWishlistItems = async (userId = 34) => {
    try {
        console.log('🔍 API: Fetching wishlist items');
        const response = await apiClient.get(`/product/get-products?user_id=${userId}`);
        console.log('✅ API: All products fetched successfully', response.data);
        
        // Filter products where is_fav is true
        if (response.data.success && response.data.body) {
            const wishlistProducts = response.data.body.filter(product => product.is_fav === true);
            return {
                success: true,
                body: wishlistProducts,
                message: 'Wishlist items fetched successfully'
            };
        }
        
        return {
            success: true,
            body: [],
            message: 'No wishlist items found'
        };
    } catch (error) {
        console.error('❌ API: Error fetching wishlist items:', error);
        throw error;
    }
};

/**
 * Add product to wishlist
 * @param {number} productId - The ID of the product to add
 */
export const addToWishlist = async (productId) => {
    try {
        console.log('🔍 API: Adding product to wishlist', { product_id: productId });
        const response = await apiClient.get(`/product/fav-unfav-product?product_id=${productId}`);
        console.log('✅ API: Product added to wishlist successfully', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ API: Error adding product to wishlist:', error);
        throw error;
    }
};

/**
 * Remove product from wishlist
 * @param {number} productId - The ID of the product to remove
 */
export const removeFromWishlist = async (productId) => {
    try {
        console.log('🔍 API: Removing product from wishlist', { product_id: productId });
        const response = await apiClient.get(`/product/fav-unfav-product?product_id=${productId}`);
        console.log('✅ API: Product removed from wishlist successfully', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ API: Error removing product from wishlist:', error);
        throw error;
    }
};

export default {
    getWishlistItems,
    addToWishlist,
    removeFromWishlist
};
