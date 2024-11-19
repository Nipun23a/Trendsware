import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemContainer from '../Item-Container';

const TrendingItemContainer = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = ['All', 'Clothing', 'Accessories', 'Shoes', 'Bags'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`, {
                    params: {
                        category: selectedCategory.toLowerCase(),
                        sortBy: 'popularity', // Trending products sorted by popularity
                    },
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
            {/* Title Section */}
            <div className="NewItemTitleContainer text-center mb-12">
                <h2 className="text-[40px] sm:text-[60px] font-bold text-blue-950 mb-4 font-libre">
                    Our Best Sellers
                </h2>
            </div>

            {/* Products Grid */}
            <div
                className="NewItemProductsContainer mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                {loading ? (
                    <p>Loading...</p>
                ) : products.length > 0 ? (
                    products.slice(0, 4).map((product) => (
                        <ItemContainer key={product._id} product={product}/>
                    ))
                ) : (
                    <p className="text-gray-500">No products available in this category.</p>
                )}
            </div>
        </div>
    );
};

export default TrendingItemContainer;