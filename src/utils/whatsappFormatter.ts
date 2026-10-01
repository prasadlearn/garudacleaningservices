export interface ServiceRequestData {
  appointmentDate?: string;
  name: string;
  phone: string;
  address: string;
  landmark?: string;
  gpsLocation?: string;
  serviceRequired: string | string[];
  totalAmount?: string;
  subscriptionClient?: string;
  priorityTime?: string;
  remarks?: string;
}

/**
 * Builds standard WhatsApp booking message url
 */
export function buildGarudaServiceRequestWhatsAppUrl(data: ServiceRequestData): string {
  let dateStr = data.appointmentDate?.trim();
  if (!dateStr) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    dateStr = `${dd}/${mm}/${yyyy}`;
  }

  const landmark = data.landmark?.trim() || data.address.trim() || '-';
  const gps = data.gpsLocation?.trim() || '-';
  const totalAmount = data.totalAmount?.trim() || 'To be confirmed';
  const subscription = data.subscriptionClient?.trim() || 'No';
  const priorityTime = data.priorityTime?.trim() || '10:00 AM - 01:00 PM (Morning Slot)';
  const remarks = data.remarks?.trim() || '-';

  // Format single or multi services
  let formattedServices = '';
  if (Array.isArray(data.serviceRequired)) {
    if (data.serviceRequired.length === 0) {
      formattedServices = 'Cleaning Service Inquiry';
    } else if (data.serviceRequired.length === 1) {
      formattedServices = data.serviceRequired[0];
    } else {
      formattedServices = '\n' + data.serviceRequired.map((s, idx) => `  ${idx + 1}. ${s}`).join('\n');
    }
  } else {
    formattedServices = data.serviceRequired?.trim() || 'Cleaning Service Inquiry';
  }

  const addressLines: string[] = [];
  if (data.address.trim() && !data.address.trim().startsWith('GPS Pinned')) {
    addressLines.push(`Address / Locality: ${data.address.trim()}`);
  }
  if (data.landmark && data.landmark.trim() && data.landmark.trim() !== '-' && data.landmark.trim() !== data.address.trim()) {
    addressLines.push(`Landmark: ${data.landmark.trim()}`);
  }
  if (gps && gps !== '-') {
    addressLines.push(`GPS Location: ${gps}`);
  } else if (addressLines.length === 0) {
    addressLines.push(`Address: ${data.address.trim() || 'Tirupati'}`);
  }

  const text = `*New Cleaning Booking*
Customer Name: ${data.name.trim()}
Phone Number: ${data.phone.trim()}
Services: ${formattedServices}
Appointment Date: ${dateStr}
Preferred Time: ${priorityTime}
${addressLines.join('\n')}
Remarks: ${remarks}`;

  return `https://wa.me/917799552084?text=${encodeURIComponent(text)}`;
}

/**
 * Fast direct booking WhatsApp message format requested in catalogue:
 * "Hi Garuda Cleaning, I want to book {service} ({tier or quantity}). Estimated: {price}. Locality: __ . Page: {url}"
 */
export function buildQuickBookingWhatsAppUrl(params: {
  service: string;
  tierOrQuantity?: string;
  price: string;
  url?: string;
}): string {
  const detail = params.tierOrQuantity ? ` (${params.tierOrQuantity})` : '';
  const currentUrl = params.url || (typeof window !== 'undefined' ? window.location.href : 'https://garudacleaningservices.com/services');
  const text = `Hi Garuda Cleaning, I want to book ${params.service}${detail}. Estimated: ${params.price}. Locality: __ . Page: ${currentUrl}`;
  return `https://wa.me/917799552084?text=${encodeURIComponent(text)}`;
}

// Backward-compatible alias
export function buildGarudaInquiryWhatsAppUrl(data: any): string {
  return buildGarudaServiceRequestWhatsAppUrl({
    appointmentDate: data.appointmentDate,
    name: data.name || '',
    phone: data.phone || '',
    address: data.address || data.location || data.locality || 'Tirupati',
    landmark: data.landmark,
    gpsLocation: data.gpsLocation || data.mapsPin,
    serviceRequired: data.serviceRequired || data.service || 'Home Cleaning',
    totalAmount: data.totalAmount,
    subscriptionClient: data.subscriptionClient,
    priorityTime: data.priorityTime,
    remarks: data.remarks || data.message,
  });
}
