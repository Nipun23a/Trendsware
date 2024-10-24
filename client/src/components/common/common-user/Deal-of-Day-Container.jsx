import React, { useState, useEffect } from 'react';
import InformationBox from "./InformationBox";
import DealDayImage from '../../../assets/images/deal-of-the-day.jpg';
import InformationImage from "../../../assets/images/information-container-image.jpg";

const DealOfDaysContainer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 3,
        hours: 5,
        minutes: 40,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
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
            isTransparent: false
        },
        {
            number: timeLeft.hours.toString().padStart(2, '0'),
            text: "Hours",
            bgColor: "bg-blue-950",
            isTransparent: false
        },
        {
            number: timeLeft.minutes.toString().padStart(2, '0'),
            text: "Minutes",
            bgColor: "bg-blue-950",
            isTransparent: false
        },
    ];

    return (
        <div className="site-information-container flex flex-col lg:flex-row gap-12">
            {/* Information Boxes Section */}
            <div className="site-information-info-container lg:w-1/2 flex flex-col">
                {/* Title Section */}
                <div className="mb-12">
                    <h2 className="text-[70px] font-bold text-blue-950 mb-4 font-libre">
                        Deal Of The Day
                    </h2>
                    <p className="text-blue-950 font-poppins text-2xl leading-[50px] font-light">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                    </p>
                </div>

                {/* Info Boxes Grid */}
                <div className="flex gap-6 mb-8 flex-wrap">
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
                <button className="w-fit px-12 py-4 border-2 border-blue-950 text-blue-950 font-bold font-poppins
                    hover:bg-blue-950 hover:text-white transition-all duration-300">
                    Shop Now
                </button>
            </div>

            {/* Image Section */}
            <div className="lg:w-1/2">
                <div className="w-[525px] h-[600px] relative rounded-3xl overflow-hidden group">
                    <img
                        src={DealDayImage}
                        alt="Store showcase"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            </div>
        </div>
    );
}

export default DealOfDaysContainer;