import apiClient from './client.js';

// Get user's orders with pagination
export const getMyOrders = async (page = 1) => {
    try {
        console.log('🔍 API: Fetching user orders');
        const response = await apiClient.get(`/order/my-order-list`);
        console.log('✅ API: Orders fetched successfully', response.data);
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
        const response = await apiClient.get(`/order-detail/${orderId}`);
        console.log('✅ API: Order details fetched successfully', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ API: Error fetching order details:', error);
        throw error;
    }
};

// Checkout function to initiate payment
export const checkout = async (userId) => {
    try {
        console.log('🔍 API: Initiating checkout for user ID:', userId);
        const response = await apiClient.post('/order/checkout', {
            user_id: userId
        });
        console.log('✅ API: Checkout initiated successfully', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ API: Error during checkout:', error);
        throw error;
    }
};

export default { getMyOrders, getOrderDetail, checkout };
