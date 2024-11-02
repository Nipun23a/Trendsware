import React from 'react';
import AboutUpperContainer from "../../components/about/about-upper-container";
import OurStoryContainer from "../../components/about/our-story-container";
import AcheivmentContainer from "../../components/about/acheivment-container";
import CustomerTestomonialContainer from "../../components/about/customer-testomonial-container";



const About = () => {
    return(
        <div className="w-full">
            <section className="bg-[#BAD7F2]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <AboutUpperContainer/>
                </div>
            </section>
            <section className="bg-white py-16">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <OurStoryContainer/>
                </div>
            </section>
            <section className="bg-[#BAD7F2]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <AcheivmentContainer/>
                </div>
            </section>
            <section className="bg-white py-16">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <CustomerTestomonialContainer/>
                </div>
            </section>
        </div>
    );
}

export default About;