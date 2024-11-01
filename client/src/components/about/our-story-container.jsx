import React from 'react';
import image1 from "../../assets/images/about-us-image.jpg";

const OurStoryContainer = () => {
    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-14">
            {/* Title Section */}
            <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold text-blue-950 mb-2 sm:mb-3 font-lexend">
                    How It All Started
                </h1>
            </div>

            {/* Main Container */}
            <div className="main-container flex flex-col md:flex-row items-center md:items-start lg:items-center gap-8">
                {/* Image Container */}
                <div className="relative w-full sm:w-[400px] md:w-[500px] h-[400px] sm:h-[500px] md:h-[600px] border-solid border-[#D4D5CB] mx-auto">
                    <img src={image1} alt="Our Story" className="w-full h-full object-cover rounded-lg shadow-lg blur-[1px]" />

                    {/* Circle Overlay with Text */}
                    <div className="absolute -bottom-[30px] -right-[30px] sm:-bottom-[45px] sm:-right-[45px] w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] bg-[#99D1FF] rounded-full flex items-center justify-center">
                        {/* Centered #1 */}
                        <span className="text-blue-950 font-bold text-xl sm:text-[40px] z-10 font-libre">#1</span>

                        {/* Circular Text */}
                        <div className="absolute w-full h-full animate-spin-slow">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <path
                                    id="circlePath"
                                    d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                    fill="none"
                                />
                                {/* Mobile version with double repetition */}
                                <text className="text-[8px] sm:text-[14px] text-blue-950 font-bold font-libre sm:hidden">
                                    <textPath href="#circlePath" startOffset="0">
                                        .World's Best Clothing Brand .World's Best Clothing Brand .
                                    </textPath>
                                </text>

                                {/* Larger screen version with single repetition */}
                                <text className="text-[8px] sm:text-sm text-blue-950 font-bold font-libre hidden sm:inline">
                                    <textPath href="#circlePath" startOffset="0">
                                        World's Best Clothing Brand .
                                    </textPath>
                                </text>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Story Container */}
                <div className="story-container w-full md:w-[520px] flex items-center md:items-start lg:items-center">
                    <p className="text-blue-950 text-lg sm:text-2xl text-center font-montserrat font-medium"
                       style={{ lineHeight: '60px' }}>
                        It all started in 2020 with a simple idea – to create an online store that blends affordability
                        with modern trends. We are passionate about delivering products that meet your everyday needs
                        without compromising quality.
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
            `}</style>
        </div>
    );
}

export default OurStoryContainer;
