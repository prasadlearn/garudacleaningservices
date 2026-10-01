import type { CartItem, WholesaleEnquiryPayload } from '../types/product';
import { formatCurrency } from './pricingUtils';

export const WHATSAPP_PHONE_NUMBER = '917799552084';

/**
 * Builds the structured WhatsApp enquiry text for wholesale cart items.
 */
export function buildWholesaleWhatsAppMessage(payload: WholesaleEnquiryPayload): string {
  const { name, businessType, deliveryLocation, gpsLocation, items, notes } = payload;

  const header = `*Wholesale Cleaning Liquids Enquiry — Garuda Cleaning Services*`;

  // Always include the clickable Google Maps location link when GPS is captured
  let locationText: string | null = null;
  if (gpsLocation && gpsLocation !== '-' && gpsLocation.startsWith('http')) {
    if (deliveryLocation && deliveryLocation.trim() && !deliveryLocation.startsWith('GPS Pinned')) {
      locationText = `${deliveryLocation.trim()} (Google Maps: ${gpsLocation.trim()})`;
    } else {
      locationText = gpsLocation.trim();
    }
  } else if (deliveryLocation && deliveryLocation.trim()) {
    locationText = deliveryLocation.trim();
  }

  const customerInfo = [
    name ? `*Name:* ${name}` : null,
    businessType ? `*Business/Category:* ${businessType}` : null,
    locationText ? `*Delivery Location:* ${locationText}` : null
  ]
    .filter(Boolean)
    .join('\n');

  let itemsList = '';
  let subtotal = 0;
  let hasPricedItems = false;

  if (items.length > 0) {
    itemsList = items
      .map((item: CartItem) => {
        if (item.unitPrice !== null && item.unitPrice !== undefined) {
          const lineTotal = item.unitPrice * item.quantity;
          subtotal += lineTotal;
          hasPricedItems = true;
          return `• ${item.productName} (${item.size}) × ${item.quantity} = ${formatCurrency(lineTotal)}`;
        } else {
          return `• ${item.productName} (${item.size}) × ${item.quantity} (Price on enquiry)`;
        }
      })
      .join('\n');
  }

  const subtotalSection = hasPricedItems
    ? `\n*Estimated Product Subtotal:* ${formatCurrency(subtotal)}`
    : '';

  const deliveryNotice = `\n_Note: Delivery charges will be confirmed separately based on order size and delivery location in Tirupati._`;

  const customNotes = notes ? `\n*Additional Notes:* ${notes}` : '';

  const closing = `\nPlease confirm product availability and delivery charges. Thank you!`;

  return [
    header,
    customerInfo ? `\n${customerInfo}` : '',
    items.length > 0 ? `\n*Products Requested:*\n${itemsList}` : '',
    subtotalSection,
    deliveryNotice,
    customNotes,
    closing
  ]
    .filter(Boolean)
    .join('\n');
}

export function buildMultiItemWholesaleWhatsAppUrl(payload: WholesaleEnquiryPayload): string {
  const message = buildWholesaleWhatsAppMessage(payload);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encoded}`;
}

export function buildProductWhatsAppUrl(
  productName: string,
  packSize: string,
  priceText?: string
): string {
  const msg = [
    `*Garuda Cleaning Liquids Enquiry*`,
    `Hello! I would like to check availability and order details for:`,
    `• *${productName}* (${packSize})${priceText ? ` — ${priceText}` : ''}`,
    ``,
    `Delivery location: Tirupati`,
    `Please confirm stock availability and delivery charges.`
  ].join('\n');

  const encoded = encodeURIComponent(msg);
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encoded}`;
}

/**
 * Opens WhatsApp with the prepared wholesale enquiry message.
 */
export function sendWholesaleWhatsApp(payload: WholesaleEnquiryPayload): void {
  const url = buildMultiItemWholesaleWhatsAppUrl(payload);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Quick single product direct WhatsApp enquiry
 */
export function sendDirectProductWhatsApp(
  productName: string,
  packSize: string,
  priceText?: string
): void {
  const url = buildProductWhatsAppUrl(productName, packSize, priceText);
  window.open(url, '_blank', 'noopener,noreferrer');
}
