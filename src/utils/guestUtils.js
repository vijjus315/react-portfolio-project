/**
 * Guest utilities for managing guest user sessions
 */

/**
 * Generate a unique guest ID
 * @returns {string} Unique guest ID
 */
export const generateGuestId = () => {
  // Generate a unique ID using timestamp and random number
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `guest_${timestamp}_${random}`;
};

/**
 * Get or create guest ID for the current session
 * @returns {string} Guest ID
 */
export const getOrCreateGuestId = () => {
  try {
    // Check if guest ID already exists in localStorage
    let guestId = localStorage.getItem('guest_id');
    
    if (!guestId) {
      // Generate new guest ID if none exists
      guestId = generateGuestId();
      localStorage.setItem('guest_id', guestId);
      console.log('🆔 Generated new guest ID:', guestId);
    } else {
      console.log('🆔 Using existing guest ID:', guestId);
    }
    
    return guestId;
  } catch (error) {
    console.error('Error managing guest ID:', error);
    // Fallback to session-based ID if localStorage fails
    return generateGuestId();
  }
};

/**
 * Clear guest ID (useful when user logs in)
 */
export const clearGuestId = () => {
  try {
    localStorage.removeItem('guest_id');
    console.log('🆔 Cleared guest ID');
  } catch (error) {
    console.error('Error clearing guest ID:', error);
  }
};

/**
 * Generate a new guest ID and replace the existing one
 * This is useful after order placement to start a new session
 * @returns {string} New guest ID
 */
export const generateNewGuestId = () => {
  try {
    // Generate new guest ID
    const newGuestId = generateGuestId();
    
    // Replace the existing guest ID
    localStorage.setItem('guest_id', newGuestId);
    console.log('🆔 Generated new guest ID for new session:', newGuestId);
    
    return newGuestId;
  } catch (error) {
    console.error('Error generating new guest ID:', error);
    // Fallback to session-based ID if localStorage fails
    return generateGuestId();
  }
};

/**
 * Handle order completion - generates new guest ID for new session
 * This should be called when an order is successfully placed/completed
 * Can be used in success pages, webhooks, or after checkout completion
 */
export const handleOrderCompletion = () => {
  try {
    // Only generate new guest ID if user is a guest
    if (isGuestUser()) {
      const newGuestId = generateNewGuestId();
      console.log('🛒 Order completed - new guest session started:', newGuestId);
      
      // Dispatch event to notify other components of the new session
      window.dispatchEvent(new CustomEvent('guestSessionReset', {
        detail: { newGuestId }
      }));
      
      return newGuestId;
    } else {
      console.log('🛒 Order completed - authenticated user, no guest ID reset needed');
      return null;
    }
  } catch (error) {
    console.error('Error handling order completion:', error);
    return null;
  }
};

/**
 * Check if current user is a guest (not authenticated)
 * @returns {boolean} True if user is a guest
 */
export const isGuestUser = () => {
  try {
    const authToken = localStorage.getItem('auth_token');
    return !authToken || authToken.startsWith('dummy_token_');
  } catch (error) {
    console.error('Error checking guest status:', error);
    return true; // Assume guest if error
  }
};
