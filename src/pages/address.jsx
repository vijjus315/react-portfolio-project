import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import LoginModal from '../components/login.jsx';
import SignupModal from '../components/signup.jsx';
import VerifyEmailModal from '../components/verifyEmail.jsx';
import ChangePasswordModal from '../components/changePassword.jsx';
import EditProfileModal from '../components/editProfile.jsx';
import { getAddresses, addAddress, updateAddress, deleteAddress } from '../services/address.js';
import '../styles/bootstrap';

const Address = () => {
    const [addresses, setAddresses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAddressType, setSelectedAddressType] = useState('home');
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        country: '',
        street_address: '',
        city: '',
        postcode: '',
        county: '',
        other_address_type: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchAddresses();
        
        // Cleanup function to remove modal backdrops when component unmounts
        return () => {
            const backdrops = document.querySelectorAll('.modal-backdrop');
            backdrops.forEach(backdrop => backdrop.remove());
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, []);

    // Initialize Bootstrap dropdowns whenever addresses change
    useEffect(() => {
        const initializeDropdowns = () => {
            // Use jQuery to initialize Bootstrap dropdowns
            if (window.$ && window.$.fn.dropdown) {
                window.$('.dropdown-toggle').dropdown();
            } else {
                // Fallback to vanilla Bootstrap
                const dropdownElements = document.querySelectorAll('.dropdown-toggle');
                dropdownElements.forEach(element => {
                    const existingDropdown = window.bootstrap?.Dropdown?.getInstance(element);
                    if (existingDropdown) {
                        existingDropdown.dispose();
                    }
                    if (window.bootstrap?.Dropdown) {
                        new window.bootstrap.Dropdown(element);
                    }
                });
            }
        };

        // Initialize dropdowns after addresses are rendered
        if (addresses.length > 0) {
            setTimeout(initializeDropdowns, 200);
        }
    }, [addresses]);

    const fetchAddresses = async () => {
        try {
            setIsLoading(true);
            const response = await getAddresses();
            console.log('Address API response:', response);
            if (response.success) {
                // Check if addresses are in response.data or response.body
                const addressesData = response.data || response.body || [];
                setAddresses(Array.isArray(addressesData) ? addressesData : []);
            } else {
                setError(response.message || 'Failed to fetch addresses');
            }
        } catch (err) {
            console.error('Error fetching addresses:', err);
            setError('Failed to fetch addresses');
        } finally {
            setIsLoading(false);
        }
    };

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

    const handleAddressTypeChange = (type) => {
        setSelectedAddressType(type);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        setIsSubmitting(true);
        setErrors({});

        try {
            const submitData = {
                ...formData,
                address_type: selectedAddressType
            };

            let response;
            if (editingAddressId) {
                // Update existing address
                response = await updateAddress(editingAddressId, submitData);
            } else {
                //! it got printed.
                console.log("rohitwa");
                // Add new address
        //         try {
        // //! without using try catch you can't move ahead that means if u want to print submit data it can't.
        //             response = await addAddress(submitData);
        //         } catch (err) {
        //             console.error("Error in addAddress:", err);
        //         }
                //? old code without try catch
                response = await addAddress(submitData);
                console.log(submitData);
            }
            
            if (response.success) {
                // Close modal first
                const modal = document.getElementById('addaddress');
                if (modal) {
                    const bsModal = window.bootstrap.Modal.getInstance(modal);
                    if (bsModal) {
                        bsModal.hide();
                    }
                }
                
                // Remove any remaining modal backdrops
                setTimeout(() => {
                    const backdrops = document.querySelectorAll('.modal-backdrop');
                    backdrops.forEach(backdrop => backdrop.remove());
                    
                    // Remove modal-open class from body
                    document.body.classList.remove('modal-open');
                    document.body.style.overflow = '';
                    document.body.style.paddingRight = '';
                    
                    // Show success message after modal is fully closed
                    if (window.toastr) {
                        window.toastr.success(response.message);
                    }
                }, 300);
                
                // Reset form and editing state
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    country: '',
                    street_address: '',
                    city: '',
                    postcode: '',
                    county: '',
                    other_address_type: ''
                });
                setSelectedAddressType('home');
                setEditingAddressId(null);
                
                // Refresh addresses
                fetchAddresses();
            } else {
                setErrors(response.errors || {});
            }
        } catch (err) {
            console.error('Error saving address:', err);
            
            // Clean up modal backdrop on error
            setTimeout(() => {
                const backdrops = document.querySelectorAll('.modal-backdrop');
                backdrops.forEach(backdrop => backdrop.remove());
                document.body.classList.remove('modal-open');
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
                
                if (window.toastr) {
                    window.toastr.error('An error occurred. Please try again.');
                }
            }, 100);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditAddress = (address) => {
        // Set editing state
        setEditingAddressId(address.id);
        
        // Pre-fill the form with existing address data
        setFormData({
            first_name: address.first_name || '',
            last_name: address.last_name || '',
            email: address.email || '',
            phone: address.phone || '',
            country: address.country || '',
            street_address: address.street_address || '',
            city: address.city || '',
            postcode: address.postcode || '',
            county: address.county || '',
            other_address_type: address.address_type === 'other' ? address.address_type : ''
        });
        setSelectedAddressType(address.address_type || 'home');
        
        // Open the modal
        const modal = document.getElementById('addaddress');
        if (modal) {
            const bsModal = new window.bootstrap.Modal(modal);
            bsModal.show();
            
            // Add event listener to clean up backdrop when modal is hidden
            modal.addEventListener('hidden.bs.modal', () => {
                const backdrops = document.querySelectorAll('.modal-backdrop');
                backdrops.forEach(backdrop => backdrop.remove());
                document.body.classList.remove('modal-open');
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
            });
        }
    };

    const handleDeleteAddress = async (addressId) => {
        // if (!window.confirm('Are you sure you want to delete this address?')) {
        //     return;
        // }

        try {
            const response = await deleteAddress(addressId);
            if (response.success) {
                if (window.toastr) {
                    window.toastr.success(response.message || 'Address deleted successfully');
                }
                fetchAddresses();
            } else {
                if (window.toastr) {
                    window.toastr.error(response.message || 'Failed to delete address');
                }
            }
        } catch (err) {
            console.error('Error deleting address:', err);
            if (window.toastr) {
                window.toastr.error('An error occurred while deleting the address.');
            }
        }
    };

    const handleDropdownToggle = (e, addressId) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Try to manually toggle the dropdown
        const dropdownMenu = document.querySelector(`[aria-labelledby="dropdownMenuButton${addressId}"]`);
        const dropdownButton = document.getElementById(`dropdownMenuButton${addressId}`);
        
        if (dropdownMenu && dropdownButton) {
            // Check if dropdown is already open
            const isOpen = dropdownMenu.classList.contains('show');
            
            // Close all other dropdowns first
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
            document.querySelectorAll('.dropdown-toggle[aria-expanded="true"]').forEach(btn => {
                btn.setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current dropdown
            if (!isOpen) {
                dropdownMenu.classList.add('show');
                dropdownButton.setAttribute('aria-expanded', 'true');
            }
        }
    };

    if (isLoading) {
        return (
            <>
                
                <section className="py-5">
                    <div className="container">
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-2">Loading addresses...</p>
                        </div>
                    </div>
                </section>
                
            </>
        );
    }

    return (
        <>
            
            <section className="py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-6">
                            <div className="border-line"></div>
                            <h2 className="text-capitalize" style={{ fontSize: "2.5rem"}}>My Address</h2>
                        </div>
                            <div className="col-6 text-end">
                                <button type="button" className="btn green-btn" data-bs-toggle="modal" data-bs-target="#addaddress" onClick={() => {
                                    setEditingAddressId(null);
                                    setFormData({
                                        first_name: '',
                                        last_name: '',
                                        email: '',
                                        phone: '',
                                        country: '',
                                        street_address: '',
                                        city: '',
                                        postcode: '',
                                        county: '',
                                        other_address_type: ''
                                    });
                                    setSelectedAddressType('home');
                                    
                                    // Add event listener to clean up backdrop when modal is hidden
                                    setTimeout(() => {
                                        const modal = document.getElementById('addaddress');
                                        if (modal) {
                                            modal.addEventListener('hidden.bs.modal', () => {
                                                const backdrops = document.querySelectorAll('.modal-backdrop');
                                                backdrops.forEach(backdrop => backdrop.remove());
                                                document.body.classList.remove('modal-open');
                                                document.body.style.overflow = '';
                                                document.body.style.paddingRight = '';
                                            });
                                        }
                                    }, 100);
                                }}
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
                                    Add address</button>
                            </div>
                    </div>
                    <div className="row pt-4">
                        {error ? (
                            <div className="col-12">
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            </div>
                        ) : addresses.length > 0 ? (
                            addresses.map((address) => (
                                <div key={address.id} className="col-md-4 mb-3">
                                    <div className="address-inner bg-white p-3 br15 d-flex justify-content-between">
                                        <div className="">
                                            <div className="addres-detail">
                                                <h6 className="fw-600 primary-theme">{address.first_name} {address.last_name}</h6>
                                            </div>
                                            <div className="address-drop">
                                                <p className="text-grey mb-0 fw-400">{address.street_address}, {address.city}, {address.county}</p>
                                                <p className="text-grey mb-0 fw-400">Mobile No. {address.phone}</p>
                                                <p className="text-grey mb-0 fw-400">Pin Code: {address.postcode}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column justify-content-between align-items-end">
                                            <div className="dropdown drop-address">
                                                <button 
                                                    className="btn dropdown-toggle" 
                                                    type="button" 
                                                    id={`dropdownMenuButton${address.id}`} 
                                                    data-bs-toggle="dropdown" 
                                                    aria-expanded="false"
                                                    onClick={(e) => handleDropdownToggle(e, address.id)}
                                                    style={{ border: 'none', background: 'transparent', padding: '5px' }}
                                                >
                                                    <img src="/webassets/img/hori-dots.svg" alt="Menu" style={{ width: '20px', height: '20px' }} />
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${address.id}`}>
                                                    <li>
                                                        <button 
                                                            className="dropdown-item" 
                                                            type="button"
                                                            onClick={() => handleEditAddress(address)}
                                                        >
                                                            Edit
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button 
                                                            className="dropdown-item" 
                                                            type="button"
                                                            onClick={() => handleDeleteAddress(address.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="">
                                                <span className="primary-theme light light-green border-0 d-inline-block rounded-pill px-3 py-1 d-flex align-items-center gap-1">
                                                    <img src={`/webassets/img/${address.address_type === 'home' ? 'home' : address.address_type === 'work' ? 'building' : address.address_type === 'hotel' ? 'hotel' : 'location'}-icon.svg`} alt={address.address_type} style={{ width: '16px', height: '16px', display: 'block' }} />
                                                    {address.address_type === 'home' ? 'Home' : address.address_type === 'work' ? 'Work' : address.address_type === 'hotel' ? 'Hotel' : address.address_type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12">
                                <div className="text-center py-5">
                                    <h4>No addresses found</h4>
                                    <p className="text-muted">Add your first address to get started.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Add Address Modal */}
            <div className="modal fade" id="addaddress" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content modal-content-width">
                        <div className="modal-body pt-0">
                                <div className="d-flex align-items-center justify-content-between gap-2 pb-2">
                                    <h1 className="font-oswald mb-0">{editingAddressId ? 'Edit Address' : 'Add Address'}</h1>
                                    <button type="button" className="btn-closed border-0 bg-transparent" data-bs-dismiss="modal" aria-label="Close">
                                        <img src="/webassets/img/cross.svg" alt="Close" />
                                    </button>
                                </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label className="pb-2">First Name</label>
                                            <input 
                                                type="text" 
                                                className="form-control common-input" 
                                                name="first_name" 
                                                placeholder="Enter here"
                                                value={formData.first_name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <span className="text-danger error-message">{errors.first_name}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label className="pb-2">Last Name</label>
                                            <input 
                                                type="text" 
                                                className="form-control common-input" 
                                                name="last_name" 
                                                placeholder="Enter here"
                                                value={formData.last_name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <span className="text-danger error-message">{errors.last_name}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label className="pb-2">Email</label>
                                            <input 
                                                type="email" 
                                                className="form-control common-input" 
                                                name="email" 
                                                placeholder="Enter here"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <span className="text-danger error-message">{errors.email}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label className="pb-2">Phone No.</label>
                                            <input 
                                                type="tel" 
                                                className="form-control common-input" 
                                                name="phone" 
                                                placeholder="Enter here"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <span className="text-danger error-message">{errors.phone}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label className="pb-2">Country / Region</label>
                                            <input 
                                                type="text" 
                                                className="form-control common-input" 
                                                name="country" 
                                                placeholder="Enter here"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <span className="text-danger error-message">{errors.country}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label className="pb-2">Street Address</label>
                                            <input 
                                                type="text" 
                                                className="form-control common-input" 
                                                name="street_address" 
                                                placeholder="Enter here"
                                                value={formData.street_address}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <span className="text-danger error-message">{errors.street_address}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label className="pb-2">Town / City</label>
                                            <input 
                                                type="text" 
                                                className="form-control common-input" 
                                                name="city" 
                                                placeholder="Enter here"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <span className="text-danger error-message">{errors.city}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label className="pb-2">Postcode</label>
                                            <input 
                                                type="text" 
                                                className="form-control common-input" 
                                                name="postcode" 
                                                placeholder="Enter here"
                                                value={formData.postcode}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <span className="text-danger error-message">{errors.postcode}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label className="pb-2">County (optional)</label>
                                            <input 
                                                type="text" 
                                                className="form-control common-input" 
                                                name="county" 
                                                placeholder="Enter here"
                                                value={formData.county}
                                                onChange={handleInputChange}
                                            />
                                            <span className="text-danger error-message">{errors.county}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group mb-3">
                                            <label className="pb-2">Address Type</label><br />
                                            <div className="d-flex align-items-center gap-2 flex-wrap">
                                                <button 
                                                    type="button"
                                                    className={`typeadd-btn ${selectedAddressType === 'home' ? 'active' : ''}`}
                                                    onClick={() => handleAddressTypeChange('home')}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
                                                        <path d="M16.0772 6.34367L9.17718 0.336265C8.92687 0.119385 8.60676 0 8.27556 0C7.94436 0 7.62426 0.119385 7.37394 0.336265L0.475478 6.33976C0.263931 6.52162 0.113142 6.7639 0.0433877 7.03401C-0.0263665 7.30412 -0.011741 7.58912 0.0852976 7.85067C0.182336 8.11222 0.357134 8.33779 0.586187 8.49704C0.81524 8.6563 1.08756 8.7416 1.36654 8.74147H2.21144V13.6309C2.21185 13.9941 2.35633 14.3422 2.61316 14.5988C2.86999 14.8555 3.21817 14.9998 3.58127 15H5.53706C5.90003 14.9996 6.24802 14.8552 6.50467 14.5986C6.76133 14.3419 6.9057 13.9939 6.90612 13.6309V11.6752C6.90617 11.4835 6.94636 11.294 7.02411 11.1188C7.10185 10.9437 7.21543 10.7867 7.35751 10.6581C7.49986 10.5286 7.66812 10.4307 7.85114 10.3711C8.03416 10.3115 8.22777 10.2915 8.41912 10.3124C8.7682 10.3664 9.08546 10.5463 9.31112 10.818C9.53678 11.0898 9.65526 11.4347 9.64422 11.7878V13.6302C9.64464 13.9931 9.78901 14.3411 10.0457 14.5978C10.3023 14.8544 10.6503 14.9988 11.0133 14.9992H12.9691C13.332 14.9988 13.68 14.8544 13.9367 14.5978C14.1933 14.3411 14.3377 13.9931 14.3381 13.6302V8.74069H15.183C15.4614 8.74053 15.733 8.65533 15.9616 8.49652C16.1902 8.3377 16.3648 8.11284 16.4621 7.85204C16.5593 7.59124 16.5746 7.30695 16.5058 7.03724C16.437 6.76753 16.2875 6.52526 16.0772 6.34289V6.34367Z" fill="currentColor"/>
                                                    </svg>
                                                    Home
                                                </button>
                                                <button 
                                                    type="button"
                                                    className={`typeadd-btn ${selectedAddressType === 'work' ? 'active' : ''}`}
                                                    onClick={() => handleAddressTypeChange('work')}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
                                                        <path d="M6.80937 1.24394C6.80937 1.0925 6.93257 0.969305 7.08401 0.969305H9.4588C9.61024 0.969305 9.73344 1.0925 9.73344 1.24394V1.86591H10.7027V1.24394C10.7027 0.558029 10.1447 0 9.4588 0H7.08401C6.39809 0 5.84006 0.558029 5.84006 1.24394V1.86591H6.80937V1.24394ZM9.85056 9.02236V9.64879C9.85056 9.75061 9.8185 9.84984 9.75891 9.93241C9.69932 10.015 9.61525 10.0767 9.51861 10.1088L8.4241 10.4721C8.32497 10.505 8.21787 10.505 8.11874 10.4721L7.02423 10.1088C6.92759 10.0767 6.84351 10.015 6.78393 9.93241C6.72434 9.84985 6.69227 9.75061 6.69228 9.64879V9.02236L1.51153 7.72717C0.923683 7.58023 0.407367 7.28058 0 6.87706V14.0307C0 14.566 0.433958 15 0.969305 15H15.5735C16.1089 15 16.5428 14.566 16.5428 14.0307V6.87706C16.1354 7.28058 15.6191 7.58023 15.0313 7.72717L9.85056 9.02236ZM15.3231 13.2956C15.3231 13.5633 15.1061 13.7803 14.8384 13.7803H12.6494C12.3818 13.7803 12.1648 13.5633 12.1648 13.2956C12.1648 13.028 12.3818 12.811 12.6494 12.811H14.8384C15.1061 12.811 15.3231 13.028 15.3231 13.2956Z" fill="currentColor"/>
                                                        <path d="M15.5735 2.83545H0.969305C0.433958 2.83545 0 3.26941 0 3.80475V4.55005C0 5.60815 0.720097 6.53044 1.74659 6.78705L6.69225 8.02346V7.82333C6.69225 7.55568 6.90924 7.33868 7.1769 7.33868H9.36591C9.63357 7.33868 9.85056 7.55568 9.85056 7.82333V8.02346L14.7962 6.78705C15.8227 6.53044 16.5428 5.60815 16.5428 4.55005V3.80475C16.5428 3.26941 16.1089 2.83545 15.5735 2.83545ZM8.88126 9.29926V8.30799H7.66155V9.29926L8.27141 9.50169L8.88126 9.29926Z" fill="currentColor"/>
                                                    </svg>
                                                    Work
                                                </button>
                                                <button 
                                                    type="button"
                                                    className={`typeadd-btn ${selectedAddressType === 'hotel' ? 'active' : ''}`}
                                                    onClick={() => handleAddressTypeChange('hotel')}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                                        <path d="M3.75 15H5.24414C5.28299 15 5.32025 14.9846 5.34772 14.9571C5.37519 14.9296 5.39062 14.8924 5.39062 14.8535V11.8475C5.39062 11.7791 5.34284 11.7214 5.27645 11.7047C5.06578 11.6521 4.91171 11.457 4.92237 11.2276C4.93412 10.9754 5.15127 10.7812 5.40375 10.7812H9.59619C9.84867 10.7812 10.0658 10.9754 10.0776 11.2276C10.0883 11.457 9.93416 11.6521 9.72349 11.7047C9.6571 11.7213 9.60932 11.7791 9.60932 11.8475V14.8535C9.60932 14.8924 9.62475 14.9296 9.65222 14.9571C9.67969 14.9846 9.71695 15 9.7558 15H11.1035C11.1843 15 11.2499 14.9346 11.2499 14.8537V2.8125C11.2499 2.5536 11.0401 2.34375 10.7812 2.34375H4.21875C3.95985 2.34375 3.75 2.5536 3.75 2.8125V15ZM9.14062 4.21875C9.14062 3.95977 9.35039 3.75 9.60938 3.75C9.86836 3.75 10.0781 3.95977 10.0781 4.21875V4.6875C10.0781 4.94648 9.86836 5.15625 9.60938 5.15625C9.35039 5.15625 9.14062 4.94648 9.14062 4.6875V4.21875ZM9.14062 6.5625C9.14062 6.30352 9.35039 6.09375 9.60938 6.09375C9.86836 6.09375 10.0781 6.30352 10.0781 6.5625V7.03125C10.0781 7.29023 9.86836 7.5 9.60938 7.5C9.35039 7.5 9.14062 7.29023 9.14062 7.03125V6.5625ZM9.14062 8.90625C9.14062 8.64727 9.35039 8.4375 9.60938 8.4375C9.86836 8.4375 10.0781 8.64727 10.0781 8.90625V9.375C10.0781 9.63398 9.86836 9.84375 9.60938 9.84375C9.35039 9.84375 9.14062 9.63398 9.14062 9.375V8.90625ZM7.03125 4.21875C7.03125 3.95977 7.24102 3.75 7.5 3.75C7.75898 3.75 7.96875 3.95977 7.96875 4.21875V4.6875C7.96875 4.94648 7.75898 5.15625 7.5 5.15625C7.24102 5.15625 7.03125 4.94648 7.03125 4.6875V4.21875ZM7.03125 6.5625C7.03125 6.30352 7.24102 6.09375 7.5 6.09375C7.75898 6.09375 7.96875 6.30352 7.96875 6.5625V7.03125C7.96875 7.29023 7.75898 7.5 7.5 7.5C7.24102 7.5 7.03125 7.29023 7.03125 7.03125V6.5625ZM7.03125 8.90625C7.03125 8.64727 7.24102 8.4375 7.5 8.4375C7.75898 8.4375 7.96875 8.64727 7.96875 8.90625V9.375C7.96875 9.63398 7.75898 9.84375 7.5 9.84375C7.24102 9.84375 7.03125 9.63398 7.03125 9.375V8.90625ZM4.92188 4.21875C4.92188 3.95977 5.13164 3.75 5.39062 3.75C5.64961 3.75 5.85938 3.95977 5.85938 4.21875V4.6875C5.85938 4.94648 5.64961 5.15625 5.39062 5.15625C5.13164 5.15625 4.92188 4.94648 4.92188 4.6875V4.21875ZM4.92188 6.5625C4.92188 6.30352 5.13164 6.09375 5.39062 6.09375C5.64961 6.09375 5.85938 6.30352 5.85938 6.5625V7.03125C5.85938 7.29023 5.64961 7.5 5.39062 7.5C5.13164 7.5 4.92188 7.29023 4.92188 7.03125V6.5625ZM4.92188 8.90625C4.92188 8.64727 5.13164 8.4375 5.39062 8.4375C5.64961 8.4375 5.85938 8.64727 5.85938 8.90625V9.375C5.85938 9.63398 5.64961 9.84375 5.39062 9.84375C5.13164 9.84375 4.92188 9.63398 4.92188 9.375V8.90625Z" fill="currentColor"/>
                                                        <path d="M6.47461 15H8.52539C8.56424 15 8.6015 14.9846 8.62897 14.9571C8.65644 14.9296 8.67188 14.8924 8.67188 14.8535V11.8652C8.67188 11.8264 8.65644 11.7891 8.62897 11.7617C8.6015 11.7342 8.56424 11.7188 8.52539 11.7188H6.47461C6.43576 11.7188 6.3985 11.7342 6.37103 11.7617C6.34356 11.7891 6.32812 11.8264 6.32812 11.8652V14.8535C6.32812 14.8924 6.34356 14.9296 6.37103 14.9571C6.3985 14.9846 6.43576 15 6.47461 15ZM10.0781 0.46875C10.0781 0.209854 9.86827 0 9.60938 0H5.39062C5.13173 0 4.92188 0.209854 4.92188 0.46875V1.25977C4.92188 1.279 4.92566 1.29805 4.93303 1.31582C4.94039 1.3336 4.95118 1.34974 4.96478 1.36335C4.97838 1.37695 4.99453 1.38774 5.0123 1.3951C5.03007 1.40246 5.04912 1.40625 5.06836 1.40625H9.93164C9.95088 1.40625 9.96993 1.40246 9.9877 1.3951C10.0055 1.38774 10.0216 1.37695 10.0352 1.36335C10.0488 1.34974 10.0596 1.3336 10.067 1.31582C10.0743 1.29805 10.0781 1.279 10.0781 1.25977V0.46875ZM14.5312 5.39062H12.334C12.2951 5.39062 12.2579 5.40606 12.2304 5.43353C12.2029 5.461 12.1875 5.49826 12.1875 5.53711V14.8535C12.1875 14.8924 12.2029 14.9296 12.2304 14.9571C12.2579 14.9846 12.2951 15 12.334 15H14.5312C14.7901 15 15 14.7901 15 14.5312V5.85938C15 5.60048 14.7901 5.39062 14.5312 5.39062ZM14.0625 12.4219C14.0625 12.6809 13.8527 12.8906 13.5938 12.8906C13.3348 12.8906 13.125 12.6809 13.125 12.4219V11.9531C13.125 11.6941 13.3348 11.4844 13.5938 11.4844C13.8527 11.4844 14.0625 11.6941 14.0625 11.9531V12.4219ZM14.0625 10.3125C14.0625 10.5715 13.8527 10.7812 13.5938 10.7812C13.3348 10.7812 13.125 10.5715 13.125 10.3125V9.84375C13.125 9.58477 13.3348 9.375 13.5938 9.375C13.8527 9.375 14.0625 9.58477 14.0625 9.84375V10.3125ZM14.0625 8.20312C14.0625 8.46211 13.8527 8.67188 13.5938 8.67188C13.3348 8.67188 13.125 8.46211 13.125 8.20312V7.73438C13.125 7.47539 13.3348 7.26562 13.5938 7.26562C13.8527 7.26562 14.0625 7.47539 14.0625 7.73438V8.20312ZM0 5.85938V14.5312C0 14.7901 0.209854 15 0.46875 15H2.66602C2.68525 15 2.7043 14.9962 2.72207 14.9888C2.73985 14.9815 2.75599 14.9707 2.7696 14.9571C2.7832 14.9435 2.79399 14.9273 2.80135 14.9096C2.80871 14.8918 2.8125 14.8728 2.8125 14.8535V5.53711C2.8125 5.51787 2.80871 5.49882 2.80135 5.48105C2.79399 5.46328 2.7832 5.44713 2.7696 5.43353C2.75599 5.41993 2.73985 5.40914 2.72207 5.40178C2.7043 5.39441 2.68525 5.39062 2.66602 5.39062H0.46875C0.209854 5.39062 0 5.60048 0 5.85938ZM0.9375 7.73438C0.9375 7.47539 1.14727 7.26562 1.40625 7.26562C1.66523 7.26562 1.875 7.47539 1.875 7.73438V8.20312C1.875 8.46211 1.66523 8.67188 1.40625 8.67188C1.14727 8.67188 0.9375 8.46211 0.9375 8.20312V7.73438ZM0.9375 9.84375C0.9375 9.58477 1.14727 9.375 1.40625 9.375C1.66523 9.375 1.875 9.58477 1.875 9.84375V10.3125C1.875 10.5715 1.66523 10.7812 1.40625 10.7812C1.14727 10.7812 0.9375 10.5715 0.9375 10.3125V9.84375ZM0.9375 11.9531C0.9375 11.6941 1.14727 11.4844 1.40625 11.4844C1.66523 11.4844 1.875 11.6941 1.875 11.9531V12.4219C1.875 12.6809 1.66523 12.8906 1.40625 12.8906C1.14727 12.8906 0.9375 12.6809 0.9375 12.4219V11.9531Z" fill="currentColor"/>
                                                    </svg>
                                                    Hotel
                                                </button>
                                                <button 
                                                    type="button"
                                                    className={`typeadd-btn ${selectedAddressType === 'other' ? 'active' : ''}`}
                                                    onClick={() => handleAddressTypeChange('other')}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" viewBox="0 0 12 15" fill="none">
                                                        <path d="M5.83333 0C4.28624 0 2.80251 0.614582 1.70854 1.70854C0.614581 2.80251 0 4.28624 0 5.83333C0 10.5556 5.83333 15 5.83333 15C5.83333 15 11.6667 10.5556 11.6667 5.83333C11.6667 4.28624 11.0521 2.80251 9.95812 1.70854C8.86416 0.614582 7.38043 0 5.83333 0ZM5.83333 8.61111C5.28394 8.61111 4.74689 8.4482 4.29008 8.14297C3.83328 7.83775 3.47724 7.40392 3.267 6.89634C3.05676 6.38877 3.00175 5.83025 3.10893 5.29142C3.21611 4.75258 3.48067 4.25763 3.86915 3.86915C4.25763 3.48067 4.75258 3.21611 5.29142 3.10893C5.83025 3.00175 6.38877 3.05676 6.89634 3.267C7.40392 3.47724 7.83775 3.83328 8.14297 4.29008C8.4482 4.74689 8.61111 5.28394 8.61111 5.83333C8.61111 6.57005 8.31845 7.27658 7.79752 7.79752C7.27658 8.31845 6.57005 8.61111 5.83333 8.61111Z" fill="currentColor"/>
                                                    </svg>
                                                    Other
                                                </button>
                                            </div>
                                            {selectedAddressType === 'other' && (
                                                <div className="form-group mb-3">
                                                    <label className="pb-2">Other Address Type</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control common-input" 
                                                        name="other_address_type" 
                                                        placeholder="Enter here"
                                                        value={formData.other_address_type}
                                                        onChange={handleInputChange}
                                                    />
                                                    <span className="text-danger error-message">{errors.other_address_type}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4 pb-3 text-center">
                                    <button 
                                        type="submit" 
                                        className="btn green-btn w-50 box-shadow"
                                        disabled={isSubmitting}
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
                                        {isSubmitting ? (editingAddressId ? 'Updating...' : 'Adding...') : (editingAddressId ? 'Update address' : 'Add address')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Login and Signup Modals */}
            <LoginModal />
            <SignupModal />
            <VerifyEmailModal />
            <ChangePasswordModal />
            <EditProfileModal />
            
        </>
    );
};

// Render the component
const container = document.getElementById('react-address-root');
if (container) {
    const root = createRoot(container);
    root.render(<Address />);
}

export default Address;



/**
First Name
kyp
Last Name
kyps
Email
kyp@yopmail.com
Phone No.
5793479407
Country / Region
South America
Street Address
22 Jane street
Town / City
Jane street
Postcode
349742
County (optional)
Enter here
Address Type
 */