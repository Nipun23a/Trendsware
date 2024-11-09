import React from 'react';
import CardAllUsers from "../../../components/admin-component/Users/CardAllUsers";



function User() {

    return(
        <>
            <>
                <div className="flex flex-wrap mt-4">
                    <div className="w-full mb-12 px-4">
                        <CardAllUsers />
                    </div>
                </div>
            </>
        </>
    );
}
export default User;