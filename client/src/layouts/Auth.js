import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";


// components
import Navbar from "../components/admin-component/Navbars/AuthNavbar.js";
import FooterSmall from "../components/admin-component/Footers/FooterSmall.js";

// views
import Login from "../views/auth/Login";

// assets
import BgImage from "../assets/img/register_bg_2.png";



export default function Auth() {
    return (
        <>

            <Navbar transparent />
            <main>
                <section className="relative w-full h-full py-40 min-h-screen">
                    <div
                        className="absolute top-0 w-full h-full bg-blue-950 bg-no-repeat bg-full"
                        style={{
                            backgroundImage: `url(${BgImage})`,
                        }}
                    ></div>
                    <Routes>
                        <Route path = "/login" element={<Login />} />
                    </Routes>
                </section>
                <FooterSmall absolute />
            </main>
        </>
    );
}