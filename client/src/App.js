import React from 'react';
import Header from "./components/common/common-user/Header";
import Home from "./pages/common-pages/Home";
import './App.css';
import {BrowserRouter, Routes,Route} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import {CartProvider} from "./context/Cart-Context";

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element = {<MainLayout/>}/>
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;