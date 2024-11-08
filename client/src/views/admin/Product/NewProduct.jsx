import React from 'react';
import CardSettings from "../../../components/admin-component/Cards/CardSettings";
import CardProfile from "../../../components/admin-component/Cards/CardProfile";
import CreateNewProduct from "../../../components/admin-component/Product/CreateNewProduct";


function CreateProduct() {
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                    <CreateNewProduct/>
                </div>
            </div>
        </>
    );
}

export default CreateProduct;