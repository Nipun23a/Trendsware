import React from 'react';
import ProductUpperContainer from "../../components/common/common-user/Product-Upper-Container";

const Product = () => {
    return(
        <div className = "w-full">
            <section className = "bg-[#BAD7F2]">
                <div className = "max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <ProductUpperContainer/>
                </div>
            </section>
        </div>
    );
}

export default Product;