import React from 'react';
import './App.css';
import {BrowserRouter, Routes,Route} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import {CartProvider} from "./context/Cart-Context";
import Auth from "./layouts/Auth";

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element = {<MainLayout/>}/>
                    <Route path="/auth/*" element={<Auth />} />
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;