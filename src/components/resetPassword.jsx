import React, { useState, useEffect } from 'react';
import { resetPassword } from '../services/auth.js';
import '../styles/bootstrap';

const ResetPasswordModal = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState({
        password: false,
        password_confirmation: false
    });

    // Function to get CSRF token
    const getCsrf = () => {
        const el = document.querySelector('meta[name="csrf-token"]');
        return el ? el.getAttribute('content') : '';
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        const newErrors = {};
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        
        if (!formData.password_confirmation) {
            newErrors.password_confirmation = 'Please confirm your password';
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const response = await resetPassword({
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.password_confirmation,
                _token: getCsrf()
            });

            if (response.success) {
                // Close current modal
                const modal = document.getElementById('resetPasswordModal');
                if (modal) {
                    const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
                    if (bootstrapModal) {
                        bootstrapModal.hide();
                    }
                }
                
                // Open success modal
                const successModal = document.getElementById('successfullmodal');
                if (successModal) {
                    const successBootstrapModal = new window.bootstrap.Modal(successModal);
                    successBootstrapModal.show();
                }
                
                // Show success message
                if (window.toastr) {
                    window.toastr.success(response.message || 'Password reset successfully!');
                }
            } else {
                if (response.errors) {
                    setErrors(response.errors);
                } else {
                    setErrors({ general: response.message || 'Failed to reset password. Please try again.' });
                }
            }
        } catch (err) {
            console.error('Error resetting password:', err);
            setErrors({ general: 'Failed to reset password. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    // Set email when modal is shown
    useEffect(() => {
        const modal = document.getElementById('resetPasswordModal');
        if (modal) {
            const handleShow = () => {
                const emailInput = document.getElementById('resetEmail');
                if (emailInput) {
                    setFormData(prev => ({
                        ...prev,
                        email: emailInput.value
                    }));
                }
            };

            modal.addEventListener('shown.bs.modal', handleShow);
            return () => {
                modal.removeEventListener('shown.bs.modal', handleShow);
            };
        }
    }, []);

    return (
        <div className="modal fade" id="resetPasswordModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                            <h1 className="font-oswald pb-2">Reset Password</h1>
                            <p>Choose a new password for your account</p>
                        </div>
                        <form id="resetPasswordForm" onSubmit={handleSubmit}>
                            <input type="hidden" id="resetEmail" name="email" value={formData.email} />
                            <div className="form-group mb-3">
                                <label className="pb-2">New Password</label>
                                <div className="position-relative">
                                    <input 
                                        type={showPassword.password ? "text" : "password"}
                                        className="form-control common-input password-field" 
                                        name="password" 
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        required
                                    />
                                    <div className="icon-eye">
                                        <i 
                                            className={`fa ${showPassword.password ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
                                            aria-hidden="true"
                                            onClick={() => togglePasswordVisibility('password')}
                                            style={{ cursor: 'pointer' }}
                                        ></i>
                                    </div>
                                    <span className="text-danger error-message" id="reset-error-password">{errors.password}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="pb-2">Confirm New Password</label>
                                <div className="position-relative">
                                    <input 
                                        type={showPassword.password_confirmation ? "text" : "password"}
                                        className="form-control common-input password-field" 
                                        name="password_confirmation" 
                                        placeholder="Password"
                                        value={formData.password_confirmation}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        required
                                    />
                                    <div className="icon-eye">
                                        <i 
                                            className={`fa ${showPassword.password_confirmation ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
                                            aria-hidden="true"
                                            onClick={() => togglePasswordVisibility('password_confirmation')}
                                            style={{ cursor: 'pointer' }}
                                        ></i>
                                    </div>
                                    <span className="text-danger error-message" id="reset-error-password_confirmation">{errors.password_confirmation}</span>
                                </div>
                            </div>
                            {errors.general && (
                                <div className="text-danger text-center mb-3">{errors.general}</div>
                            )}
                            <div className="pt-4 pb-3">
                                <button 
                                    type="submit" 
                                    className="btn green-btn w-100 box-shadow"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="spinner-border spinner-border-sm me-2" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            Resetting...
                                        </>
                                    ) : (
                                        'Reset'
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

export default ResetPasswordModal;
