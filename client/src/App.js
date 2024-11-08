import React from 'react';
import './App.css';
import {BrowserRouter, Routes,Route} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import {CartProvider} from "./context/Cart-Context";
import Auth from "./layouts/Auth";
import Profile from "./views/Profile";
import Admin from "./layouts/Admin";


function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element = {<MainLayout/>}/>
                    <Route path="/auth/*" element={<Auth />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin/*" element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;