import React from 'react';
import ItemContainer from './Item-Container'; // Assuming this is the path to your ItemContainer

const NewItemContainer = () => {
    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="NewItemTitleContainer text-center mb-12">
                <h2 className="text-[60px] font-bold text-blue-950 mb-4 libre-baskavile-font">
                    New Arrivals
                </h2>
                <p className="text-gray-400 text-xl max-w-2xl mx-auto category-text text-center font-normal">
                    Explore our latest arrivals and be the first to rock the trendiest looks of the season.
                </p>
            </div>

            <div className="NewItemProductsContainer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                <ItemContainer />
                <ItemContainer />
                <ItemContainer />
                <ItemContainer />
            </div>

            {/* View All Button
             <div className="flex justify-center mt-12">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium flex items-center space-x-2 transition-colors">
                    <span>View All Products</span>
                </button>
            </div>
             */}

        </div>
    );
};

export default NewItemContainer;