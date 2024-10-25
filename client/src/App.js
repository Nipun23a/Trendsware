import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/common-user/Header";
import Home from "./pages/common-pages/Home";
import AuthLayout from "./layouts/Auth";
import MainLayout from "./layouts/MainLayout";
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen">
                <Routes>
                    <Route path="/auth/*" element={<AuthLayout />} />
                    <Route path="/*" element={<MainLayout />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;