import IconCircle from "../common/common-user/Icon-Circle";

const ContactInfoItem = ({ icon, title, details }) => {
    return (
        <div className="flex items-center space-x-6">
            <IconCircle icon={icon} />
            <div className="flex flex-col items-start">
                <h3 className="text-2xl font-semibold text-blue-950 font-montserrat">{title}</h3>
                <p className="font-montserrat text-blue-950 mt-2">{details}</p>
            </div>
        </div>
    );
};

export default ContactInfoItem;