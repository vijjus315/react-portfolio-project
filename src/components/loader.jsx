/**
 * Loader Component
 */

import React from 'react';

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="mt-3">
                <p>Loading...</p>
            </div>
        </div>
    );
};

export default Loader;
