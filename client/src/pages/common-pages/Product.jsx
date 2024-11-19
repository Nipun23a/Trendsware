import React, { useState } from 'react';
import ProductUpperContainer from "../../components/product/Product-Upper-Container";
import AllProductContainer from "../../components/product/All-Product-Container";

const Product = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="w-full">
            <section className="bg-[#BAD7F2]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <ProductUpperContainer onSearch={setSearchQuery} />
                </div>
            </section>
            <section className="bg-white">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <AllProductContainer searchQuery={searchQuery} />
                </div>
            </section>
        </div>
    );
};

export default Product;