import { apiClient } from "./client.js";
import { isAuthenticated, getUserData } from "./auth.js";
import { getOrCreateGuestId, isGuestUser } from "../utils/guestUtils.js";

/**
 * Fetch cart items for both authenticated users and guests
 * @returns {Promise<Object>} API response with cart items
 */
export const getCartItems = async () => {
  try {
    if (isGuestUser()) {
      // For guest users, get cart items using guest_id
      const guestId = getOrCreateGuestId();
      console.log("📋 API: Fetching cart items for guest via /cart/get-cart", { guest_id: guestId });
      const response = await apiClient.get(`/cart/get-cart?guest_id=${guestId}`);
      console.log("📋 API: Guest cart items fetched successfully");
      return response.data;
    } else {
      // For authenticated users, get user_id and include it in the request
      const userData = getUserData();
      const userId = userData?.id || userData?.user_id;
      
      if (!userId) {
        throw new Error("User ID not found in user data");
      }
      
      console.log("📋 API: Fetching cart items for authenticated user via /cart/get-cart", { user_id: userId });
      const response = await apiClient.get(`/cart/get-cart?user_id=${userId}`);
      console.log("📋 API: Authenticated user cart items fetched successfully");
      return response.data;
    }
  } catch (error) {
    console.error("❌ API: Error fetching cart items:", error);
    
    // If it's a 401 error and user is not logged in, return empty cart for guest users
    if (error.status === 401 && isGuestUser()) {
      console.log("👤 Guest user - returning empty cart");
      return {
        success: true,
        message: "Guest user - empty cart",
        body: { cartItems: [] }
      };
    }
    
    throw error;
  }
};

/**
 * Update cart item quantity (supports both logged-in and guest users)
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
    const requestData = {
      quantity: quantity,
      variant_id: variantId,
    };

    // Add guest_id for guest users or user_id for authenticated users
    if (isGuestUser()) {
      const guestId = getOrCreateGuestId();
      requestData.guest_id = guestId;
      console.log("📋 API: Updating cart quantity for guest", { guest_id: guestId, quantity, variant_id: variantId });
    } else {
      const userData = getUserData();
      const userId = userData?.id || userData?.user_id;
      
      if (!userId) {
        throw new Error("User ID not found in user data");
      }
      
      requestData.user_id = userId;
      console.log("📋 API: Updating cart quantity for authenticated user", { user_id: userId, quantity, variant_id: variantId });
    }

    const response = await apiClient.post("/cart/update-cart", requestData);
    return response.data;
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    
    // If it's a 401 error and user is not logged in, return success for guest users
    if (error.status === 401 && isGuestUser()) {
      console.log("👤 Guest user - quantity update handled locally");
      return {
        success: true,
        message: "Quantity updated (guest mode)",
        body: { cartItems: [] }
      };
    }
    
    throw error;
  }
};

/**
 * Remove item from cart (supports both logged-in and guest users)
 * @param {number} variantId - ID of the product variant to remove
 * @returns {Promise<Object>} API response
 */
export const removeCartItem = async (variantId) => {
  try {
    let url = `/cart/remove-from-cart?variant_id=${variantId}`;
    
    // Add guest_id for guest users or user_id for authenticated users
    if (isGuestUser()) {
      const guestId = getOrCreateGuestId();
      url += `&guest_id=${guestId}`;
      console.log("📋 API: Removing cart item for guest", { guest_id: guestId, variant_id: variantId });
    } else {
      const userData = getUserData();
      const userId = userData?.id || userData?.user_id;
      
      if (!userId) {
        throw new Error("User ID not found in user data");
      }
      
      url += `&user_id=${userId}`;
      console.log("📋 API: Removing cart item for authenticated user", { user_id: userId, variant_id: variantId });
    }

    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error removing cart item:", error);
    
    // If it's a 401 error and user is not logged in, return success for guest users
    if (error.status === 401 && isGuestUser()) {
      console.log("👤 Guest user - item removal handled locally");
      return {
        success: true,
        message: "Item removed (guest mode)",
        body: { cartItems: [] }
      };
    }
    
    throw error;
  }
};

/**
 * Add item to cart (supports both logged-in and guest users)
 * @param {number} productId - ID of the product
 * @param {number} quantity - Quantity to add
 * @param {number} variantId - ID of the product variant
 * @returns {Promise<Object>} API response
 */
export const addToCart = async (productId, quantity, variantId) => {
  try {
    const requestData = {
      product_id: productId,
      quantity: quantity,
      variant_id: variantId,
    };

    // Add guest_id for guest users or user_id for authenticated users
    if (isGuestUser()) {
      const guestId = getOrCreateGuestId();
      requestData.guest_id = guestId;
      console.log("🚀 API: Adding item to cart for guest via /cart/add-to-cart", requestData);
    } else {
      const userData = getUserData();
      const userId = userData?.id || userData?.user_id;
      
      if (!userId) {
        throw new Error("User ID not found in user data");
      }
      
      requestData.user_id = userId;
      console.log("🚀 API: Adding item to cart for authenticated user via /cart/add-to-cart", requestData);
    }

    const response = await apiClient.post("/cart/add-to-cart", requestData);

    console.log("✅ API: Item successfully added to cart", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API: Error adding item to cart:", error);
    
    // If it's a 401 error and user is not logged in, show a more user-friendly message
    if (error.status === 401 && isGuestUser()) {
      console.log("👤 Guest user - cart addition failed, but continuing with local state");
      // Return a success response for guest users to maintain functionality
      return {
        success: true,
        message: "Item added to cart (guest mode)",
        body: { cartItems: [] }
      };
    }
    
    throw error;
  }
};

/**
 * Clear entire cart (supports both logged-in and guest users)
 * @returns {Promise<Object>} API response
 */
export const clearCart = async () => {
  try {
    let url = "/cart/clear-cart";
    
    // Add guest_id for guest users or user_id for authenticated users
    if (isGuestUser()) {
      const guestId = getOrCreateGuestId();
      url += `?guest_id=${guestId}`;
      console.log("📋 API: Clearing cart for guest", { guest_id: guestId });
    } else {
      const userData = getUserData();
      const userId = userData?.id || userData?.user_id;
      
      if (!userId) {
        throw new Error("User ID not found in user data");
      }
      
      url += `?user_id=${userId}`;
      console.log("📋 API: Clearing cart for authenticated user", { user_id: userId });
    }

    const response = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error clearing cart:", error);
    
    // If it's a 401 error and user is not logged in, return success for guest users
    if (error.status === 401 && isGuestUser()) {
      console.log("👤 Guest user - cart clearing handled locally");
      return {
        success: true,
        message: "Cart cleared (guest mode)",
        body: { cartItems: [] }
      };
    }
    
    throw error;
  }
};
