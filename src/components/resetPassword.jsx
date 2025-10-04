import React, { useState, useEffect } from 'react';
import '../styles/bootstrap';

const ResetPasswordModal = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
        
        if (!password) {
            setError('Password is required');
            return;
        }
        
        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }
        
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://18.188.69.99:4235/api/v1/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            
            const data = await response.json();

            if (data.success) {
                // Close reset password modal
                const resetModal = document.getElementById('resetPasswordModal');
                if (resetModal) {
                    const bootstrapResetModal = window.bootstrap.Modal.getInstance(resetModal);
                    if (bootstrapResetModal) {
                        bootstrapResetModal.hide();
                    }
                }
                
                // Show success message
                if (window.toastr) {
                    window.toastr.success(data.message || 'Password reset successfully!');
                }
                
                // Reset form
                setPassword('');
                setConfirmPassword('');
                
                // Clear stored email
                localStorage.removeItem('reset_email');
                
                // Optionally redirect to login or show login modal
                setTimeout(() => {
                    const loginModal = document.getElementById('loginmodal');
                    if (loginModal) {
                        const bootstrapLoginModal = new window.bootstrap.Modal(loginModal);
                        bootstrapLoginModal.show();
                    }
                }, 1000);
                
            } else {
                setError(data.message || 'Failed to reset password. Please try again.');
            }
        } catch (err) {
            console.error('Error resetting password:', err);
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle input changes
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (error) {
            setError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (error) {
            setError('');
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className="modal fade" id="resetPasswordModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="resetPasswordModalLabel" aria-hidden="true">
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
                            <img src={`${window.location.origin}/webassets/img/resetpwd.png`} className="img-fluid" alt="Reset Password" />
                            <h1 className="font-oswald pb-3">Reset Password</h1>
                            <p>Enter your new password below</p>
                        </div>
                        <form id="resetPasswordForm" onSubmit={handleSubmit}>
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
                                <label className="pb-2">New Password</label>
                                <input 
                                    type="password" 
                                    className="form-control common-input" 
                                    name="password" 
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label className="pb-2">Confirm Password</label>
                                <input 
                                    type="password" 
                                    className="form-control common-input" 
                                    name="confirmPassword" 
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    required
                                />
                                <span className="text-danger error-message">{error}</span>
                            </div>
                            <div className="pt-3 pb-3">
                                <button 
                                    type="submit" 
                                    className="btn green-btn w-100 box-shadow"
                                    disabled={isLoading || !password || !confirmPassword}
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
                                            Resetting...
                                        </>
                                    ) : (
                                        'Reset Password'
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
                                    // Close reset password modal
                                    const resetModal = document.getElementById('resetPasswordModal');
                                    const bootstrapResetModal = window.bootstrap.Modal.getInstance(resetModal);
                                    if (bootstrapResetModal) {
                                        bootstrapResetModal.hide();
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

export default ResetPasswordModal;