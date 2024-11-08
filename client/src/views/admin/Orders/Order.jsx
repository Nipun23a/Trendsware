import React from 'react';
import CardAllOrders from "../../../components/admin-component/Orders/CardAllOrders";



function Order() {

    return(
        <>
            <>
                <div className="flex flex-wrap mt-4">
                    <div className="w-full mb-12 px-4">
                        <CardAllOrders />
                    </div>
                </div>
            </>
        </>
    );
}
export default Order;