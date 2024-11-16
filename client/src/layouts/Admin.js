import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import AdminNavbar from '../components/admin-component/Navbars/AdminNavbar';
import Sidebar from '../components/admin-component/Sidebar/Sidebar';
import HeaderStats from '../components/admin-component/Headers/HeaderStats';
import FooterAdmin from '../components/admin-component/Footers/FooterAdmin';

// Import your admin views
import Dashboard from '../views/admin/Dashboard';
import Settings from '../views/admin/Settings';
import Product from '../views/admin/Product/Product';
import CreateProduct from '../views/admin/Product/NewProduct';
import EditProductView from '../views/admin/Product/EditProduct';
import Order from '../views/admin/Orders/Order';
import Users from '../views/admin/Users/Users';
import CreateUsers from '../views/admin/Users/NewUsers';

const Admin = () => {
  return (
      <div className="font-montserrat">
        <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100">
          <AdminNavbar />
          <HeaderStats />
          <div className="px-4 md:px-10 mx-auto w-full -m-24">
            <Routes>
              {/* Wrap each route with ProtectedRoute and requireAdmin */}
              <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute requireAdmin>
                      <Dashboard />
                    </ProtectedRoute>
                  }
              />
              <Route
                  path="/products"
                  element={
                    <ProtectedRoute requireAdmin>
                      <Product />
                    </ProtectedRoute>
                  }
              />
              <Route
                  path="/products/create"
                  element={
                    <ProtectedRoute requireAdmin>
                      <CreateProduct />
                    </ProtectedRoute>
                  }
              />
              <Route
                  path="/products/edit/:productId"
                  element={
                    <ProtectedRoute requireAdmin>
                      <EditProductView />
                    </ProtectedRoute>
                  }
              />
              <Route
                  path="/orders"
                  element={
                    <ProtectedRoute requireAdmin>
                      <Order />
                    </ProtectedRoute>
                  }
              />
              <Route
                  path="/users"
                  element={
                    <ProtectedRoute requireAdmin>
                      <Users />
                    </ProtectedRoute>
                  }
              />
              <Route
                  path="/users/create"
                  element={
                    <ProtectedRoute requireAdmin>
                      <CreateUsers />
                    </ProtectedRoute>
                  }
              />
              <Route
                  path="/profile"
                  element={
                    <ProtectedRoute requireAdmin>
                      <Settings />
                    </ProtectedRoute>
                  }
              />
              <Route
                  path="*"
                  element={<Navigate to="/admin/dashboard" replace />}
              />
            </Routes>
          </div>
        </div>
        <FooterAdmin />
      </div>
  );
};

export default Admin;