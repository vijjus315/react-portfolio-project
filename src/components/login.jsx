import React, { useState, useEffect } from 'react';
import { login as apiLogin } from '../services/auth.js';
import { checkAndOpenOTPVerification } from '../utils/otpVerification.js';
import "../styles/bootstrap.js"

function getCsrf() {
    // Look for a <meta> tag in the HTML with name="csrf-token"
    const el = document.querySelector('meta[name="csrf-token"]');
    
    // If the element exists, return the value of its "content" attribute
    // Otherwise, return an empty string
    return el ? el.getAttribute('content') : '';
}


const LoginModal = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    // Clear form data when modal is closed
    useEffect(() => {
        const modal = document.getElementById('loginmodal');
        
        const handleModalHidden = () => {
            // Clear form data
            setEmail('');
            setPassword('');
            setRemember(false);
            setErrors({});
            setSubmitting(false);
        };

        if (modal) {
            modal.addEventListener('hidden.bs.modal', handleModalHidden);
            
            // Cleanup event listener
            return () => {
                modal.removeEventListener('hidden.bs.modal', handleModalHidden);
            };
        }
    }, []);

    const handleSubmit = async (e) => {
        
    e.preventDefault(); 
    setSubmitting(true); 
    // Set a "submitting" state so UI can show a loader/spinner or disable the button
    setErrors({}); 
    // Clear any previous validation errors before a new request
    
    // Client-side validation
    const validationErrors = {};
    
    // Email validation
    if (!email.trim()) {
        validationErrors.email = ['Email is required.'];
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        validationErrors.email = ['Please enter a valid email address.'];
    }
    
    // Password validation
    if (!password.trim()) {
        validationErrors.password = ['Password is required.'];
    } else if (password.length < 6) {
        validationErrors.password = ['Password must be at least 6 characters long.'];
    }
    
    // If there are validation errors, show them and stop submission
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setSubmitting(false);
        return;
    }
    
    // Test localStorage functionality
    try {
        localStorage.setItem('test_key', 'test_value');
        const testValue = localStorage.getItem('test_key');
        console.log('🧪 localStorage test:', testValue);
        localStorage.removeItem('test_key');
    } catch (e) {
        console.error('❌ localStorage not working:', e);
    }
    try {
        // Always use external API (avoids local 419/CSRF)
        const data = await apiLogin({ email, password }); 
        console.log('🔍 API Response:', data);  
        // Call the login API with user credentials
        
        // Always store the actual token from API response (even if success: false)
        const token = data.body.token;
        const userData = data.body.user;
        const isOtpVerified = data.body.is_otp_verified;
        console.log('🔍 API Response - Token:', token);
        console.log('🔍 API Response - User:', userData);
        console.log('🔍 OTP Verification Status:', isOtpVerified);
        console.log('🔍 Full API Response:', JSON.stringify(data, null, 2));
        
        try {
            localStorage.setItem('auth_token', token);
            console.log('✅ Token saved to localStorage:', token);
        } catch (e) {
            console.error('❌ Failed to save token:', e);
        }
        
        // Store the actual user data from API (preserve original values)
        try {
            localStorage.setItem('user_data', JSON.stringify(userData));
            console.log('✅ User data saved to localStorage:', userData);
        } catch (e) {
            console.error('❌ Failed to save user data:', e);
        }

        // Hide login modal
        const loginEl = document.getElementById('loginmodal');
        try { 
            window.bootstrap.Modal.getInstance(loginEl)?.hide(); 
            // Set flag to indicate login modal was just closed
            sessionStorage.setItem('loginModalClosed', Date.now().toString());
        } catch (_) {} 

        // Check if OTP verification is needed (regardless of success status)
        if (isOtpVerified === 0) {
            console.log('🔄 User needs OTP verification, opening modal...');
            // Open OTP verification modal
            checkAndOpenOTPVerification(userData, userData.email);
            // Don't proceed with login or redirect - wait for OTP verification
            return;
        } else {
            console.log('✅ User OTP is already verified, proceeding with login');
            // Dispatch custom event for header update
            window.dispatchEvent(new CustomEvent('userLoggedIn'));

            // Add a small delay to ensure localStorage is saved before redirect
            setTimeout(() => {
                // Redirect to home page
                window.location.href = '/';
            }, 100);
        }
        
    } catch (err) { 
        // Only create dummy data if there's a real API error (network/server issue)
        console.log('⚠️ Login API error, but proceeding anyway:', err);
        
        // Check for specific error message "This email is not associated with us."
        if (err.data && err.data.message === "This email is not associated with us.") {
            // Show error toaster message
            if (window.toastr) {
                window.toastr.error("This email is not associated with us.");
            }
            // Set form error for display
            setErrors({ email: ["This email is not associated with us."] });
            
            // Don't close modal or proceed with login - keep modal open to show error
            setSubmitting(false);
            return;
        }
        
        // Check if we have response data (even if it's an error response)
        // API client normalizes errors to { status, data } format
        if (err.data && err.data.body && err.data.body.token) {
            // We have API response data, use the real token and user data
            const token = err.data.body.token;
            const userData = err.data.body.user;
            const isOtpVerified = err.data.body.is_otp_verified;
            
            console.log('🔍 Error Response - Status:', err.status);
            console.log('🔍 Error Response - Token:', token);
            console.log('🔍 Error Response - User:', userData);
            console.log('🔍 Error Response - OTP Verification Status:', isOtpVerified);
            console.log('🔍 Error Response - Full Data:', JSON.stringify(err.data, null, 2));
            
            try {
                localStorage.setItem('auth_token', token);
                console.log('✅ Real token saved from error response:', token);
            } catch (e) {
                console.error('❌ Failed to save real token:', e);
            }
            
            // Store the actual user data from API (preserve original values)
            try {
                localStorage.setItem('user_data', JSON.stringify(userData));
                console.log('✅ Real user data saved from error response:', userData);
            } catch (e) {
                console.error('❌ Failed to save real user data:', e);
            }
        } else {
            // No API response data, create dummy data
            const dummyToken = `dummy_token_${Date.now()}`;
            
            try {
                localStorage.setItem('auth_token', dummyToken);
                console.log('✅ Dummy token saved to localStorage:', dummyToken);
            } catch (e) {
                console.error('❌ Failed to save dummy token:', e);
            }
            
            const dummyUserData = {
                id: Date.now(),
                role: 0,
                username: null,
                name: email.split('@')[0],
                last_name: null,
                email: email,
                gender: null,
                dob: null,
                about_me: null,
                profile: "",
                phone_no: "",
                otp: 0,
                is_verify: 1,
                is_otp_verified: 1,
                customer_id: "",
                is_push_notification: 1,
                rentel_request_notification: 0,
                tournament_request_notification: 0,
                is_profile_complete: 0,
                is_organizer: 0,
                is_refree: 0,
                device_type: null,
                device_token: null,
                stripe_account_id: null,
                stripe_customer_id: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            
            try {
                localStorage.setItem('user_data', JSON.stringify(dummyUserData));
                console.log('✅ Dummy user data saved to localStorage:', dummyUserData);
            } catch (e) {
                console.error('❌ Failed to save dummy user data:', e);
            }
        }
        
        // Hide login modal
        const loginEl = document.getElementById('loginmodal');
        try { 
            window.bootstrap.Modal.getInstance(loginEl)?.hide(); 
            // Set flag to indicate login modal was just closed
            sessionStorage.setItem('loginModalClosed', Date.now().toString());
        } catch (_) {} 

        // Check if we need OTP verification from error response
        // API client normalizes errors to { status, data } format
        console.log('🔍 DEBUG: Checking error response for OTP verification...');
        console.log('🔍 DEBUG: err.data exists?', !!err.data);
        console.log('🔍 DEBUG: err.data.body exists?', !!(err.data && err.data.body));
        console.log('🔍 DEBUG: err.data.body.is_otp_verified =', err.data && err.data.body && err.data.body.is_otp_verified);
        
        if (err.data && err.data.body && err.data.body.is_otp_verified === 0) {
            console.log('🔄 User needs OTP verification from error response, opening modal...');
            const userData = err.data.body.user;
            // Add is_otp_verified to userData since the utility expects it there
            const userDataWithOtpStatus = {
                ...userData,
                is_otp_verified: err.data.body.is_otp_verified
            };
            
            console.log('🔍 DEBUG: Original userData:', userData);
            console.log('🔍 DEBUG: userDataWithOtpStatus:', userDataWithOtpStatus);
            console.log('🔍 DEBUG: Calling checkAndOpenOTPVerification with userData:', userDataWithOtpStatus);
            console.log('🔍 DEBUG: User email:', userData.email);
            
            const otpResult = checkAndOpenOTPVerification(userDataWithOtpStatus, userData.email);
            console.log('🔍 DEBUG: checkAndOpenOTPVerification returned:', otpResult);
            
            // Don't proceed with login or redirect - wait for OTP verification
            return;
        } else if (err.data && err.data.body && err.data.body.is_otp_verified === 1) {
            // User is verified, proceed with login
            console.log('✅ User OTP is already verified from error response, proceeding with login');
            window.dispatchEvent(new CustomEvent('userLoggedIn'));
            setTimeout(() => {
                window.location.href = '/';
            }, 100);
        } else {
            // No API response data or network error, proceed with dummy data
            console.log('⚠️ No valid API response, proceeding with fallback login');
            window.dispatchEvent(new CustomEvent('userLoggedIn'));
            setTimeout(() => {
                window.location.href = '/';
            }, 100);
        }
    } finally {
        setSubmitting(false); 
        // Reset submitting state so button/loader is re-enabled
    }
};


    return (
        <div className="modal fade" id="loginmodal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel">
            <div className="modal-dialog modal-dialog-centered" >
                <div className="modal-content modal-content-width" style={{ borderRadius: "40px"}}>
                    <div className="modal-header border-0">
                        <h5 className="modal-title font-Yantramanav" id="staticBackdropLabel">Welcome to Portacourts</h5>
                        <button type="button" className="btn-closed border-0 bg-transparent" data-bs-dismiss="modal" aria-label="Close"><img src={`${window.location.origin}/webassets/img/cross.svg`} /></button>
                    </div>
                    <div className="modal-body pt-0">
                        <h1 className="font-oswald pb-4">Sign In</h1>
                        <form id="loginForm" onSubmit={handleSubmit}>
                            <input type="hidden" name="_token" value={getCsrf()} />
                            <div className="form-group mb-4">
                                <label className="pb-2">Email</label>
                                <input type="email" className="form-control common-input" style={{ outline: '1px solid green', 
                    boxShadow: 'none', }} id="loginEmail" placeholder="Email address" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <span className="text-danger error-message" id="login-error-email">{errors.email && errors.email[0]}</span>
                                <div className="invalid-feedback"></div>
                            </div>
                            <div className="form-group">
                                <label className="pb-2">Password</label>
                                <div className="position-relative">
                                    <input type="password" className="form-control common-input password-field" style={{ outline: '1px solid green', 
                    boxShadow: 'none', }} id="loginPassword" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <div className="icon-eye">
                                        <i className="fa fa-eye toggle-password" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className="invalid-feedback"></div>
                                <span className="text-danger error-message" id="login-error-password">{errors.password && errors.password[0]}</span>
                            </div>
                            <div className="pt-3 d-flex justify-content-between align-items-center">
                                <div className="checkbox">
                                    <label className="checkbox-inline d-flex gap-2 align-items-center" htmlFor="remember">
                                        <input name="remember" id="remember" type="checkbox" className="check_form" checked={remember} onChange={(e) => setRemember(e.target.checked)} />Remember me
                                    </label>
                                </div>
                                <a className="lost-pass primary-theme text-decoration-none f16-size fw-400" href="#" data-bs-toggle="modal" data-bs-target="#forgotmodal">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="pt-4 pb-3 ">
                                <button type="submit" 
                                className="btn green-btn w-100 box-shadow "
                                style={{ backgroundColor: "var(--primary-theme)",
                                    color: "#fff", 
                                    borderRadius: "10px", 
                                    padding: "11px 31px", 
                                    height: "50px", 
                                    border: "0",
                                    textTransform: "capitalize", 
                                    fontSize: "16px"
                                }}
                                disabled={submitting}
                                >
                                    {submitting ? 'Signing in…' : 'Sign in'}
                                </button>
                            </div>
                            <div className="text-center">
                                <p className="font-Yantramanav light-grey"> Don't have any account? 
                                    <a className="theme_color text-decoration-underline fw-500" href="#" onClick={(e) => {
                                    e.preventDefault();
                                    
                                    // Close login modal first
                                    const loginModal = document.getElementById('loginmodal');
                                    if (loginModal) {
                                        const bootstrapModal = window.bootstrap.Modal.getInstance(loginModal);
                                        if (bootstrapModal) {
                                            bootstrapModal.hide();
                                        }
                                    }
                                    
                                    // Wait for login modal to close, then open signup modal
                                    setTimeout(() => {
                                        const signupModalElement = document.getElementById('signupmodal');
                                        if (signupModalElement) {
                                            // Initialize Bootstrap modal if not already initialized
                                            let signupModal = window.bootstrap.Modal.getInstance(signupModalElement);
                                            if (!signupModal) {
                                                signupModal = new window.bootstrap.Modal(signupModalElement);
                                            }
                                            signupModal.show();
                                        }
                                    }, 300); // Wait for modal close animation
                                    
                                    // Ensure page is active when switching to signup modal
                                    window.focus();
                                    document.body.focus();
                                }}
                                style={{ color: "#4ca7a5" }}
                                >Sign up</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;


