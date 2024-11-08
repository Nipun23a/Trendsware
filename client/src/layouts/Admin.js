import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// components

import AdminNavbar from "../components/admin-component/Navbars/AdminNavbar.js";
import Sidebar from "../components/admin-component/Sidebar/Sidebar.js";
import HeaderStats from "../components/admin-component/Headers/HeaderStats.js";
import FooterAdmin from "../components/admin-component/Footers/FooterAdmin.js";

// views

import Dashboard from "../views/admin/Dashboard.js";
import Maps from "../views/admin/Maps.js";
import Settings from "../views/admin/Settings.js";
import Tables from "../views/admin/Tables.js";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path = "/dashboard" element={<Dashboard/>}  />
            <Route path="/maps" exact component={Maps} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/tables" exact component={Tables} />
          </Routes>
        </div>
        <FooterAdmin />
      </div>
    </>
  );
}
