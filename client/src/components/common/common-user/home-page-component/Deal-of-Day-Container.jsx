import React, { useState, useEffect } from 'react';
import InformationBox from "./InformationBox";
import DealDayImage from '../../../../assets/images/deal-of-the-day.jpg';

const DealOfDaysContainer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 3,
        hours: 5,
        minutes: 40,
        seconds: 0,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                let { days, hours, minutes, seconds } = prevTime;

                if (seconds > 0) {
                    seconds--;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes--;
                    } else {
                        minutes = 59;
                        if (hours > 0) {
                            hours--;
                        } else {
                            hours = 23;
                            if (days > 0) {
                                days--;
                            } else {
                                // Reset timer when it reaches zero
                                return { days: 3, hours: 5, minutes: 40, seconds: 0 };
                            }
                        }
                    }
                }
                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const infoBoxes = [
        {
            number: timeLeft.days.toString().padStart(2, '0'),
            text: "Days",
            bgColor: "bg-blue-950",
            isTransparent: false,
        },
        {
            number: timeLeft.hours.toString().padStart(2, '0'),
            text: "Hours",
            bgColor: "bg-blue-950",
            isTransparent: false,
        },
        {
            number: timeLeft.minutes.toString().padStart(2, '0'),
            text: "Minutes",
            bgColor: "bg-blue-950",
            isTransparent: false,
        },
    ];

    return (
        <div className="site-information-container flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 sm:px-8 py-10 sm:py-16">
            {/* Information Section */}
            <div className="site-information-info-container flex-1 flex flex-col items-center lg:items-start">
                {/* Title Section */}
                <div className="mb-8 lg:mb-12 text-center lg:text-left">
                    <h2 className="text-4xl sm:text-6xl font-bold text-blue-950 mb-4 font-libre">
                        Deal Of The Day
                    </h2>
                    <p className="text-blue-950 font-poppins text-lg sm:text-2xl leading-relaxed sm:leading-[50px] font-light">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                    </p>
                </div>

                {/* Info Boxes Grid */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6 lg:mb-8">
                    {infoBoxes.map((box, index) => (
                        <InformationBox
                            key={index}
                            number={box.number}
                            text={box.text}
                            bgColor={box.bgColor}
                            isTransparent={box.isTransparent}
                        />
                    ))}
                </div>

                {/* Shop Now Button */}
                <a className="w-full sm:w-auto px-8 py-3 sm:px-12 sm:py-4 border-2 border-blue-950 text-blue-950 font-bold font-poppins
                    hover:bg-blue-950 hover:text-white transition-all duration-300" href="/product">
                    Shop Now
                </a>
            </div>

            {/* Image Section */}
            <div className="flex-1 flex justify-center lg:justify-end">
                <div className="w-full max-w-sm sm:max-w-md h-[400px] sm:h-[500px] relative rounded-3xl overflow-hidden group">
                    <img
                        src={DealDayImage}
                        alt="Store showcase"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            </div>
        </div>
    );
};

export default DealOfDaysContainer;
