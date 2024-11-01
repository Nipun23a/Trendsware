import React from 'react';
import {Search} from "lucide-react";

const AboutUpperContainer = () => {
    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-14">
            <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold text-blue-950 mb-2 sm:mb-3 font-lexend">
                    Welcome to Trendsware
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-blue-950 mb-6 sm:mb-8 mt-4 sm:mt-6 md:mt-8 lg:mt-10 font-poppins font-light max-w-xl mx-auto">
                    Your ultimate destination for innovative and quality products. We aim to revolutionize online shopping by offering a seamless and personalized experience.
                </p>
            </div>
        </div>
    );

}

export default AboutUpperContainer;

