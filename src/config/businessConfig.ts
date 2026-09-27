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
    email: "garudacleaningservices1@gmail.com",
    address: "Tirupati, Andhra Pradesh",
    serviceArea: "Tirupati, Andhra Pradesh",
    serviceAreaNote: "Cleaning services available at your location.",
    city: "Tirupati",
    state: "Andhra Pradesh",
    operatingHours: "Monday – Sunday: 8:00 AM – 8:00 PM",
    // Street-level exact location (null - service provided at customer location)
    mapsPlaceUrl: null as string | null,
    embedUrl: null as string | null,
    lat: null as number | null,
    lng: null as number | null,
    mapEmbedUrl: "https://www.google.com/maps?q=Tirupati,+Andhra+Pradesh,+India&z=12&output=embed",
    mapDirectUrl: "https://www.google.com/maps/search/?api=1&query=Tirupati%2C+Andhra+Pradesh"
  },

  serviceAreasVerified: true,
  openingHoursLine: "Open Monday – Sunday: 8:00 AM – 8:00 PM",

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
