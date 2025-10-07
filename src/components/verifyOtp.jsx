import React, { useState, useEffect } from 'react';
import '../styles/bootstrap';

const VerifyOtpModal = () => {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Load email from localStorage when modal opens
    useEffect(() => {
        const storedEmail = localStorage.getItem('reset_email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!otp || otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://3.138.53.79:4235/api/v1/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    otp: otp
                })
            });
            
            const data = await response.json();

            if (data.success) {
                // Close verify OTP modal
                const verifyModal = document.getElementById('verifyModal');
                if (verifyModal) {
                    const bootstrapVerifyModal = window.bootstrap.Modal.getInstance(verifyModal);
                    if (bootstrapVerifyModal) {
                        bootstrapVerifyModal.hide();
                    }
                }
                
                // Store email in localStorage to pass to reset password modal
                localStorage.setItem('reset_email', email);
                
                // Open reset password modal after a short delay
                setTimeout(() => {
                    const resetModal = document.getElementById('resetPasswordModal');
                    if (resetModal) {
                        // Set the email in the reset password modal
                        const emailInput = resetModal.querySelector('input[name="email"]');
                        if (emailInput) {
                            emailInput.value = email;
                        }
                        
                        const bootstrapResetModal = new window.bootstrap.Modal(resetModal);
                        bootstrapResetModal.show();
                    }
                }, 300);
                
                // Show success message
                if (window.toastr) {
                    window.toastr.success(data.message || 'OTP verified successfully!');
                }
                
                // Reset form
                setOtp('');
            } else {
                setError(data.message || 'Invalid OTP. Please try again.');
            }
        } catch (err) {
            console.error('Error verifying OTP:', err);
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle input change
    const handleOtpChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6); // Only numbers, max 6 digits
        setOtp(value);
        if (error) {
            setError('');
        }
    };

    // Handle email change (this will be set when modal opens)
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className="modal fade" id="verifyModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="verifyModalLabel" aria-hidden="true">
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
                            <img src={`${window.location.origin}/webassets/img/verify-email.png`} className="img-fluid" alt="Verify OTP" />
                            <h1 className="font-oswald pb-3">Verify OTP</h1>
                            <p>Please enter the 6-digit OTP sent to your email address</p>
                        </div>
                        <form id="verifyOtpForm" onSubmit={handleSubmit}>
                            <div className="form-group mb-4">
                                <label className="pb-2">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control common-input" 
                                    name="email" 
                                    placeholder="Email address"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label className="pb-2">OTP Code</label>
                                <input 
                                    type="text" 
                                    className="form-control common-input" 
                                    name="otp" 
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={handleOtpChange}
                                    maxLength="6"
                                    required
                                />
                                <span className="text-danger error-message">{error}</span>
                            </div>
                            <div className="pt-3 pb-3">
                                <button 
                                    type="submit" 
                                    className="btn green-btn w-100 box-shadow"
                                    disabled={isLoading || otp.length !== 6}
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
                                            Verifying...
                                        </>
                                    ) : (
                                        'Verify OTP'
                                    )}
                                </button>
                            </div>
                        </form>
                        
                        {/* Back to Forgot Password Link */}
                        <div className="text-center mt-3">
                            <a 
                                href="#" 
                                className="text-decoration-none f16-size fw-400"
                                style={{ color: 'var(--primary-theme)' }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Close verify OTP modal
                                    const verifyModal = document.getElementById('verifyModal');
                                    const bootstrapVerifyModal = window.bootstrap.Modal.getInstance(verifyModal);
                                    if (bootstrapVerifyModal) {
                                        bootstrapVerifyModal.hide();
                                    }
                                    // Open forgot password modal after a short delay
                                    setTimeout(() => {
                                        const forgotModal = document.getElementById('forgotmodal');
                                        if (forgotModal) {
                                            const bootstrapForgotModal = new window.bootstrap.Modal(forgotModal);
                                            bootstrapForgotModal.show();
                                        }
                                    }, 300);
                                }}
                            >
                                ← Back to Forgot Password
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtpModal;
