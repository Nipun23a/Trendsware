import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import required modules
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import TestimonialCard from "../common/common-user/TestimonialCard";
import Customer1 from "../../assets/images/customer1.jpg";
import Customer2 from "../../assets/images/customer2.jpg";
import Customer3 from "../../assets/images/customer3.jpg";
import Customer4 from "../../assets/images/customer4.jpg";

const CustomerTestomonialContainer = () => {
    const testimonials = [
        {
            image: Customer1,
            name: "Sarah Johnson",
            role: "Regular Customer",
            comment: "I've been shopping here for years and the quality never disappoints. Their customer service is exceptional and they always go above and beyond."
        },
        {
            image: Customer2,
            name: "Kylie Dow",
            role: "Loyal Customer",
            comment: "The products are fantastic and the shopping experience is seamless. I particularly love their attention to detail and quick delivery."
        },
        {
            image: Customer3,
            name: "Sarah Silva",
            role: "Regular Customer",
            comment: "I've been shopping here for years and the quality never disappoints. Their customer service is exceptional and they always go above and beyond."
        },
        {
            image: Customer4,
            name: "Bella Lopez",
            role: "Loyal Customer",
            comment: "The products are fantastic and the shopping experience is seamless. I particularly love their attention to detail and quick delivery."
        },
    ];

    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-14">
            <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold text-blue-950 mb-2 sm:mb-3 font-lexend">
                    Hear What Our Customer Says
                </h1>
            </div>

            <Swiper
                modules={[Autoplay]}
                slidesPerView={1}  // 1 slide per view by default
                spaceBetween={20}
                breakpoints={{
                    768: { slidesPerView: 1 }, // 1 slide per view on mobile devices
                    1024: { slidesPerView: 2 }  // 2 slides per view on larger screens
                }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                speed={1000} // Smooth transition speed
                className="max-w-5xl mx-auto"
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <TestimonialCard {...testimonial} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default CustomerTestomonialContainer;
