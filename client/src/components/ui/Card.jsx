import React from 'react';

const Card = ({ className, children }) => {
    return (
        <div className={`bg-white rounded-lg shadow-md ${className || ''}`}>
            {children}
        </div>
    );
};

const CardHeader = ({ className, children }) => {
    return (
        <div className={`p-4 border-b ${className || ''}`}>
            {children}
        </div>
    );
};

const CardTitle = ({ className, children }) => {
    return (
        <h3 className={`text-lg font-semibold ${className || ''}`}>
            {children}
        </h3>
    );
};

const CardContent = ({ className, children }) => {
    return (
        <div className={`p-4 ${className || ''}`}>
            {children}
        </div>
    );
};

export { Card, CardHeader, CardTitle, CardContent }