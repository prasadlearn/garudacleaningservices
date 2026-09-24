export const BUSINESS_CONFIG = {
  brandName: "Garuda Cleaning Services",
  shortName: "Garuda Cleaning Services",
  tagline: "Professional Deep Cleaning & Sanitization Experts",
  subTagline: "Premium residential, commercial & mechanized deep cleaning solutions tailored for Tirupati and nearby regions.",

  contact: {
    phoneDisplay: "+91 77995 52084",
    phoneTel: "tel:+917799552084",
    whatsappDisplay: "+91 77995 52084",
    whatsappRaw: "917799552084",
    email: "contact@garudacleaningservices.com",
    address: "Bhavani Nagar, AIR Bypass Road, Tirupati, Andhra Pradesh - 517501",
    city: "Tirupati",
    state: "Andhra Pradesh",
    operatingHours: "Monday – Sunday: 7:00 AM – 9:00 PM",
    // Street-level exact location (null by default until owner provides Google Business profile)
    // TODO_OWNER: paste from your Google Business Profile once created; until then the Contact page location section renders nothing.
    mapsPlaceUrl: null as string | null,
    embedUrl: null as string | null,
    lat: null as number | null,
    lng: null as number | null,
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.348651810506!2d79.4239845!3d13.636688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b067f9c21b3%3A0xb355d9d784a9190!2sAIR%20Bypass%20Rd%2C%20Bhavani%20Nagar%2C%20Tirupati%2C%20Andhra%20Pradesh%20517501!5e0!3m2!1sen!2sin!4v1726830000000!5m2!1sen!2sin",
    mapDirectUrl: "https://maps.google.com/?q=AIR+Bypass+Road,+Bhavani+Nagar,+Tirupati,+Andhra+Pradesh+517501"
  },

  serviceAreasVerified: false, // TODO_OWNER: verify exact per-area PIN codes and landmarks
  openingHoursLine: "Open 7:00 AM to 9:00 PM, all days",

  coverage: {
    headline: "All areas of Tirupati",
    nearbyOnRequest: ["Renigunta", "Chandragiri", "Tiruchanur"],
    mapEmbedUrl: "https://www.google.com/maps?q=Tirupati,+Andhra+Pradesh,+India&z=12&output=embed",
    mapDirectUrl: "https://www.google.com/maps/search/?api=1&query=Tirupati%2C+Andhra+Pradesh"
  },

  serviceAreas: [
    { name: "Alipiri & Foothills", pincode: "517507", status: "Covered" },
    { name: "Balaji Colony & Bhavani Nagar", pincode: "517501", status: "Covered" },
    { name: "AIR Bypass Road", pincode: "517501", status: "Covered" },
    { name: "MR Palli & Korlagunta", pincode: "517502", status: "Covered" },
    { name: "Renigunta Road & Mangalam", pincode: "517520", status: "Covered" },
    { name: "KT Road & Gandhi Road", pincode: "517501", status: "Covered" },
    { name: "Chandragiri & Surroundings", pincode: "517101", status: "Covered" },
    { name: "Tiruchanur & Padmavathi Puram", pincode: "517503", status: "Covered" },
    { name: "Settipalli & Karakambadi Road", pincode: "517507", status: "Covered" },
  ],

  buildWhatsAppUrl: (options?: string | { message?: string }) => {
    let msg = "Hello Garuda Cleaning Services, I would like to inquire about cleaning services in Tirupati.";
    if (typeof options === 'string') {
      msg = options;
    } else if (options && options.message) {
      msg = options.message;
    }
    return `https://wa.me/917799552084?text=${encodeURIComponent(msg)}`;
  },
};
