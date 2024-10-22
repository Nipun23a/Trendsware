import React from 'react';
import UpperContainerImage from '../../../assets/images/upper-container-image.jpg';

const UpperContainer = () => {
    return (
        <div className="flex justify-between items-center py-12">
            <div className="flex-1 pr-12">
                <div className="space-y-6">
                    <h5 className="text-blue-950 text-[62px] leading-tight title-text uppercase font-extrabold">
                        Where fashion<br/> meets{' '}
                        <span className="text-[#F2994A]">Elegance</span>
                    </h5>
                    <p className="text-blue-900 text-lg max-w-xl sub-title-font uppercase">
                        Indulge in our latest collection of timeless designs, crafted for those who appreciate sophistication.
                        Elevate your style with premium pieces for every occasion.
                    </p>
                    <div className="space-x-4 pt-4">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium sing-up-button">
                            Shop Now
                        </button>
                        <button className="bg-transparent border-2 border-blue-950 text-blue-950 px-8 py-3 rounded-full font-medium hover:bg-blue-950 hover:text-white transition-colors sing-up-button">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-[507px]">
                <img
                    src={UpperContainerImage}
                    alt="Fashion showcase"
                    className="w-full h-[709px] object-cover rounded-3xl shadow-lg"
                />
            </div>
        </div>
    );
};

export default UpperContainer;