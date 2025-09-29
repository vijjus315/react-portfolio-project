import React from 'react';
import '../bootstrap';

const SuccessfullModal = () => {
    // Handle login button click
    const handleLogin = () => {
        // Close current modal
        const modal = document.getElementById('successfullmodal');
        if (modal) {
            const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
            if (bootstrapModal) {
                bootstrapModal.hide();
            }
        }
        
        // Open login modal
        const loginModal = document.getElementById('loginmodal');
        if (loginModal) {
            const loginBootstrapModal = new window.bootstrap.Modal(loginModal);
            loginBootstrapModal.show();
        }
    };

    return (
        <div className="modal fade" id="successfullmodal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                            <img src={`${window.location.origin}/webassets/img/successfull.png`} className="img-fluid" alt="Success" />
                            <h1 className="font-oswald pb-3">Sucessfull</h1>
                            <p className="fw-600 f20 thank-text">Your password has been successfully reset.</p>
                            <p className="fw-600 f20 thank-text">You can now log in with your new password.</p>
                        </div>
                        <div className="pt-3 pb-3">
                            <button 
                                type="button" 
                                className="btn green-btn w-100 box-shadow"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessfullModal;
