import apiClient from "./client.js";
import { getCurrentUserId } from "../utils/validators.js";

/**
 * Get wishlist items for the current user using the dedicated wishlist API
 */
export const getWishlistItems = async (userId = null) => {
    try {
        console.log('🔍 API: Fetching wishlist items from /product/my-wishlist');
        const response = await apiClient.get('/product/my-wishlist');
        console.log('✅ API: Wishlist items fetched successfully', response.data);
        
        // Return the response directly as it already has the correct structure
        if (response.data.success && response.data.body) {
            return {
                success: true,
                body: response.data.body,
                message: response.data.message || 'Wishlist items fetched successfully'
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
