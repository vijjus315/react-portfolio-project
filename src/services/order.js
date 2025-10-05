import apiClient from './client.js';
import { getOrCreateGuestId, isGuestUser } from '../utils/guestUtils.js';

// Get user's orders with pagination
export const getMyOrders = async (page = 1) => {
    try {
        console.log('🔍 API: Fetching user orders');
        const response = await apiClient.get(`/order/my-order-list`);
        console.log('✅ API: Orders fetched successfully', response.data);
        
        // Transform the response to match the expected structure
        if (response.data.success && response.data.body && response.data.body.item) {
            return {
                success: true,
                data: response.data.body.item,
                pagination: null // API doesn't seem to return pagination data
            };
        }
        
        return response.data;
    } catch (error) {
        console.error('❌ API: Error fetching orders:', error);
        throw error;
    }
};

// Get order details by ID
export const getOrderDetail = async (orderId) => {
    try {
        console.log('🔍 API: Fetching order details for ID:', orderId);
        const response = await apiClient.get(`/order/order-details?order_id=${orderId}`);
        console.log('✅ API: Order details fetched successfully', response.data);
        
        // Transform the response to match the expected structure
        if (response.data.success && response.data.body) {
            return {
                success: true,
                data: response.data.body
            };
        }
        
        return response.data;
    } catch (error) {
        console.error('❌ API: Error fetching order details:', error);
        throw error;
    }
};

// Checkout function to initiate payment (supports both authenticated users and guests)
export const checkout = async (userId = null) => {
    try {
        let requestData = {};
        
        if (isGuestUser()) {
            // For guest users, use guest_id
            const guestId = getOrCreateGuestId();
            requestData.guest_id = guestId;
            console.log('🔍 API: Initiating checkout for guest ID:', guestId);
        } else {
            // For authenticated users, use user_id
            requestData.user_id = userId;
            console.log('🔍 API: Initiating checkout for user ID:', userId);
        }
        
        const response = await apiClient.post('/order/checkout', requestData);
        console.log('✅ API: Checkout initiated successfully', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ API: Error during checkout:', error);
        throw error;
    }
};

// Get track order details by order ID
export const getTrackOrderDetails = async (orderId) => {
    try {
        console.log('🔍 API: Fetching track order details for ID:', orderId);
        const response = await apiClient.get(`/order/track-order-details?order_id=${orderId}`);
        console.log('✅ API: Track order details fetched successfully', response.data);

        if (response.data.success && response.data.body) {
            return {
                success: true,
                data: response.data.body
            };
        }

        return response.data;
    } catch (error) {
        console.error('❌ API: Error fetching track order details:', error);
        throw error;
    }
};

export default { getMyOrders, getOrderDetail, checkout, getTrackOrderDetails };
