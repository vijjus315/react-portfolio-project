/**
 * Utility functions for OTP verification handling
 * Ensures consistent behavior across the application
 */

// Global flag to track OTP verification state
window.otpVerificationInProgress = false;

/**
 * Checks if user needs OTP verification and opens VerifyEmailModal if needed
 * @param {Object} userData - User data object from API response
 * @param {string} email - User's email address
 * @returns {boolean} - True if OTP verification is needed, false otherwise
 */
export const checkAndOpenOTPVerification = (userData, email) => {
    console.log('🔍 OTP UTILITY: Checking OTP verification status:', {
        is_otp_verified: userData?.is_otp_verified,
        email: email,
        userData: userData
    });

    // Check if user needs OTP verification
    // OTP verification is needed if is_otp_verified is 0, null, or undefined
    console.log('🔍 OTP UTILITY: userData exists?', !!userData);
    console.log('🔍 OTP UTILITY: userData.is_otp_verified =', userData?.is_otp_verified);
    console.log('🔍 OTP UTILITY: userData.is_otp_verified === 0?', userData?.is_otp_verified === 0);
    
    if (userData && userData.is_otp_verified === 0) {
        console.log('🔄 User needs OTP verification, opening VerifyEmailModal');
        
        // Set global flag to prevent interference
        window.otpVerificationInProgress = true;
        
        // Set email for OTP verification
        const emailDisplay = document.getElementById('emailDisplay');
        const otpEmailInput = document.getElementById('verifyOtpEmail');
        
        if (emailDisplay) {
            emailDisplay.textContent = email;
            console.log('✅ Email set in display element');
        } else {
            console.warn('⚠️ emailDisplay element not found');
        }
        
        if (otpEmailInput) {
            otpEmailInput.value = email;
            console.log('✅ Email set in input element');
        } else {
            console.warn('⚠️ otpEmailInput element not found');
        }

        // Open verify email modal
        console.log('🔍 OTP UTILITY: Looking for verifyemail modal element...');
        const verifyModal = document.getElementById('verifyemail');
        console.log('🔍 OTP UTILITY: verifyModal element found:', !!verifyModal);
        console.log('🔍 OTP UTILITY: verifyModal element:', verifyModal);
        
        if (verifyModal) {
            console.log('✅ OTP UTILITY: VerifyEmailModal found, opening...');
            try {
                // Clean up any existing modal states first
                document.body.classList.remove('modal-open');
                const backdrops = document.querySelectorAll('.modal-backdrop');
                backdrops.forEach(backdrop => backdrop.remove());
                
                // Ensure the modal is ready
                verifyModal.removeAttribute('aria-hidden');
                verifyModal.style.display = 'none';
                
                // Create and show the modal
                const verifyBootstrapModal = new window.bootstrap.Modal(verifyModal, {
                    backdrop: 'static',
                    keyboard: false,
                    focus: true
                });
                
                console.log('🔍 OTP UTILITY: Bootstrap modal instance created:', verifyBootstrapModal);
                
                // Add a small delay to ensure proper modal initialization
                setTimeout(() => {
                    verifyBootstrapModal.show();
                    console.log('🎉 OTP UTILITY: VerifyEmailModal should now be visible');
                }, 50);
                return true; // OTP verification is needed
            } catch (modalError) {
                console.error('❌ OTP UTILITY: Error opening modal:', modalError);
                return false;
            }
        } else {
            console.error('❌ OTP UTILITY: VerifyEmailModal element not found! Make sure VerifyEmailModal component is included in the page.');
            console.log('🔍 OTP UTILITY: Available elements with IDs containing "verify":', 
                Array.from(document.querySelectorAll('[id*="verify"]')).map(el => el.id));
            return false;
        }
    } else {
        console.log('✅ User OTP is already verified or no verification needed');
        return false; // No OTP verification needed
    }
};

/**
 * Checks if user needs OTP verification based on localStorage data
 * @returns {boolean} - True if OTP verification is needed, false otherwise
 */
export const checkOTPVerificationFromStorage = () => {
    try {
        const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
        const email = userData.email;
        
        if (email && userData.is_otp_verified === 0) {
            console.log('🔄 User in localStorage needs OTP verification');
            return checkAndOpenOTPVerification(userData, email);
        }
        
        return false;
    } catch (error) {
        console.error('Error checking OTP verification from storage:', error);
        return false;
    }
};

/**
 * Updates user data in localStorage after successful OTP verification
 * @param {Object} updatedUserData - Updated user data with is_otp_verified: 1
 */
export const updateUserDataAfterOTPVerification = (updatedUserData) => {
    try {
        // Clear the global flag
        window.otpVerificationInProgress = false;
        
        localStorage.setItem('user_data', JSON.stringify(updatedUserData));
        console.log('✅ User data updated after OTP verification');
        
        // Dispatch login event to update header
        window.dispatchEvent(new CustomEvent('userLoggedIn', { 
            detail: updatedUserData 
        }));
    } catch (error) {
        console.error('Error updating user data after OTP verification:', error);
    }
};

/**
 * Clears authentication data when OTP verification is cancelled
 * This ensures user is not considered logged in if they cancel OTP verification
 */
export const clearAuthDataOnOTPCancel = () => {
    try {
        // Clear the global flag
        window.otpVerificationInProgress = false;
        
        // Clear all localStorage data for a fresh start
        try {
            localStorage.clear();
            console.log('✅ All localStorage data cleared due to OTP verification cancellation');
        } catch (error) {
            console.error('⚠️ Failed to clear localStorage:', error);
            // Fallback: clear specific items individually
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            localStorage.removeItem('cart_items');
            localStorage.removeItem('cart_count');
            localStorage.removeItem('wishlist_count');
            localStorage.removeItem('guest_id');
            localStorage.removeItem('loginModalClosed');
            localStorage.removeItem('signupModalClosed');
            console.log('✅ Cleared specific localStorage items as fallback');
        }
        
        // Ensure page becomes active
        window.focus();
        document.body.focus();
        
        // Dispatch logout event to update header
        window.dispatchEvent(new CustomEvent('userLoggedOut'));
        
        // Dispatch a custom event to indicate page should be active
        window.dispatchEvent(new CustomEvent('pageActivated'));
    } catch (error) {
        console.error('Error clearing auth data on OTP cancel:', error);
    }
};

export default {
    checkAndOpenOTPVerification,
    checkOTPVerificationFromStorage,
    updateUserDataAfterOTPVerification,
    clearAuthDataOnOTPCancel
};
