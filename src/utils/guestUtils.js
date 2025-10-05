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
