/**
 * Utility functions for data validation
 */

/**
 * Get current user ID from session/token
 * @returns {number} User ID from localStorage or default fallback
 */
export const getCurrentUserId = () => {
  try {
    // Try to get user ID from localStorage user_data
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const parsed = JSON.parse(userData);
      const userId = parsed.id || parsed.user_id;
      if (userId) {
        return parseInt(userId);
      }
    }
    
    // Try to get from auth token (if it contains user info)
    const authToken = localStorage.getItem('auth_token');
    if (authToken && !authToken.startsWith('dummy_token_')) {
      // If token is not dummy, we can try to decode it or use a default
      // For now, we'll return null to indicate no valid user
      return null;
    }
  } catch (error) {
    console.error('Error getting user ID:', error);
  }
  
  // Return null if no valid user ID found
  return null;
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number format (US format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone is valid
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  return phoneRegex.test(phone)
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if URL is valid
 */
export const isValidUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Check if string is not empty
 * @param {string} str - String to check
 * @returns {boolean} True if string is not empty
 */
export const isNotEmpty = (str) => {
  return str && str.trim().length > 0
}

/**
 * Check if string has minimum length
 * @param {string} str - String to check
 * @param {number} minLength - Minimum length required
 * @returns {boolean} True if string meets minimum length
 */
export const hasMinLength = (str, minLength) => {
  return str && str.length >= minLength
}

/**
 * Check if string has maximum length
 * @param {string} str - String to check
 * @param {number} maxLength - Maximum length allowed
 * @returns {boolean} True if string is within maximum length
 */
export const hasMaxLength = (str, maxLength) => {
  return str && str.length <= maxLength
}

/**
 * Check if value is a number
 * @param {any} value - Value to check
 * @returns {boolean} True if value is a number
 */
export const isNumber = (value) => {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * Check if value is a positive number
 * @param {any} value - Value to check
 * @returns {boolean} True if value is a positive number
 */
export const isPositiveNumber = (value) => {
  return isNumber(value) && value > 0
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with isValid and errors
 */
export const validatePassword = (password) => {
  const errors = []
  
  if (!password) {
    errors.push('Password is required')
  } else {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number')
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
