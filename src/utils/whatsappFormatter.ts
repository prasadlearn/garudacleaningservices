export interface ServiceRequestData {
  appointmentDate?: string;
  name: string;
  phone: string;
  address: string;
  landmark?: string;
  gpsLocation?: string;
  serviceRequired: string;
  totalAmount?: string;
  subscriptionClient?: string;
  priorityTime?: string;
  remarks?: string;
}

/**
 * Generates the exact WhatsApp format requested by the client:
 * 
 * *New Service Request*
 * Appointment Date: 06/09/2026
 * Customer Name: Dhana
 * Phone Number: 7799552084
 * Address: Tata nagar
 * Landmark: Tata nagar
 * GPS Location: -
 * Service Required: House Deep Cleaning (2BHK) (₹2999)
 * Total Amount: To be confirmed
 * Subscription Client: No
 * Priority Time: 10 am
 * Remarks: -
 */
export function buildGarudaServiceRequestWhatsAppUrl(data: ServiceRequestData): string {
  // Format appointment date e.g. 20/09/2026
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
  const priorityTime = data.priorityTime?.trim() || '10 am';
  const remarks = data.remarks?.trim() || '-';

  const text = `*New Service Request*
Appointment Date: ${dateStr}
Customer Name: ${data.name.trim()}
Phone Number: ${data.phone.trim()}
Address: ${data.address.trim()}
Landmark: ${landmark}
GPS Location: ${gps}
Service Required: ${data.serviceRequired.trim()}
Total Amount: ${totalAmount}
Subscription Client: ${subscription}
Priority Time: ${priorityTime}
Remarks: ${remarks}`;

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
    serviceRequired: data.serviceRequired || data.service || 'House Deep Cleaning (2BHK) (₹2999)',
    totalAmount: data.totalAmount,
    subscriptionClient: data.subscriptionClient,
    priorityTime: data.priorityTime,
    remarks: data.remarks || data.message,
  });
}
