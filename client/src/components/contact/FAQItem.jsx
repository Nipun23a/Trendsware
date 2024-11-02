import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
            >
                <span className="text-lg font-medium text-blue-950 font-montserrat">{question}</span>
                <ChevronDown
                    className={`text-gray-500 transition-transform duration-300 ${
                        isOpen ? 'transform rotate-180' : ''
                    }`}
                />
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
                }`}
            >
                <p className="text-blue-950 font-montserrat pb-6">{answer}</p>
            </div>
        </div>
    );
};

export default FAQItem;