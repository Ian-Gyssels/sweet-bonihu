import { motion } from "framer-motion";

interface GoogleMapProps {
    className?: string;
}

const GoogleMap = ({ className = "" }: GoogleMapProps) => {
    // Free Google Maps embed URL for Fortuinstraat 79, Brugge
    const embedUrl = "https://maps.google.com/maps?q=Fortuinstraat+79,+8000+Brugge,+Belgium&t=&z=15&ie=UTF8&iwloc=&output=embed";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`rounded-sm overflow-hidden shadow-lg ${className}`}
        >
            <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sweet Bonihu Location - Fortuinstraat 79, Brugge"
            />
        </motion.div>
    );
};

export default GoogleMap;
