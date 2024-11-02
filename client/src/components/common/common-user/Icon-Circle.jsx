import React from 'react';
import * as LucideIcons from 'lucide-react';

const IconCircle = ({ icon, text }) => {
    const IconComponent = icon ? LucideIcons[icon] : null;

    return (
        <div className="
            w-[80px] h-[80px]      // Default size for mobile screens
            sm:w-[100px] sm:h-[100px]  // Size for small screens
            md:w-[120px] md:h-[120px]  // Size for larger screens
            bg-blue-950
            rounded-full
            flex
            items-center
            justify-center
            shadow-lg
        ">
            {IconComponent && (
                <IconComponent
                    className="text-white
                    w-6 h-6 sm:w-12 sm:h-12"   // 24px (6 * 4px) for mobile, 48px (12 * 4px) for larger screens
                />
            )}
        </div>
    );
};

export default IconCircle;
