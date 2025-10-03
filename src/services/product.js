import apiClient from "./client.js";
import { getCurrentUserId } from "../utils/validators.js";

// Get all products with user_id parameter
export const getProducts = async (userId = null) => {
    try {
        // Use provided userId or get from session
        const actualUserId = userId || getCurrentUserId();
        const response = await apiClient.get(`/product/get-products?user_id=${actualUserId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Get single product by slug
export const getProductBySlug = async (slug, userId = null) => {
    try {
        // Use provided userId or get from session
        const actualUserId = userId || getCurrentUserId() || 34;
        const response = await apiClient.get(`/product/get-products?user_id=${actualUserId}`);
        const products = response.data.body || [];
        const product = products.find(p => p.slug === slug);
        return product || null;
    } catch (error) {
        console.error('Error fetching product by slug:', error);
        throw error;
    }
};

// Get single product by ID
export const getProductById = async (productId, userId = null) => {
    try {
        // Use provided userId or get from session
        const actualUserId = userId || getCurrentUserId() || 34;
        const response = await apiClient.get(`/product/get-product-by-id?product_id=${productId}&user_id=${actualUserId}`);
        return response.data.body || null;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};
