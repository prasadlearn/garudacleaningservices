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
