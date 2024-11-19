import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Check } from 'lucide-react';
import ItemContainer from '../common/common-user/Item-Container';
import axios from 'axios';

const AllProductContainer = ({ searchQuery }) => {
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

    const filteredProducts = products
        .filter((product) =>
            selectedFilter === 'all' || product.category === selectedFilter
        )
        .filter((product) =>
            product.productName.toLowerCase().includes(searchQuery.toLowerCase())
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

    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
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

