import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// components

import AdminNavbar from "../components/admin-component/Navbars/AdminNavbar.js";
import Sidebar from "../components/admin-component/Sidebar/Sidebar.js";
import HeaderStats from "../components/admin-component/Headers/HeaderStats.js";
import FooterAdmin from "../components/admin-component/Footers/FooterAdmin.js";

// views

import Dashboard from "../views/admin/Dashboard.js";
import Settings from "../views/admin/Settings.js";
import Tables from "../views/admin/Tables.js";
import Product from "../views/admin/Product/Product";
import CreateProduct from "../views/admin/Product/NewProduct";
import EditProductView from "../views/admin/Product/EditProduct";
import Order from "../views/admin/Orders/Order";
import Users from "../views/admin/Users/Users";


export default function Admin() {
  return (
    <div className = "font-montserrat">
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path = "/dashboard" element={<Dashboard/>}  />
            <Route path="/products" element={<Product/>} />
            <Route path="/products/create" element={<CreateProduct/>}/>
            <Route path="/products/edit/:productId" element={<EditProductView />} />
            <Route path="/orders" element={<Order/>} />
            <Route path="/users" element={<Users/>} />
          </Routes>
        </div>
        <FooterAdmin />
      </div>
    </div>
  );
}
