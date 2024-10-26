import React from 'react';
import ProductUpperContainer from "../../components/common/common-user/product-page-component/Product-Upper-Container";
import AllProductContainer from "../../components/common/common-user/product-page-component/All-Product-Container";

const Product = () => {
    return(
        <div className="w-full">
            <section className="bg-[#BAD7F2]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <ProductUpperContainer/>
                </div>
            </section>
            <section className="bg-white">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <AllProductContainer/>
                </div>
            </section>
        </div>
    );
}

export default Product;