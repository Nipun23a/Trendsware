import React from 'react';
import { Send } from 'lucide-react';

const ContactForm = () => {
    return (
        <div className="contact-form-container px-8 py-20 rounded-xl box-border bg-white/70 backdrop-blur-sm shadow-xl">
            <form className="space-y-6">
                <div className="space-y-2">
                    <label className="text-blue-950 font-montserrat text-sm font-medium">
                        Your Name
                    </label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full p-3 border bg-white/50 border-blue-200 rounded-md
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        font-montserrat box-border font-medium text-blue-950
                        placeholder:text-blue-400"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-blue-950 font-montserrat text-sm font-medium">
                        Your Email
                    </label>
                    <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full p-3 border bg-white/50 border-blue-200 rounded-md
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        font-montserrat box-border font-medium text-blue-950
                        placeholder:text-blue-400"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-blue-950 font-montserrat text-sm font-medium">
                        Subject
                    </label>
                    <input
                        type="text"
                        placeholder="How can we help?"
                        className="w-full p-3 border bg-white/50 border-blue-200 rounded-md
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        font-montserrat box-border font-medium text-blue-950
                        placeholder:text-blue-400"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-blue-950 font-montserrat text-sm font-medium">
                        Message
                    </label>
                    <textarea
                        placeholder="Your message here..."
                        rows="4"
                        className="w-full p-3 border bg-white/50 border-blue-200 rounded-md
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        font-montserrat box-border font-medium text-blue-950
                        placeholder:text-blue-400 resize-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-4 text-white bg-blue-950 rounded-md
                    hover:bg-blue-900 transition-all duration-300
                    font-montserrat font-bold flex items-center justify-center gap-2
                    shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    <Send className="w-5 h-5" />
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default ContactForm;