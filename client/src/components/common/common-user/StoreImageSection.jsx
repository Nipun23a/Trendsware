import React from 'react';
import InformationImage from '../../../assets/images/information-container-image.jpg';

const StoreImageSection = () => {
    return (
        <div className="site-information-image-container lg:w-1/2 relative">
            <div className="relative rounded-3xl overflow-hidden group">
                <img
                    src={InformationImage}
                    alt="Store showcase"
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay with bottom-center button */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                        <button className="bg-white text-blue-950 hover:bg-blue-950 hover:text-white px-12 py-5  font-bold transition-all duration-300  transform hover:scale-105 font-poppins text-3xl">
                            Explore Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreImageSection;