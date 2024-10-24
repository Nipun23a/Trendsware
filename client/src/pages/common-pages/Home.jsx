import React from 'react';
import Header from "../../components/common/common-user/Header";
import UpperContainer from "../../components/common/common-user/UpperContainer";
import NewItemContainer from "../../components/common/common-user/New-Item-Container";
import SiteInformation from "../../components/common/common-user/Site-Information";
import TrendingItemContainer from "../../components/common/common-user/Trending-Item-Container";

const Home = () => {
    return (
        <div className="w-full">
            {/* Upper Container Section */}
            <section className="bg-[#BAD7F2]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <UpperContainer />
                </div>
            </section>

            {/* New Items Section */}
            <section className="bg-white py-16">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <NewItemContainer />
                </div>
            </section>

            {/* Site Information Section */}
            <section className="bg-[#BAD7F2] py-16">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <SiteInformation />
                </div>
            </section>

            {/* Best Seller Section */}
            <section className="bg-white py-16">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="best-seller-container">
                        <TrendingItemContainer/>
                    </div>
                </div>
            </section>

            {/* Deal of the Day Section */}
            <section className="bg-white py-16">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="deal-of-day-container">
                        {/* Deal of the Day Content */}
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-blue-950 py-16">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="footer-container text-white">
                        {/* Footer Content */}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;