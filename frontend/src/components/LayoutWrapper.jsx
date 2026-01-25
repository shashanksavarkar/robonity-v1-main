import React from 'react';

const LayoutWrapper = ({ children, className = '' }) => {
    return (
        <div
            style={{
                width: '100%',
                maxWidth: '1400px',
                margin: '0 auto',
                padding: 'var(--spacing-layout-y) var(--spacing-layout-x)',
                boxSizing: 'border-box'
            }}
            className={`layout-wrapper ${className}`}
        >
            {children}
        </div>
    );
};

export default LayoutWrapper;
