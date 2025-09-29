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
            const response = await forgotPassword({
                email: email,
                _token: getCsrf()
            });

            if (response.success) {
                // Close modal
                const modal = document.getElementById('forgotmodal');
                if (modal) {
                    const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
                    if (bootstrapModal) {
                        bootstrapModal.hide();
                    }
                }
                
                // Show success message
                if (window.toastr) {
                    window.toastr.success(response.message || 'Password reset link sent to your email!');
                }
                
                // Reset form
                setEmail('');
            } else {
                setError(response.message || 'Failed to send reset link. Please try again.');
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
                                    disabled={isLoading || !email}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="spinner-border spinner-border-sm me-2" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            Sending...
                                        </>
                                    ) : (
                                        'Send'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordModal;
