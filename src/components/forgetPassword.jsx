import React, { useState } from 'react';
import { forgotPassword } from '../services/auth.js';
import '../styles/bootstrap';

const ForgotPasswordModal = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Function to get CSRF token
    const getCsrf = () => {
        const el = document.querySelector('meta[name="csrf-token"]');
        return el ? el.getAttribute('content') : '';
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            setError('Please enter your email address');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('https://staging.portacourts.com/api/v1/auth/forget-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            });
            
            const data = await response.json();

            if (data.success) {
                // Close forgot password modal
                const forgotModal = document.getElementById('forgotmodal');
                if (forgotModal) {
                    const bootstrapForgotModal = window.bootstrap.Modal.getInstance(forgotModal);
                    if (bootstrapForgotModal) {
                        bootstrapForgotModal.hide();
                    }
                }
                
                // Store email in localStorage to pass to verify OTP modal
                localStorage.setItem('reset_email', email);
                
                // Open verify OTP modal after a short delay
                setTimeout(() => {
                    const verifyModal = document.getElementById('verifyModal');
                    if (verifyModal) {
                        // Set the email in the verify modal
                        const emailInput = verifyModal.querySelector('input[name="email"]');
                        if (emailInput) {
                            emailInput.value = email;
                        }
                        
                        const bootstrapVerifyModal = new window.bootstrap.Modal(verifyModal);
                        bootstrapVerifyModal.show();
                    }
                }, 300);
                
                // Show success message
                if (window.toastr) {
                    window.toastr.success(data.message || 'OTP sent to your email!');
                }
                
                // Reset form
                setEmail('');
            } else {
                setError(data.message || 'Failed to send reset link. Please try again.');
            }
        } catch (err) {
            console.error('Error sending forgot password request:', err);
            setError('Failed to send reset link. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle input change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (error) {
            setError('');
        }
    };

    return (
        <div className="modal fade" id="forgotmodal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content modal-content-width">
                    <div className="modal-header border-0">
                        <button 
                            type="button" 
                            className="btn-closed border-0 bg-transparent text-end ms-auto" 
                            data-bs-dismiss="modal" 
                            aria-label="Close"
                        >
                            <img src={`${window.location.origin}/webassets/img/cross.svg`} alt="Close" />
                        </button>
                    </div>
                    <div className="modal-body pt-0">
                        <div className="text-center">
                            <img src={`${window.location.origin}/webassets/img/forgotpwd.png`} className="img-fluid" alt="Forgot Password" />
                            <h1 className="font-oswald pb-3">Forgot Password</h1>
                            <p>Enter the email you used to create your account so we can send you a link for resetting your password</p>
                        </div>
                        <form id="forgotPasswordForm" onSubmit={handleSubmit}>
                            <div className="form-group mb-4">
                                <label className="pb-2">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control common-input" 
                                    name="email" 
                                    placeholder="Email address"
                                    value={email}
                                    onChange={handleEmailChange}
                                    disabled={isLoading}
                                    required
                                />
                                <span className="text-danger error-message" id="forgot-error-email">{error}</span>
                            </div>
                            <div className="pt-3 pb-3">
                                <button 
                                    type="submit" 
                                    className="btn green-btn w-100 box-shadow"
                                    disabled={isLoading}
                                    style={{
                                        backgroundColor: isLoading ? '#6c757d' : 'var(--primary-theme)',
                                        border: 'none',
                                        padding: '12px 24px',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        color: 'white',
                                        cursor: isLoading ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="spinner-border spinner-border-sm me-2" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            Sending...
                                        </>
                                    ) : (
                                        'Send OTP'
                                    )}
                                </button>
                            </div>
                        </form>
                        
                        {/* Back to Login Link */}
                        <div className="text-center mt-3">
                            <a 
                                href="#" 
                                className="text-decoration-none f16-size fw-400"
                                style={{ color: 'var(--primary-theme)' }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Close forgot password modal
                                    const forgotModal = document.getElementById('forgotmodal');
                                    const bootstrapForgotModal = window.bootstrap.Modal.getInstance(forgotModal);
                                    if (bootstrapForgotModal) {
                                        bootstrapForgotModal.hide();
                                    }
                                    // Open login modal after a short delay
                                    setTimeout(() => {
                                        const loginModal = document.getElementById('loginmodal');
                                        if (loginModal) {
                                            const bootstrapLoginModal = new window.bootstrap.Modal(loginModal);
                                            bootstrapLoginModal.show();
                                        }
                                    }, 300);
                                }}
                            >
                                ← Back to Login
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordModal;
