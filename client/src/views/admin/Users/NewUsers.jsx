import React from 'react';
import CreateNewUsers from "../../../components/admin-component/Users/CreateNewUsers";


function CreateUsers() {
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                    <CreateNewUsers/>
                </div>
            </div>
        </>
    );
}

export default CreateUsers;