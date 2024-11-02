import React from 'react';
import ContactUpperContainer from "../../components/contact/contact-upper-container";
import FAQContainer from "../../components/contact/FAQ-container";


const Contact = () => {
    return(
        <div className="w-full">
            <section className="bg-[#BAD7F2]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <ContactUpperContainer/>
                </div>
            </section>
            <section className="bg-white py-16">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <FAQContainer/>
                </div>
            </section>
        </div>
    );
}
export default Contact;