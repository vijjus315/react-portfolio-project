import React, { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show toast
    setIsVisible(true);
    
    // Auto hide after duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Call onClose after animation completes
      setTimeout(() => {
        if (onClose) onClose();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  const getToastStyles = () => {
    const baseStyles = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      minWidth: '300px',
      maxWidth: '500px',
      padding: '15px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.3s ease-in-out',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer'
    };

    if (type === 'success') {
      return {
        ...baseStyles,
        backgroundColor: '#d4edda',
        color: '#155724',
        border: '1px solid #c3e6cb'
      };
    } else if (type === 'error') {
      return {
        ...baseStyles,
        backgroundColor: '#f8d7da',
        color: '#721c24',
        border: '1px solid #f5c6cb'
      };
    } else if (type === 'warning') {
      return {
        ...baseStyles,
        backgroundColor: '#fff3cd',
        color: '#856404',
        border: '1px solid #ffeaa7'
      };
    } else {
      return {
        ...baseStyles,
        backgroundColor: '#d1ecf1',
        color: '#0c5460',
        border: '1px solid #bee5eb'
      };
    }
  };

  const getIcon = () => {
    if (type === 'success') {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style={{ marginRight: '10px', flexShrink: 0 }}>
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    } else if (type === 'error') {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style={{ marginRight: '10px', flexShrink: 0 }}>
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div style={getToastStyles()} onClick={handleClose}>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        {getIcon()}
        <span>{message}</span>
      </div>
      <button
        onClick={handleClose}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '18px',
          cursor: 'pointer',
          padding: '0',
          marginLeft: '10px',
          color: 'inherit',
          opacity: '0.7'
        }}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};

// Toast Container Component
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999 }}>
      {toasts.map((toast, index) => (
        <div key={toast.id} style={{ marginBottom: index > 0 ? '10px' : '0' }}>
          <Toast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default Toast;
