import React, { useState, useEffect } from 'react';
import { updateProfile } from '../services/auth.js';
import '../styles/bootstrap';

const EditProfileModal = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        profile: null
    });
    const [profilePreview, setProfilePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

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

    // Handle file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({
                    ...prev,
                    profile: 'Please select a valid image file'
                }));
                return;
            }

            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({
                    ...prev,
                    profile: 'File size must be less than 5MB'
                }));
                return;
            }

            setFormData(prev => ({
                ...prev,
                profile: file
            }));

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePreview(e.target.result);
            };
            reader.readAsDataURL(file);

            // Clear error
            if (errors.profile) {
                setErrors(prev => ({
                    ...prev,
                    profile: ''
                }));
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('mobile', formData.mobile);
            formDataToSend.append('_token', getCsrf());
            
            if (formData.profile) {
                formDataToSend.append('profile', formData.profile);
            }

            const response = await updateProfile(formDataToSend);

            if (response.success) {
                // Close modal
                const modal = document.getElementById('editprofile');
                if (modal) {
                    const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
                    if (bootstrapModal) {
                        bootstrapModal.hide();
                    }
                }
                
                // Show success message
                if (window.toastr) {
                    window.toastr.success(response.message || 'Profile updated successfully!');
                }
                
                // Update user data in localStorage if available
                try {
                    const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
                    const updatedUserData = {
                        ...userData,
                        name: formData.name,
                        email: formData.email,
                        phone_no: formData.mobile,
                        profile: response.data?.profile || userData.profile
                    };
                    localStorage.setItem('user_data', JSON.stringify(updatedUserData));
                    
                    // Dispatch event to update header
                    window.dispatchEvent(new CustomEvent('userUpdated', { detail: updatedUserData }));
                } catch (err) {
                    console.error('Error updating user data in localStorage:', err);
                }
            } else {
                if (response.errors) {
                    setErrors(response.errors);
                } else {
                    setErrors({ general: response.message || 'Failed to update profile. Please try again.' });
                }
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            setErrors({ general: 'Failed to update profile. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    // Load user data when modal is shown
    useEffect(() => {
        const modal = document.getElementById('editprofile');
        if (modal) {
            const handleShow = () => {
                try {
                    const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
                    setFormData({
                        name: userData.name || '',
                        email: userData.email || '',
                        mobile: userData.phone_no || '',
                        profile: null
                    });
                    setProfilePreview(userData.profile ? `${window.location.origin}/storage/${userData.profile}` : `${window.location.origin}/webassets/img/dummy.png`);
                } catch (err) {
                    console.error('Error loading user data:', err);
                }
            };

            modal.addEventListener('shown.bs.modal', handleShow);
            return () => {
                modal.removeEventListener('shown.bs.modal', handleShow);
            };
        }
    }, []);

    return (
        <div className="modal fade" id="editprofile" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" >
                <div className="modal-content modal-content-width" style={{ borderRadius: "40px"}}>
                    <div className="modal-body pt-0">
                        <div className="d-flex align-items-center justify-content-between gap-2 pb-2">
                            <h1 className="font-oswald mb-0">My Account</h1>
                            <button 
                                type="button" 
                                className="btn-closed border-0 bg-transparent" 
                                data-bs-dismiss="modal" 
                                aria-label="Close"
                            >
                                <img src={`${window.location.origin}/webassets/img/cross.svg`} alt="Close" />
                            </button>
                        </div>
                        <form id="editProfileForm" onSubmit={handleSubmit}>
                            <div className="profile-upload mb-2 gym-profile-upload">
                                <div className="position-relative">
                                    <div>
                                        <img 
                                            id="frame" 
                                            className="preview-after-gym" 
                                            src={profilePreview || `${window.location.origin}/webassets/img/dummy.png`}
                                            alt="Profile Preview"
                                        />
                                    </div>
                                    <div className="edit-pentool">
                                        <div className="position-relative">
                                            <div>
                                                <img src={`${window.location.origin}/webassets/img/upload-icon.svg`} alt="Upload" />
                                            </div>
                                            <input 
                                                type="file" 
                                                name="profile" 
                                                accept="image/*" 
                                                className="input-upload-gym"
                                                onChange={handleFileChange}
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {errors.profile && (
                                    <div className="text-danger text-center mt-2">{errors.profile}</div>
                                )}
                            </div>
                            <div className="form-group mb-4">
                                <label className="pb-2">Name</label>
                                <input 
                                    type="text" 
                                    className="form-control common-input" 
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    required
                                    style={{ 
                                            border: '1px solid #ccc',     
                                            outline: 'none',              
                                            boxShadow: 'none',
                                            borderRadius: "10px"             
                                        }}
                                />
                                {errors.name && (
                                    <span className="text-danger error-message">{errors.name}</span>
                                )}
                            </div>
                            <div className="form-group mb-4">
                                <label className="pb-2">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control common-input" 
                                    name="email" 
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    required
                                    style={{ 
                                            border: '1px solid #ccc',     
                                            outline: 'none',              
                                            boxShadow: 'none',
                                            borderRadius: "10px"             
                                        }}
                                />
                                {errors.email && (
                                    <span className="text-danger error-message">{errors.email}</span>
                                )}
                            </div>
                            <div className="form-group mb-4">
                                <label className="pb-2">Mobile No.</label>
                                <div className="position-relative">
                                    <input 
                                        type="text" 
                                        className="form-control common-input" 
                                        name="mobile" 
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        required
                                        style={{ 
                                            border: '1px solid #ccc',     
                                            outline: 'none',              
                                            boxShadow: 'none',
                                            borderRadius: "10px"             
                                        }}
                                    />
                                </div>
                                {errors.mobile && (
                                    <span className="text-danger error-message">{errors.mobile}</span>
                                )}
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

export default EditProfileModal;
