import React from 'react';
import Circle from "../common/common-user/Circle";

const AcheivmentContainer = () => {
    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-14">
            <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold text-blue-950 mb-2 sm:mb-3 font-libre">
                    Our Milestones
                </h1>
            </div>
            <div className = "circle-container flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 md-8 sm:mb-10 md:mb-12">

                <Circle number="100+" text="Retail Partners"/>
                <Circle number="50K" text="Happy Customers"/>
                <Circle number="200+" text="Products"/>
                <Circle number="24/7" text="Support"/>
            </div>
            <div className="milestone-text-container max-w-3xl mx-auto text-center text-blue-950 mb-4">
                <p className="text-lg sm:text-xl md:text-2xl font-light font-montserrat">
                    Our journey has been marked by continuous growth and dedication to excellence,
                    serving customers worldwide with quality products and exceptional service.
                </p>
            </div>
        </div>
    );
}

export default AcheivmentContainer;