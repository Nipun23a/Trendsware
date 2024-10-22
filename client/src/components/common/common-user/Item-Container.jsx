import React from 'react';
import { ShoppingCartIcon, Eye } from "lucide-react";
import PrdouctImage from "../../../assets/images/products/tshirt.png";

const ItemContainer = () => {
    return (
        <div className="itemContainer w-[280px] bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="item-image-container relative group">
                {/* Example product image - replace src with your actual image path */}
                <img
                    src={PrdouctImage}
                    alt="Product"
                    className="w-full h-[320px] object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Hover overlay with buttons */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-blue-950 hover:text-white transition-colors">
                        <Eye size={20} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-blue-950 hover:text-white transition-colors">
                        <ShoppingCartIcon size={20} />
                    </button>
                </div>

                {/* <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Sale
                </div> */}
            </div>

            <div className="item-information-container p-4 space-y-2">
                <h3 className="text-lg font-medium product-container-text text-center">Polo-TShirt</h3>
                <p className="text-sm text-gray-500 items-center text-center category-text">Men's Wear</p>
                <div className="flex justify-center">
                    <p className="text-lg font-bold product-container-text text-center">$99.99</p>
                    {/* Optional: Add rating or other info here */}
                </div>
            </div>
        </div>
    );
};

export default ItemContainer;