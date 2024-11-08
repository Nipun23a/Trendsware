import React from 'react';
import CardAllProduct from "../../../components/admin-component/Product/CardAllProduct";



function Product() {

    return(
        <>
            <>
                <div className="flex flex-wrap mt-4">
                    <div className="w-full mb-12 px-4">
                        <CardAllProduct />
                    </div>
                </div>
            </>
        </>
    );
}
export default Product;