import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";

// components
import Navbar from "../components/admin-component/Navbars/AuthNavbar.js";
import FooterSmall from "../components/admin-component/Footers/FooterSmall.js";

// views
import Login from "../views/auth/Login";
import Register from "../views/auth/Register.js";

// assets
import BgImage from "../assets/img/register_bg_2.png";



export default function Auth() {
    return (
        <>

            <Navbar transparent />
            <main>
                <section className="relative w-full h-full py-40 min-h-screen">
                    <div
                        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                        style={{
                            backgroundImage: `url(${BgImage})`,
                        }}
                    ></div>
                    <Routes>
                        <Route path = "/login" element={<Login />} />
                        <Route path = "/register" element={<Register />} />
                    </Routes>
                </section>
                <FooterSmall absolute />
            </main>
        </>
    );
}