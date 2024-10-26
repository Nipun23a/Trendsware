import React from 'react';
import Header from "../components/common/common-user/Header";
import {Routes,Route} from "react-router-dom";
import Home from "../pages/common-pages/Home";
import About from "../pages/common-pages/About";
import Contact from "../pages/common-pages/Contact";
import Product from "../pages/common-pages/Product";



const MainLayout = () => {
    return(
        <div className = "min-h-screen">
            <Header/>
            <main className = "mx-auto">
                <Routes>
                    <Route path = "/" element={<Home />} />
                    <Route path = "/about" element={<About />} />
                    <Route path = "/product" element = {<Product/>}/>
                    <Route path = "/contact" element = {<Contact/>}/>
                </Routes>
            </main>
        </div>
    );
}

export default MainLayout;