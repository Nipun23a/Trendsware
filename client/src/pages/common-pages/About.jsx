import React from 'react';
import AboutUpperContainer from "../../components/about/about-upper-container";


const About = () => {
    return(
        <div className = "w-full">
            <section className="bg-[#BAD7F2]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <AboutUpperContainer/>
                </div>
            </section>
        </div>
    );
}

export default About;