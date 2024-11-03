import React from 'react';

export const CustomButton = ({ children, className = '', ...props }) => (
    <button
        className={`inline-flex items-center justify-center px-4 py-2 rounded-lg 
    font-medium transition-colors focus:outline-none focus:ring-2 
    focus:ring-offset-2 focus:ring-blue-500 ${className}`}
        {...props}
    >
        {children}
    </button>
);

export const CustomAlert = ({ children, className = '', variant = 'default', ...props }) => {
    const variants = {
        default: 'bg-gray-100 border-gray-200',
        info: 'bg-blue-50 border-blue-200',
        warning: 'bg-yellow-50 border-yellow-200',
        error: 'bg-red-50 border-red-200',
        success: 'bg-green-50 border-green-200'
    };

    return (
        <div
            className={`relative rounded-lg border p-4 font-montserrat
      ${variants[variant]} ${className}`}
            role="alert"
            {...props}
        >
            {children}
        </div>
    );
};

export const CustomAlertDescription = ({ children, className = '', ...props }) => (
    <div
        className={`text-sm leading-6 mt-1 font-montserrat ${className}`}
        {...props}
    >
        {children}
    </div>
);

export const CustomBadge = ({ children, className = '', variant = 'default', ...props }) => {
    const variants = {
        default: 'bg-gray-100 text-gray-800',
        primary: 'bg-blue-100 text-blue-800',
        secondary: 'bg-white text-blue-950 border border-current',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800'
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium  font-montserrat
      transition-colors ${variants[variant]} ${className}`}
            {...props}
        >
      {children}
    </span>
    );
};