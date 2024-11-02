import React from 'react';

const Circle = ({number,text}) => {
    return(
        <div className="
            w-[120px] h-[120px]
            sm:w-[150px] sm:h-[150px]
            md:w-[180px] md:h-[180px]
            bg-blue-950
            rounded-full
            flex
            flex-col
            items-center
            justify-center
            shadow-lg
            p-2
        ">
            <span className="
                text-2xl
                sm:text-3xl
                md:text-4xl
                font-bold
                text-white
                mb-1
            ">
                {number}
            </span>
            <span className="
                text-xs
                sm:text-sm
                md:text-base
                font-medium
                text-white/90
                text-center
                px-2
                max-w-[80%]
            ">
                {text}
            </span>
        </div>
    );
}

export default Circle;