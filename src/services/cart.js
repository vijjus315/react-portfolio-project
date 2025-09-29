import { apiClient } from "./client.js";

/**
 * Fetch cart items for the authenticated user
 * @returns {Promise<Object>} API response with cart items
 */
export const getCartItems = async () => {
  try {
    console.log("📋 API: Fetching cart items (READ ONLY) via /cart/get-cart");
    const response = await apiClient.get("/cart/get-cart");
    console.log("📋 API: Cart items fetched successfully");
    return response.data;
  } catch (error) {
    console.error("❌ API: Error fetching cart items:", error);
    throw error;
  }
};

/**
 * Update cart item quantity
 * @param {number} productId - ID of the product
 * @param {number} quantity - New quantity
 * @param {number} variantId - ID of the product variant
 * @returns {Promise<Object>} API response
 */
export const updateCartItemQuantity = async (
  productId,
  quantity,
  variantId
) => {
  try {
    const response = await apiClient.post("/cart/update-cart", {
      product_id: productId,
      quantity: quantity,
      variant_id: variantId,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    throw error;
  }
};

/**
 * Remove item from cart
 * @param {number} variantId - ID of the product variant to remove
 * @returns {Promise<Object>} API response
 */
export const removeCartItem = async (variantId) => {
  try {
    const response = await apiClient.get(
      `/cart/remove-from-cart?variant_id=${variantId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw error;
  }
};

/**
 * Add item to cart
 * @param {number} productId - ID of the product
 * @param {number} quantity - Quantity to add
 * @param {number} variantId - ID of the product variant
 * @returns {Promise<Object>} API response
 */
export const addToCart = async (productId, quantity, variantId) => {
  try {
    console.log("🚀 API: Adding item to cart via /cart/add-to-cart", {
      product_id: productId,
      quantity: quantity,
      variant_id: variantId,
    });

    const response = await apiClient.post("/cart/add-to-cart", {
      product_id: productId,
      quantity: quantity,
      variant_id: variantId,
    });

    console.log("✅ API: Item successfully added to cart", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API: Error adding item to cart:", error);
    throw error;
  }
};

/**
 * Clear entire cart
 * @returns {Promise<Object>} API response
 */
export const clearCart = async () => {
  try {
    const response = await apiClient.delete("/cart/clear-cart");
    return response.data;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};
