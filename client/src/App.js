import React from 'react';
import Header from "./components/common/common-user/Header";
import Home from "./pages/common-pages/Home";
import './App.css';
import {BrowserRouter, Routes,Route} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element = {<MainLayout/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;