import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ItemContainer from '../Item-Container';

const AllProductContainer = () => {
    const products = Array(16).fill({
        id: 1,
        name: "Polo-TShirt",
        category: "Men's Wear",
        price: 99.99,
        date: "2024-03-15",
        popularity: 4.5
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [sortBy, setSortBy] = useState('popularity');

    const itemsPerPage = 8;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayedProducts = products.slice(startIndex, endIndex);

    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Filters Section - Mobile */}
            <div className="flex sm:hidden justify-between gap-2 mb-6">
                <select
                    className="w-[48%] px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-950 font-montserrat font-light text-sm"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                >
                    <option value="all">All Categories</option>
                    <option value="mens">Men's Wear</option>
                    <option value="womens">Women's Wear</option>
                    <option value="kids">Kid's Wear</option>
                </select>

                <select
                    className="w-[48%] px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-950 font-montserrat font-light text-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="popularity">Sort by Popularity</option>
                    <option value="date">Sort by Date Added</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                </select>
            </div>

            {/* Filters Section - Desktop */}
            <div className="hidden sm:flex justify-end gap-4 mb-10">
                <select
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-950 font-montserrat font-light"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                >
                    <option value="all">All Categories</option>
                    <option value="mens">Men's Wear</option>
                    <option value="womens">Women's Wear</option>
                    <option value="kids">Kid's Wear</option>
                </select>

                <select
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-950 font-montserrat font-light"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="popularity">Sort by Popularity</option>
                    <option value="date">Sort by Date Added</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-15 mt-10 sm:mt-20">
                {displayedProducts.map((product, index) => (
                    <div key={index} className="flex justify-center">
                        <ItemContainer />
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-12">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full border border-gray-300 disabled:opacity-50 hover:bg-gray-100 transition-colors"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-full ${
                                currentPage === page
                                    ? 'bg-blue-950 text-white'
                                    : 'border border-gray-300 hover:bg-gray-100'
                            } transition-colors`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full border border-gray-300 disabled:opacity-50 hover:bg-gray-100 transition-colors"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}

export default AllProductContainer;