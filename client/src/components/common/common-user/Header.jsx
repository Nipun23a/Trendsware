import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import LoginModal from "./LoginModal";



const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleSignUpClick = () => {
    setIsLoginModalOpen(true);
  };

  return (
      <>
        <header className="bg-[#BAD7F2] text-white w-full relative">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
            {/* Logo and Hamburger Menu */}
            <div className="flex items-center space-x-4">
              <a className="text-3xl font-bold title" href="/">Trendsware</a>
              <button
                  className="lg:hidden text-[#002A4F]"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
              <ul className="flex space-x-8">
                <li><a href="/" className="sub-title-font text-base font-medium hover:text-blue-950">Home</a></li>
                <li><a href="/product" className="sub-title-font text-base font-medium hover:text-blue-950">Product</a></li>
                <li><a href="/about" className="sub-title-font text-base font-medium hover:text-blue-950">About us</a></li>
                <li><a href="/contact" className="sub-title-font text-base font-medium hover:text-blue-950">Contact us</a></li>
              </ul>
            </nav>

            {/* Search, Cart, and Sign Up */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="relative">
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-custom w-full"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#002A4F]" size={20} />
              </div>
              <ShoppingCart className="text-[#002A4F] cursor-pointer" size={24} />
              <button
                  className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full sing-up-button font-medium"
                  onClick={handleSignUpClick}
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Icons */}
            <div className="flex lg:hidden items-center space-x-4">
              <ShoppingCart className="text-[#002A4F] cursor-pointer" size={24} />
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
              className={`lg:hidden absolute w-full bg-[#BAD7F2] shadow-lg transition-all duration-300 ease-in-out z-50 ${
                  isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
              }`}
          >
            <div className="px-4 py-6 space-y-6">
              {/* Mobile Navigation Links */}
              <nav>
                <ul className="space-y-4">
                  <li><a href="/" className="sub-title-font text-base font-medium hover:text-blue-950 block">Home</a></li>
                  <li><a href="/product" className="sub-title-font text-base font-medium hover:text-blue-950 block">Product</a></li>
                  <li><a href="/about" className="sub-title-font text-base font-medium hover:text-blue-950 block">About us</a></li>
                  <li><a href="/contact" className="sub-title-font text-base font-medium hover:text-blue-950 block">Contact us</a></li>
                </ul>
              </nav>

              {/* Mobile Search */}
              <div className="relative">
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-custom w-full"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#002A4F]" size={20} />
              </div>

              {/* Mobile Sign Up Button */}
              <button
                  className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full sing-up-button font-medium w-full"
                  onClick={handleSignUpClick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </header>

        <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
        />
      </>
  );
};

export default Header;