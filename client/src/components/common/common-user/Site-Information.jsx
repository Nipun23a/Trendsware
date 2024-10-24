import React from 'react';
import InformationBox from './InformationBox';
import StoreImageSection from './StoreImageSection';

const SiteInformation = () => {
    // Info box data with specific styling for each box
    const infoBoxes = [
        {
            number: "50k",
            text: "Happy Customers",
            bgColor: "bg-blue-950",
            isTransparent: false,
        },
        {
            number: "100",
            text: "Available Products",
            bgColor: "bg-blue-950",
            isTransparent: true,
        },
        {
            number: "15",
            text: "Years of Experience",
            bgColor: "bg-blue-950",
            isTransparent: false,
        },
    ];

    return (
        <div className="site-information-container flex flex-col lg:flex-row gap-12 px-4 lg:px-0">
            {/* Information Boxes Section */}
            <div className="site-information-info-container lg:w-1/2">
                {/* Title Section */}
                <div className="mb-12">
                    <h2 className="text-[40px] sm:text-[50px] lg:text-[70px] font-bold text-blue-950 mb-4 font-libre">
                        Best Fashion Brand
                    </h2>
                    <p className="text-blue-950 font-poppins text-lg sm:text-xl lg:text-2xl leading-[30px] lg:leading-[50px] font-light">
                        Discover a world where style meets sustainability. Our curated collections blend timeless elegance with contemporary trends, ensuring each piece tells a unique story.
                        With a commitment to quality craftsmanship and ethical fashion, we've been transforming wardrobes and inspiring confidence for over a decade.
                    </p>
                </div>

                {/* Info Boxes Grid */}
                <div className="flex flex-col sm:flex-row gap-6">
                    {infoBoxes.map((box, index) => (
                        <InformationBox
                            key={index}
                            number={box.number}
                            text={box.text}
                            bgColor={box.bgColor}
                            isTransparent={box.isTransparent}
                        />
                    ))}
                </div>
            </div>

            {/* Store Image Section - Hidden on small screens */}
            <div className="hidden lg:block lg:w-1/2">
                <StoreImageSection />
            </div>
        </div>
    );
};

export default SiteInformation;
