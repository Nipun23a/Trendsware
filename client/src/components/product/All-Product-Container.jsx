import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Check } from 'lucide-react';
import ItemContainer from '../common/common-user/Item-Container';
import axios from 'axios';

const AllProductContainer = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [sortBy, setSortBy] = useState('popularity');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const itemsPerPage = 8;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) =>
        selectedFilter === 'all' || product.category === selectedFilter
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'popularity') return b.popularity - a.popularity;
        if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return 0;
    });

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedProducts = sortedProducts.slice(startIndex, endIndex);

    const categoryOptions = [
        { value: 'all', label: 'All Categories' },
        { value: 'mens', label: "Men's Wear" },
        { value: 'womens', label: "Women's Wear" },
        { value: 'kids', label: "Kid's Wear" },
    ];

    const sortOptions = [
        { value: 'popularity', label: 'Sort by Popularity' },
        { value: 'date', label: 'Sort by Date Added' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
    ];

    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Filters Section - Mobile */}
            <div className="flex sm:hidden justify-between gap-2 mb-6">
                <select
                    className="w-[48%] px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-950 font-montserrat font-light text-sm bg-transparent text-blue-950"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                >
                    {categoryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <select
                    className="w-[48%] px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-950 font-montserrat font-light text-sm bg-transparent text-blue-950"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Filters Section - Desktop */}
            <div className="hidden sm:flex justify-end gap-4 mb-10">
                {/* Category Filter */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setIsFilterOpen(!isFilterOpen);
                            setIsSortOpen(false);
                        }}
                        className="min-w-[200px] px-4 py-2.5 rounded-lg border border-gray-300
                                 bg-transparent text-blue-950 font-montserrat font-light
                                 flex items-center justify-between gap-2 hover:border-blue-950
                                 transition-all duration-300 group"
                    >
                        <span className="truncate">
                            {categoryOptions.find((opt) => opt.value === selectedFilter)?.label}
                        </span>
                        <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${
                                isFilterOpen ? 'rotate-180' : ''
                            } group-hover:text-blue-950`}
                        />
                    </button>

                    {isFilterOpen && (
                        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg border border-gray-200 shadow-lg py-2">
                            {categoryOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        setSelectedFilter(option.value);
                                        setIsFilterOpen(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left flex items-center justify-between
                                             hover:bg-blue-50 transition-colors font-montserrat font-light
                                             text-blue-950"
                                >
                                    <span>{option.label}</span>
                                    {selectedFilter === option.value && (
                                        <Check size={16} className="text-blue-950" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sort Filter */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setIsSortOpen(!isSortOpen);
                            setIsFilterOpen(false);
                        }}
                        className="min-w-[200px] px-4 py-2.5 rounded-lg border border-gray-300
                                 bg-transparent text-blue-950 font-montserrat font-light
                                 flex items-center justify-between gap-2 hover:border-blue-950
                                 transition-all duration-300 group"
                    >
                        <span className="truncate">
                            {sortOptions.find((opt) => opt.value === sortBy)?.label}
                        </span>
                        <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${
                                isSortOpen ? 'rotate-180' : ''
                            } group-hover:text-blue-950`}
                        />
                    </button>

                    {isSortOpen && (
                        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg border border-gray-200 shadow-lg py-2">
                            {sortOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        setSortBy(option.value);
                                        setIsSortOpen(false);
                                    }}
                                    className="w-full px-4 py-2.5 text-left flex items-center justify-between
                                             hover:bg-blue-50 transition-colors font-montserrat font-light
                                             text-blue-950"
                                >
                                    <span>{option.label}</span>
                                    {sortBy === option.value && (
                                        <Check size={16} className="text-blue-950" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Products Grid */}
            {loading ? (
                <div className="flex justify-center items-center h-[300px]">
                    <p className="text-blue-950">Loading...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-15 mt-10 sm:mt-20">
                    {displayedProducts.map((product, index) => (
                        <div key={index} className="flex justify-center">
                            <ItemContainer product={product} />
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-12">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full border border-gray-300 disabled:opacity-50 hover:bg-gray-100 transition-colors"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full border border-gray-300 disabled:opacity-50 hover:bg-gray-100 transition-colors"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default AllProductContainer;
