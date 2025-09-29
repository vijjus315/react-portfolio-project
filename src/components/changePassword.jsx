import React, { useState } from 'react';
import { changePassword } from '../services/auth.js';
import '../styles/bootstrap';

const ChangePasswordModal = () => {
    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
        new_password_confirmation: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState({
        old_password: false,
        new_password: false,
        new_password_confirmation: false
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
        if (!formData.old_password) {
            newErrors.old_password = 'Old password is required';
        }
        
        if (!formData.new_password) {
            newErrors.new_password = 'New password is required';
        } else if (formData.new_password.length < 8) {
            newErrors.new_password = 'New password must be at least 8 characters';
        }
        
        if (!formData.new_password_confirmation) {
            newErrors.new_password_confirmation = 'Please confirm your new password';
        } else if (formData.new_password !== formData.new_password_confirmation) {
            newErrors.new_password_confirmation = 'Passwords do not match';
        }

        if (formData.old_password === formData.new_password) {
            newErrors.new_password = 'New password must be different from old password';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const response = await changePassword({
                old_password: formData.old_password,
                new_password: formData.new_password,
                new_password_confirmation: formData.new_password_confirmation,
                _token: getCsrf()
            });

            if (response.success) {
                // Close modal
                const modal = document.getElementById('changepwd');
                if (modal) {
                    const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
                    if (bootstrapModal) {
                        bootstrapModal.hide();
                    }
                }
                
                // Show success message
                if (window.toastr) {
                    window.toastr.success(response.message || 'Password changed successfully!');
                }
                
                // Reset form
                setFormData({
                    old_password: '',
                    new_password: '',
                    new_password_confirmation: ''
                });
            } else {
                if (response.errors) {
                    setErrors(response.errors);
                } else {
                    setErrors({ general: response.message || 'Failed to change password. Please try again.' });
                }
            }
        } catch (err) {
            console.error('Error changing password:', err);
            setErrors({ general: 'Failed to change password. Please try again.' });
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

    return (
        <div className="modal fade" id="changepwd" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content modal-content-width" style={{ borderRadius: "40px"}}>
                    <div className="modal-body pt-0">
                        <div className="d-flex align-items-center justify-content-between gap-2 pb-2">
                            <h1 className="font-oswald mb-0">Change Password</h1>
                            <button 
                                type="button" 
                                className="btn-closed border-0 bg-transparent" 
                                data-bs-dismiss="modal" 
                                aria-label="Close"
                            >
                                <img src={`${window.location.origin}/webassets/img/cross.svg`} alt="Close" />
                            </button>
                        </div>
                        <form id="changePasswordForm" onSubmit={handleSubmit}>
                            <div className="text-center py-3">
                                <img src={`${window.location.origin}/webassets/img/resetpwd.png`} alt="Change Password" />
                            </div>
                            <div className="form-group mb-3">
                                <label className="pb-2">Old Password</label>
                                <div className="position-relative">
                                    <input 
                                        type={showPassword.old_password ? "text" : "password"}
                                        name="old_password" 
                                        className="form-control common-input password-field" 
                                        placeholder="Old Password"
                                        value={formData.old_password}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        required
                                        style={{ outline: '1px solid gray', 
                    boxShadow: 'none', }}
                                    />
                                    <div className="icon-eye">
                                        <i 
                                            className={`fa ${showPassword.old_password ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
                                            aria-hidden="true"
                                            onClick={() => togglePasswordVisibility('old_password')}
                                            style={{ cursor: 'pointer' }}
                                        ></i>
                                    </div>
                                    <span className="text-danger error-message" id="old_password-error">{errors.old_password}</span>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label className="pb-2">New Password</label>
                                <div className="position-relative">
                                    <input 
                                        type={showPassword.new_password ? "text" : "password"}
                                        name="new_password" 
                                        className="form-control common-input password-field" 
                                        placeholder="New Password"
                                        value={formData.new_password}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        required
                                        style={{ outline: '1px solid gray', 
                    boxShadow: 'none', }}
                                    />
                                    <div className="icon-eye">
                                        <i 
                                            className={`fa ${showPassword.new_password ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
                                            aria-hidden="true"
                                            onClick={() => togglePasswordVisibility('new_password')}
                                            style={{ cursor: 'pointer' }}
                                        ></i>
                                    </div>
                                    <span className="text-danger error-message" id="new_password-error">{errors.new_password}</span>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label className="pb-2">Confirm New Password</label>
                                <div className="position-relative">
                                    <input 
                                        type={showPassword.new_password_confirmation ? "text" : "password"}
                                        name="new_password_confirmation" 
                                        className="form-control common-input password-field" 
                                        placeholder="Confirm New Password"
                                        value={formData.new_password_confirmation}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        required
                                        style={{ outline: '1px solid gray', 
                    boxShadow: 'none', }}
                                    />
                                    <div className="icon-eye">
                                        <i 
                                            className={`fa ${showPassword.new_password_confirmation ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
                                            aria-hidden="true"
                                            onClick={() => togglePasswordVisibility('new_password_confirmation')}
                                            style={{ cursor: 'pointer' }}
                                        ></i>
                                    </div>
                                    <span className="text-danger error-message" id="new_password_confirmation-error">{errors.new_password_confirmation}</span>
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
                                    style={{ backgroundColor: "var(--primary-theme)",
                                    color: "#fff", 
                                    borderRadius: "10px", 
                                    padding: "11px 31px", 
                                    height: "50px", 
                                    border: "0",
                                    textTransform: "capitalize", 
                                    fontSize: "16px"
                                }}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="spinner-border spinner-border-sm me-2" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            Updating...
                                        </>
                                    ) : (
                                        'Update'
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

export default ChangePasswordModal;
