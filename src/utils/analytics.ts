export type AnalyticsEvent =
  | 'call_click'
  | 'whatsapp_click'
  | 'book_click'
  | 'gallery_service_filter'
  | 'gallery_category_filter'
  | 'area_chip_click';

export interface AnalyticsPayload {
  serviceSlug?: string;
  sourcePage?: string;
  tier?: string;
  quantity?: string | number;
  [key: string]: any;
}

export function trackEvent(event: AnalyticsEvent, payload?: AnalyticsPayload): void {
  if (typeof window !== 'undefined') {
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', event, payload);
    }
    if (import.meta.env.DEV) {
      console.log(`[Analytics] ${event}`, payload);
    }
  }
}
