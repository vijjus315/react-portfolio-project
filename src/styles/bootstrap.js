import 'bootstrap/dist/js/bootstrap.bundle.min.js';

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// import Pusher from 'pusher-js';
// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
//     wsHost: import.meta.env.VITE_PUSHER_HOST ?? `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
//     wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
//     wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });

/**
 * Global modal event listeners to ensure page activation and modal compatibility
 * This ensures that when any modal is shown or hidden, the page remains active
 * and other modals can open properly
 */

// Utility function to safely handle modal focus
function safeModalFocus(modalElement) {
    try {
        // Ensure the modal element exists and is visible
        if (modalElement && modalElement.offsetParent !== null) {
            // Find the first focusable element in the modal
            const focusableElements = modalElement.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            } else {
                // Fallback to modal element itself
                modalElement.focus();
            }
        }
    } catch (error) {
        console.warn('Error handling modal focus:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Listen for all modal show events
    document.addEventListener('show.bs.modal', function(event) {
        console.log('🔄 Modal about to show:', event.target.id);
    });
    
    document.addEventListener('shown.bs.modal', function(event) {
        console.log('🎉 Modal shown:', event.target.id);
        
        // Ensure page is active when any modal is shown
        window.focus();
        document.body.focus();
        
        // Ensure the modal doesn't have aria-hidden when shown
        if (event.target) {
            event.target.removeAttribute('aria-hidden');
        }
        
        // Safely handle modal focus
        safeModalFocus(event.target);
    });

    // Listen for all modal hide events
    document.addEventListener('hidden.bs.modal', function(event) {
        // Skip cleanup if OTP verification is in progress
        if (window.otpVerificationInProgress) {
            console.log('🔄 Skipping cleanup - OTP verification in progress');
            return;
        }
        
        // Skip cleanup if this is the OTP modal and user needs verification
        const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
        const authToken = localStorage.getItem('auth_token');
        
        if (event.target && event.target.id === 'verifyemail' && 
            authToken && userData && userData.is_otp_verified === 0) {
            console.log('🔄 Skipping cleanup for OTP modal - user needs verification');
            return;
        }
        
        // Comprehensive cleanup when any modal is hidden - don't dispose instances
        setTimeout(() => {
            try {
                console.log('🔄 Performing comprehensive modal cleanup...');
                
                // Focus management
                window.focus();
                document.body.focus();
                
                // Clean up modal states
                if (document.body && document.body.classList) {
                    document.body.classList.remove('modal-open');
                }
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
                
                // Remove all modal backdrops
                const backdrops = document.querySelectorAll('.modal-backdrop');
                backdrops.forEach(backdrop => {
                    try {
                        backdrop.remove();
                    } catch (backdropError) {
                        console.warn('Error removing backdrop:', backdropError);
                    }
                });
                
                // Remove aria-hidden from ALL modals to prevent accessibility conflicts
                const allModals = document.querySelectorAll('.modal');
                allModals.forEach(modal => {
                    try {
                        // Always remove aria-hidden to prevent conflicts
                        modal.removeAttribute('aria-hidden');
                        
                        // Reset modal display state
                        if (modal.classList) {
                            modal.classList.remove('show', 'fade');
                        }
                        modal.style.display = 'none';
                        modal.style.paddingRight = '';
                    } catch (modalError) {
                        console.warn('Error cleaning up modal:', modalError);
                    }
                });
                
                // DON'T dispose modal instances - let them remain for reuse
                console.log('✅ Global modal cleanup completed - all modals ready for next use');
            } catch (cleanupError) {
                console.error('Error during global modal cleanup:', cleanupError);
            }
        }, 50);
    });

    // Listen for pageActivated custom event
    window.addEventListener('pageActivated', function() {
        window.focus();
        document.body.focus();
    });
    
    // Additional cleanup for modal button clicks - minimal interference
    document.addEventListener('click', function(event) {
        if (event.target && event.target.matches('[data-bs-toggle="modal"]')) {
            // Don't interfere if OTP verification is in progress
            if (window.otpVerificationInProgress) {
                console.log('🔄 OTP verification in progress, skipping modal button cleanup');
                return;
            }
            
            // Only cleanup for OTP modal specifically - avoid interfering with other modals
            if (event.target.getAttribute('data-bs-target') === '#verifyemail') {
                console.log('🔄 OTP modal button clicked, performing minimal cleanup');
                // Minimal cleanup - just remove any lingering backdrops
                setTimeout(() => {
                    try {
                        const backdrops = document.querySelectorAll('.modal-backdrop');
                        backdrops.forEach(backdrop => {
                            try {
                                backdrop.remove();
                            } catch (backdropError) {
                                console.warn('Error removing backdrop:', backdropError);
                            }
                        });
                        console.log('✅ Backdrop cleanup completed for OTP modal');
                    } catch (cleanupError) {
                        console.warn('Error during minimal cleanup:', cleanupError);
                    }
                }, 10);
            } else {
                console.log('🔄 Other modal button clicked:', event.target.getAttribute('data-bs-target'));
            }
        }
    });
    
    // Global error handler for Bootstrap modal errors
    window.addEventListener('error', function(event) {
        if (event.error && event.error.message && 
            (event.error.message.includes('focus') || event.error.message.includes('classList') || 
             event.error.message.includes('aria-hidden'))) {
            console.warn('Bootstrap modal error caught and handled:', event.error);
            event.preventDefault();
            
            // Try to recover by cleaning up modal states
            try {
                // Comprehensive modal cleanup
                const allModals = document.querySelectorAll('.modal');
                allModals.forEach(modal => {
                    try {
                        // Dispose of existing modal instances
                        if (window.bootstrap && window.bootstrap.Modal) {
                            const existingModal = window.bootstrap.Modal.getInstance(modal);
                            if (existingModal && typeof existingModal.dispose === 'function') {
                                existingModal.dispose();
                            }
                        }
                        
                        // Reset modal state
                        modal.removeAttribute('aria-hidden');
                        if (modal.classList) {
                            modal.classList.remove('show', 'fade');
                        }
                        modal.style.display = 'none';
                        modal.style.paddingRight = '';
                    } catch (modalError) {
                        console.warn('Error cleaning up modal in error handler:', modalError);
                    }
                });
                
                // Clean up body states
                if (document.body && document.body.classList) {
                    document.body.classList.remove('modal-open');
                }
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
                
                // Remove all modal backdrops
                const backdrops = document.querySelectorAll('.modal-backdrop');
                backdrops.forEach(backdrop => {
                    try {
                        backdrop.remove();
                    } catch (backdropError) {
                        console.warn('Error removing backdrop in error handler:', backdropError);
                    }
                });
                
                // Clear OTP verification flag if it's set
                if (window.otpVerificationInProgress) {
                    window.otpVerificationInProgress = false;
                }
            } catch (cleanupError) {
                console.warn('Error during modal cleanup:', cleanupError);
            }
        }
    });
});
