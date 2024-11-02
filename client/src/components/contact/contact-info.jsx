import ContactInfoItem from "./Contact-Info-Item";

const ContactInfo = () => {
    const contactDetails = [
        {
            icon: "Phone",
            title: "Phone Number",
            details: "+1-234-567-8901"
        },
        {
            icon: "Mail",
            title: "Email Address",
            details: "support@trensware.com"
        },
        {
            icon: "Building",
            title: "Office Address",
            details: "Trensware HQ, 123 Business Street"
        },
        {
            icon: "Clock",
            title: "Business Hours",
            details: "Mon - Fri: 9:00 AM - 6:00 PM"
        }
    ];

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="space-y-6">
                {contactDetails.map((item, index) => (
                    <ContactInfoItem
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        details={item.details}
                    />
                ))}
            </div>
        </div>
    );
};

export default ContactInfo;
