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
                font-rouge
            ">
                {number}
            </span>
            <span className="
                text-[20px]
                sm:text-[20px]
                md:text-[20px]
                font-
                text-white/90
                text-center
                px-2
                max-w-[80%]
                font-rouge
            ">
                {text}
            </span>
        </div>
    );
}

export default Circle;