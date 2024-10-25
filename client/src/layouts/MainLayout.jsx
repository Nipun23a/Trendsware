import React from 'react';
import Header from "../components/common/common-user/Header";
import {Routes,Route} from "react-router-dom";
import Home from "../pages/common-pages/Home";

function MainLayout(){
    return(
        <>
            <Header/>
            <main className = "mx-auto">
                <Routes>
                    <Route path = "/" element = {<Home/>}/>
                </Routes>
            </main>
        </>
    )
}

export default MainLayout;