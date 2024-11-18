import React, { useState, useEffect } from 'react';
import ItemContainer from '../Item-Container';
import axios from 'axios';

const NewItemContainer = () => {
    const [newArrivals, setNewArrivals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/new-arrivals`);
                // Validate the response data
                if (Array.isArray(response.data)) {
                    // Validate each product has required fields
                    const validatedProducts = response.data.filter(product =>
                        product &&
                        product._id &&
                        product.productName &&
                        product.productSKU &&
                        product.description &&
                        product.quantity !== undefined &&
                        product.getPrice &&
                        product.sellPrice &&
                        product.imageUrl
                    );
                    setNewArrivals(validatedProducts);
                } else {
                    throw new Error('Invalid data format received');
                }
                setError(null);
            } catch (err) {
                setError('Failed to fetch new arrivals');
                console.error('Error:', err);
                setNewArrivals([]); // Reset to empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchNewArrivals();
    }, []);

    if (loading) {
        return (
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="text-center text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="NewItemTitleContainer text-center mb-12">
                <h2 className="text-[60px] font-bold text-blue-950 mb-4 font-libre">
                    New Arrivals
                </h2>
                <p className="text-gray-400 text-xl max-w-2xl mx-auto category-text text-center font-normal">
                    Explore our latest arrivals and be the first to rock the trendiest looks of the season.
                </p>
            </div>

            <div className="NewItemProductsContainer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                {newArrivals && newArrivals.length > 0 ? (
                    newArrivals.map((product) => (
                        <ItemContainer
                            key={product._id}
                            product={product}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-8 text-gray-500">
                        No new arrivals available at the moment
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewItemContainer;