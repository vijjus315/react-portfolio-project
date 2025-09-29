import apiClient from "./client.js";

// Get all products with user_id parameter
export const getProducts = async (userId = 34) => {
    try {
        const response = await apiClient.get(`/product/get-products?user_id=${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Get single product by slug
export const getProductBySlug = async (slug, userId = 34) => {
    try {
        const response = await apiClient.get(`/api/v1/product/get-products?user_id=${userId}`);
        const products = response.data.body || [];
        const product = products.find(p => p.slug === slug);
        return product || null;
    } catch (error) {
        console.error('Error fetching product by slug:', error);
        throw error;
    }
};

// Get single product by ID
export const getProductById = async (productId, userId = 34) => {
    try {
        const response = await apiClient.get(`/product/get-product-by-id?product_id=${productId}&user_id=${userId}`);
        return response.data.body || null;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};
