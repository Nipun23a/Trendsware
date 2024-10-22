import React from 'react';
import Header from "../../components/common/common-user/Header";
import UpperContainer from "../../components/common/common-user/UpperContainer";

const Home = () => {
    return (
        <div className="w-full">
            <div className="home-upper-container bg-[#BAD7F2]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <UpperContainer />
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="new-items-container my-8">
                    {/* New Items Content */}
                </div>

                <div className="information-container my-8">
                    {/* Information Content */}
                </div>

                <div className="best-seller-container my-8">
                    {/* Best Seller Content */}
                </div>

                <div className="deal-of-day-container my-8">
                    {/* Deal of the Day Content */}
                </div>

                <div className="footer-container my-8">
                    {/* Footer Content */}
                </div>
            </div>
        </div>
    );
};

export default Home;