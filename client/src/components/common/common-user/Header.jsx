import React from 'react';
import { Search, ShoppingCart } from 'lucide-react';

const Header = () => {
  return (
      <header className="bg-transparent text-white p-4 mt-5">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-3xl font-bold title">Trendsware</h1>
            <nav className="absolute left-1/2 transform -translate-x-1/2">
              <ul className="flex space-x-8">
                <li><a href="#" className="sub-title-font text-base font-medium mr-4 hover:text-blue-950">Home</a></li>
                <li><a href="#" className="sub-title-font text-base font-medium mr-4 hover:text-blue-950">Product</a></li>
                <li><a href="#" className="sub-title-font  text-base font-medium mr-4 hover:text-blue-950">About us</a></li>
                <li><a href="#" className="sub-title-font text-base  font-medium mr-4 hover:text-blue-950">Contact us</a></li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-8">
            <div className="relative">
              <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-custom"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <ShoppingCart className="text-[#002A4F] cursor-pointer" size={24} />
            <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full sing-up-button font-medium">
              Sign Up
            </button>
          </div>
        </div>
      </header>
  );
};

export default Header;
