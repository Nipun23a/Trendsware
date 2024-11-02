import React from 'react';

const TestimonialCard = ({ image, name, role, comment }) => {
    return (
        <div className="relative pt-[100px] h-full flex justify-center">
            {/* Card Container with consistent width and height */}
            <div className="
                w-full
                max-w-[500px]
                sm:max-w-[500px]
                h-[330px] /* Fixed height for consistent card size */
                border border-gray-200
                rounded-lg
                shadow-lg
                p-6
                bg-white
                relative
            ">
                {/* Image Container - Positioned for exact half split */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-[120px] h-[120px] sm:w-[120px] sm:h-[120px] rounded-full relative">
                        <img
                            src={image}
                            alt={name}
                            className="
                                w-full
                                h-full
                                rounded-full
                                border-4
                                border-white
                                shadow-md
                                object-cover
                                absolute
                                top-0
                                left-0
                            "
                        />
                    </div>
                </div>

                {/* Content Container with responsive spacing */}
                <div className="text-center mt-[80px] sm:mt-[100px]">
                    {/* Comment */}
                    <p className="
                        text-blue-950
                        mb-4
                        font-light
                        text-sm
                        sm:text-lg
                        px-2
                        sm:px-4
                        line-clamp-4
                        font-montserrat
                    ">
                        "{comment}"
                    </p>

                    {/* Name */}
                    <h3 className="
                        text-blue-950
                        font-bold
                        text-base
                        sm:text-lg
                        mb-1
                        font-montserrat
                    ">
                        {name}
                    </h3>

                    {/* Role */}
                    <p className="
                        text-blue-950
                        text-xs
                        sm:text-sm
                        font-montserrat
                        font-light
                    ">
                        {role}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;

