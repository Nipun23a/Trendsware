import React from 'react';
import EditProduct from "../../../components/admin-component/Product/EditProduct";


function EditProductView() {
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                    <EditProduct/>
                </div>
            </div>
        </>
    );
}

export default EditProductView;