import React from 'react';
import { Search } from 'lucide-react';

const ProductUpperContainer = () => {
    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-14">
            <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold text-blue-950 mb-2 sm:mb-3 font-lexend">
                    Our Products
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-blue-950 mb-6 sm:mb-8 mt-4 sm:mt-6 md:mt-8 lg:mt-10 font-poppins font-light max-w-xl mx-auto">
                    From Basics to Bold – Shop Every Style Here
                </p>

                <div className="max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto relative">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 rounded-2xl sm:rounded-3xl
                                     border border-gray-600 focus:outline-none focus:ring-2
                                     focus:ring-blue-950 focus:border-transparent bg-transparent
                                     text-sm sm:text-base"
                        />
                        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
                            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-blue-950" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductUpperContainer;


