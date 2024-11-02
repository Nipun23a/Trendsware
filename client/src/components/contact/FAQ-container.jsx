import FAQItem from "./FAQItem";

const FAQContainer = () => {
    const faqData = [
        {
            question: "What payment methods do you accept?",
            answer: "We accept a wide range of payment methods including Visa, MasterCard, American Express, PayPal, and bank transfers. All payments are processed securely through our encrypted payment gateway."
        },
        {
            question: "How long does shipping take?",
            answer: "Shipping times vary depending on your location. Domestic orders typically arrive within 3-5 business days, while international shipments may take 7-14 business days. Express shipping options are available at checkout."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for all unused items in their original packaging. Simply contact our customer service team to initiate a return. Once we receive the item, we'll process your refund within 5 business days."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. You can view specific shipping rates and estimated delivery times during checkout."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or through the carrier's tracking system. Our system provides real-time updates on your package's location."
        }
    ];

    return(
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-14">
            <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold text-blue-950 mb-2 sm:mb-3 font-lexend">
                    Frequently Asked Questions
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-[18px] text-blue-950 mb-6 sm:mb-8 mt-4 sm:mt-6 md:mt-8 lg:mt-10 font-poppins font-light max-w-xl mx-auto">
                    Find answers to common questions about our products and services
                </p>
            </div>
            <div className="faq-container max-w-3xl mx-auto divide-y divide-gray-200">
                {faqData.map((faq, index) => (
                    <FAQItem
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                    />
                ))}
            </div>
        </div>
    );
}

export default FAQContainer;