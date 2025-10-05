import React, { useState } from 'react'
import { createRoot } from 'react-dom/client';
import LoginModal from '../components/login.jsx';
import SignupModal from '../components/signup.jsx';
import VerifyEmailModal from '../components/verifyEmail.jsx';
import ChangePasswordModal from '../components/changePassword.jsx';
import EditProfileModal from '../components/editProfile.jsx';
import { getTrackOrderDetails } from '../services/order.js';
import '../styles/bootstrap'


const TrackOrder = () => {

  const [orderNumber, setOrderNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!orderNumber.trim()) {
      setError('Please enter an order number');
      return;
    }

    setLoading(true);
    setError(null);
    setTrackingData(null);

    try {
      const response = await getTrackOrderDetails(orderNumber);
      
      if (response.success && response.data) {
        setTrackingData(response.data);
        setSubmitted(true);
      } else {
        setError('Order not found or invalid order number');
      }
    } catch (error) {
      console.error('Error tracking order:', error);
      setError('Failed to track order. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return 'Order in Progress';
      case 2:
        return 'Ready to Dispatch';
      case 3:
        return 'Order Delivered';
      default:
        return 'Unknown';
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return '#ffc107'; // Yellow - Order in Progress
      case 2:
        return '#17a2b8'; // Blue - Ready to Dispatch
      case 3:
        return '#28a745'; // Green - Order Delivered
      default:
        return '#6c757d'; // Gray - Unknown
    }
  }

  return (
    <>
    <section className="trackorder-wrapper py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="text-center text-decoration-underline" style={{ fontSize: "2.5rem" }}>Track Your Order</h2>
            {/* <p className="fw-500 f18">To track your order please enter your Order ID in the box below and click the "Track" button. This was given to you on your receipt and in the confirmation email you should have received, or you can get your order ID from your user dashboard.</p> */}
            <p className="fw-500 f18">Enter your Order Number to view the current status of your order.</p>
            
            <form onSubmit={handleSubmit} >
              {/* <input 
                type="hidden" 
                name="_token" 
                value="810pUh6Zu9Mpn9CjIcnh46LwAITAuBVapMAyME5U" 
                autoComplete="off" 
              /> */}
              <input
                  className="trackinput form-control common-input"
                  type="text"
                  name="order_number"
                  placeholder="Enter your Order Number"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  style={{ 
                    outline: '1px solid green', 
                    boxShadow: 'none', 
                  }}
                  required
                />
              <button 
                type="submit" 
                className="black-btn mt-4 track-order-btn w-25"
                disabled={loading}
                style={{ 
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? (
                  <>
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    Tracking...
                  </>
                ) : (
                  <>
                    Track Order <i className="fa fa-arrow-right me-1" aria-hidden="true"></i>
                  </>
                )}
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger mt-4" role="alert">
                <i className="fa fa-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}

            {/* Tracking Results */}
            {trackingData && trackingData.length > 0 && (
              <div className="mt-5">
                <h3 className="text-center mb-4" style={{ fontSize: "1.8rem" }}>
                  Order Tracking Details
                </h3>
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <div className="card">
                      <div className="card-header bg-light">
                        <h5 className="mb-0">Order #{orderNumber}</h5>
                      </div>
                      <div className="card-body">
                        {trackingData.map((item, index) => (
                          <div key={item.id} className="mb-4">
                            <div className="d-flex align-items-center mb-2">
                              <div 
                                className="badge me-3"
                                style={{ 
                                  backgroundColor: getStatusColor(item.status),
                                  color: 'white',
                                  padding: '8px 12px',
                                  fontSize: '14px'
                                }}
                              >
                                {getStatusText(item.status)}
                              </div>
                              <small className="text-muted">
                                {new Date(item.created_at).toLocaleDateString()} at {new Date(item.created_at).toLocaleTimeString()}
                              </small>
                            </div>
                            <div className="ms-4">
                              <p className="mb-1">
                                <strong>Order Item ID:</strong> {item.order_item_id}
                              </p>
                              <p className="mb-1">
                                <strong>Status Code:</strong> {item.status}
                              </p>
                              {item.updated_at && (
                                <p className="mb-0">
                                  <strong>Last Updated:</strong> {new Date(item.updated_at).toLocaleDateString()} at {new Date(item.updated_at).toLocaleTimeString()}
                                </p>
                              )}
                            </div>
                            {index < trackingData.length - 1 && <hr />}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* No Results Message */}
            {submitted && trackingData && trackingData.length === 0 && (
              <div className="alert alert-info mt-4" role="alert">
                <i className="fa fa-info-circle me-2"></i>
                No tracking information found for this order.
              </div>
            )}

            <div className="text-center mt-5">
              {/* color: "#fff", */}
              <h3 className="mb-3" style={{ fontSize: "1.5rem" }}>Need Help with Your Order?</h3>
              <p>Email: <a href="mailto:support@portacourts.com"
              style={{ color: "var(--primary-theme)"}}
              >support@portacourts.com</a></p>
              <p>Phone: <a href="tel:+18005551234"
              style={{ color: "var(--primary-theme)"}}
              >+1 (800) 272-9717</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    {/* Login and Signup Modals */}
    <LoginModal />
    <SignupModal />
    <VerifyEmailModal />
    <ChangePasswordModal />
    <EditProfileModal />
    
    </>
  )
}

export default TrackOrder



// Auto-mount when included directly as a script module
if (typeof window !== 'undefined') {
    const el = document.getElementById('react-track-root');
    if (el) {
        const root = createRoot(el);
        root.render(<TrackOrder />);
    }
}
