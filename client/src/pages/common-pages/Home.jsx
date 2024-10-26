import React from 'react';
import UpperContainer from "../../components/common/common-user/home-page-component/UpperContainer";
import NewItemContainer from "../../components/common/common-user/home-page-component/New-Item-Container";
import SiteInformation from "../../components/common/common-user/home-page-component/Site-Information";
import TrendingItemContainer from "../../components/common/common-user/home-page-component/Trending-Item-Container";
import DealOfDaysContainer from "../../components/common/common-user/home-page-component/Deal-of-Day-Container";

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
            <section className="bg-[#BAD7F2] py-16">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="deal-of-day-container">
                        <DealOfDaysContainer/>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;