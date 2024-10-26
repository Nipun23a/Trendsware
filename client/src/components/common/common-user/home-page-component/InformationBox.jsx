import React from 'react';

const InformationBox = ({ number, text, bgColor, isTransparent }) => {
    const textColor = isTransparent ? 'text-blue-950' : 'text-white';

    return (
        <div className={`information-box ${isTransparent ? 'bg-transparent' : bgColor} p-8 transition-transform hover:scale-105 cursor-pointer border-2 border-blue-950`}>
            <div className="flex flex-col items-center space-y-4">
                <div className="information-box-number-content">
                    <span className={`text-6xl font-bold ${textColor} font-rouge`}>
                        {number}
                    </span>
                    <span className={`text-4xl font-bold ${textColor} font-rouge`}>
                        +
                    </span>
                </div>
                <div className="information-box-number-content-text text-center">
                    <p className={`text-xl ${textColor} font-medium max-w-[200px] font-raleway`}>
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InformationBox;