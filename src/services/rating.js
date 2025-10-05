import apiClient from './client.js';

/**
 * Add a rating for a product
 * @param {number} productId - The product ID
 * @param {number} rating - The rating value (1-5)
 * @param {string} comment - The review comment
 * @returns {Promise} API response
 */
export const addRating = async (productId, rating, comment) => {
  try {
    console.log('🔍 API: Adding rating for product:', { productId, rating, comment });
    
    const requestData = {
      product_id: productId,
      rating: rating,
      comment: comment
    };

    const response = await apiClient.post('/product/add-rating', requestData);
    console.log('✅ API: Rating added successfully', response.data);
    
    return response.data;
  } catch (error) {
    console.error('❌ API: Error adding rating:', error);
    throw error;
  }
};

export default { addRating };
