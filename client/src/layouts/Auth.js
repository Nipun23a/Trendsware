import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// components
import Navbar from "../components/components/Navbars/AuthNavbar.js";
import FooterSmall from "../components/components/Footers/FooterSmall.js";

// views
import Login from "../views/auth/Login.js";

import Background from "../assets/img/register_bg_2.png"

export default function AuthLayout() {
    return (
        <>
            <Navbar transparent />
            <main>
                <section className="relative w-full h-full py-40 min-h-screen">
                    <div
                        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                        style={{
                            backgroundImage: `url(${Background})`,
                        }}
                    ></div>
                    <Routes>
                        <Route path="login" element={<Login />} />
                        <Route path="" element={<Navigate to="login" replace />} />
                    </Routes>
                    <FooterSmall absolute />
                </section>
            </main>
        </>
    );
}