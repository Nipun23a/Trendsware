import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ShoppingCartIcon, Eye } from "lucide-react";
import { CartContext } from "../../../context/Cart-Context";

const ItemContainer = ({ product }) => {
    const { addToCart, setIsCartOpen } = useContext(CartContext);

    // Add prop validation
    if (!product) {
        return (
            <div className="itemContainer w-[280px] h-[450px] bg-gray-100 rounded-2xl shadow-lg flex items-center justify-center">
                <p className="text-gray-500">Product not available</p>
            </div>
        );
    }

    const handleQuickAdd = () => {
        addToCart(product, "M"); // Default size
        setIsCartOpen(true);
    };

    return (
        <div className="itemContainer w-[280px] bg-white rounded-2xl shadow-2xl overflow-hidden font-montserrat">
            <div className="item-image-container relative group">
                <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="w-full h-[320px] object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{
                        width: '100%',
                        height: '320px',
                        objectFit: 'cover',
                    }}
                    onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                        e.target.onerror = null;
                    }}
                />

                <div
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-blue-950 hover:text-white transition-colors"
                       href={`/single-product/${product._id}`}>
                        <Eye size={20}/>
                    </a>
                    <button
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-orange-400 hover:text-white transition-colors"
                        onClick={handleQuickAdd}
                        disabled={product.quantity === 0}
                    >
                        <ShoppingCartIcon size={20}/>
                    </button>
                </div>

                {product.createdAt && new Date(product.createdAt) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                    <div
                        className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        New
                    </div>
                )}
            </div>

            <div className="item-information-container p-4 space-y-2">
                <h3 className="text-lg font-medium product-container-text text-center">{product.productName}</h3>
                <p className="text-sm text-gray-500 items-center text-center category-text">
                    SKU: {product.productSKU}
                </p>
                <div className="flex flex-col items-center">
                    <p className="text-lg font-bold product-container-text text-center">
                        ${typeof product.sellPrice === 'number' ? product.sellPrice.toFixed(2) : '0.00'}
                    </p>
                    {product.quantity === 0 && (
                        <p className="text-red-500 text-sm mt-1">Out of Stock</p>
                    )}
                </div>
            </div>
        </div>
    );
};

// Define PropTypes to match the mongoose schema
ItemContainer.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string,
        productName: PropTypes.string.isRequired,
        productSKU: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        getPrice: PropTypes.number.isRequired,
        sellPrice: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
        is_active: PropTypes.bool,
        createdAt: PropTypes.string,
    }).isRequired,
};

export default ItemContainer;