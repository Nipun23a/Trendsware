import React, { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import ItemImage from "../../../assets/images/products/tshirt.png";

const SingleProductContainer = () => {
    const [selectedSize, setSelectedSize] = useState('');

    const product = {
        name: "Premium Leather Jacket",
        price: 299.99,
        description: "Crafted from genuine leather, this classic jacket features a timeless design with modern details. The perfect blend of style and durability, it's designed to last for years while maintaining its sophisticated appeal.",
        sizes: ["XS", "S", "M", "L", "XL"],
        features: [
            "100% Genuine Leather",
            "Quilted Interior Lining",
            "YKK Premium Zippers",
            "Multiple Interior Pockets"
        ]
    };
    return (
        <div className="max-w-7xl mx-auto p-12">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left side - Product Image */}
                <div className="relative group">
                    <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden">
                        <img
                            src={ItemImage}
                            alt="Product"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <button
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                        aria-label="Add to wishlist"
                    >
                        <Heart className="w-5 h-5 text-gray-600"/>
                    </button>
                </div>

                {/* Right side - Product Info */}
                <div className="space-y-6">
                    {/* Product Header */}
                    <div>
                        <h1 className="text-[48px] font-bold text-blue-950 mb-2 font-raleway ">{product.name}</h1>
                        <p className="text-3xl font-semibold text-blue-950 font-raleway">
                            ${product.price}
                        </p>
                    </div>

                    {/* Size Selection */}
                    <div className="space-y-4">
                        <p className="text-md font-light text-gray-700 font-poppins">Select Size</p>
                        <div className="flex gap-3">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-12 h-12 rounded-md font-medium transition-colors font-poppins
                    ${selectedSize === size
                                        ? 'bg-blue-950 text-white'
                                        : 'bg-white border border-gray-200 text-blue-950 hover:bg-gray-50'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        className={`w-full h-12 rounded-lg flex items-center justify-center gap-2 text-lg font-medium transition-colors font-montserrat
              ${selectedSize
                            ? 'bg-blue-900 text-white hover:bg-blue-950'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!selectedSize}
                    >
                        <ShoppingCart className="w-5 h-5"/>
                        Add to Cart
                    </button>

                    {/* Product Description */}
                    <div className="border-t pt-6 space-y-4">
                        <h2 className="text-xl font-semibold text-blue-950 font-poppins">Product Description</h2>
                        <p className="texl-lg text-blue-950 leading-[40px] font-raleway font-normal">
                            {product.description}
                        </p>
                    </div>

                    {/* Product Features */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-blue-950 font-poppins">Features</h2>
                        <div className="flex flex-wrap gap-2">
                            {product.features.map((feature) => (
                                <span
                                    key={feature}
                                    className="inline-flex px-5 py-3 rounded-full text-sm font-light bg-blue-950 text-white font-raleway"
                                >
                  {feature}
                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleProductContainer;