import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const FooterContainer = () => {
    return(
        <>
            <footer className="bg-blue-950 py-16">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="footer-container text-white">
                        <div className="max-w-[1440px] mx-auto px-7 sm:px-6 lg:px-8 py-16">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                                {/* Store Info Column */}
                                <div className="space-y-8">
                                    <h3 className="text-5xl font-bold text-white font-poppins sm:text-3xl">Trendsware</h3>
                                    <p className="text-[#878787] font-poppins leading-[40px]">
                                        We are dedicated to providing the best shopping experience with
                                        carefully curated products and exceptional customer service.
                                    </p>
                                </div>

                                {/* Quick Links Column */}
                                <div className="space-y-8">
                                    <h4 className="text-xl text-white font-poppins font-normal">Company</h4>
                                    <ul className="space-y-4">
                                        <li><a href="#" className="text-[#878787] font-normal font-poppins hover:text-white">About Us</a></li>
                                        <li><a href="#" className="text-[#878787] font-normal font-poppins hover:text-white">Contact</a></li>
                                        <li><a href="#" className="text-[#878787] font-normal font-poppins hover:text-white">Careers</a></li>
                                        <li><a href="#" className="text-[#878787] font-normal font-poppins hover:text-white">Blog</a></li>
                                    </ul>
                                </div>

                                {/* Help Column */}
                                <div className="space-y-8">
                                    <h4 className="text-xl text-white font-poppins font-normal">Need Help?</h4>
                                    <ul className="space-y-4">
                                        <li><a href="#" className="text-[#878787] font-normal font-poppins hover:text-white">FAQ</a></li>
                                        <li><a href="#" className="text-[#878787] font-normal font-poppins hover:text-white">Shipping Info</a></li>
                                        <li><a href="#" className="text-[#878787] font-normal font-poppins hover:text-white">Returns</a></li>
                                        <li><a href="#" className="text-[#878787] font-normal font-poppins hover:text-white">Order Status</a></li>
                                        <li><a href="#" className="text-[#878787] font-normal font-poppins hover:text-white">Payment Options</a></li>
                                    </ul>
                                </div>

                                {/* Social Media Column */}
                                <div className="space-y-8">
                                    <h4 className="text-xl text-white font-poppins font-normal">Follow Us</h4>
                                    <div className="flex space-x-6">
                                        <a href="#" className="text-[#878787] text-xl font-normal font-poppins hover:text-white">
                                            <Facebook size={24}/>
                                        </a>
                                        <a href="#" className="text-[#878787] text-xl font-normal font-poppins hover:text-white">
                                            <Instagram size={24}/>
                                        </a>
                                        <a href="#" className="text-[#878787] text-xl font-normal font-poppins hover:text-white">
                                            <Twitter size={24}/>
                                        </a>
                                        <a href="#" className="text-[#878787] text-xl font-normal font-poppins hover:text-white">
                                            <Youtube size={24}/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-700">
                            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                                <p className="text-center text-white font-poppins">
                                    © {new Date().getFullYear()} Trendsware. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default FooterContainer;