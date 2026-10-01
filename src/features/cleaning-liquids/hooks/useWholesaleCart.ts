import { useState, useEffect, useCallback } from 'react';
import type { CartItem, Product, PackOption } from '../types/product';
import { buildMultiItemWholesaleWhatsAppUrl } from '../utils/whatsappUtils';
import { trackEvent } from '../../../utils/analytics';

const CART_STORAGE_KEY = 'garuda_wholesale_cart_items_v1';

function getStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Error reading wholesale cart from localStorage:', err);
    return [];
  }
}

function saveStoredCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('garuda_wholesale_cart_sync', { detail: items }));
  } catch (err) {
    console.warn('Error writing wholesale cart to localStorage:', err);
  }
}

export function useWholesaleCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(getStoredCart);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Sync state if localStorage changes or other components dispatch cart sync
  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<CartItem[]>;
      if (customEvent.detail) {
        setCartItems(customEvent.detail);
      } else {
        setCartItems(getStoredCart());
      }
    };

    const handleDrawer = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      if (typeof customEvent.detail === 'boolean') {
        setIsDrawerOpen(customEvent.detail);
      }
    };

    window.addEventListener('garuda_wholesale_cart_sync', handleSync);
    window.addEventListener('garuda_wholesale_cart_drawer', handleDrawer);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('garuda_wholesale_cart_sync', handleSync);
      window.removeEventListener('garuda_wholesale_cart_drawer', handleDrawer);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const openDrawer = useCallback(() => {
    setIsDrawerOpen(true);
    window.dispatchEvent(new CustomEvent('garuda_wholesale_cart_drawer', { detail: true }));
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    window.dispatchEvent(new CustomEvent('garuda_wholesale_cart_drawer', { detail: false }));
  }, []);

  const updateCartState = useCallback((updater: (prev: CartItem[]) => CartItem[]) => {
    const current = getStoredCart();
    const next = updater(current);
    saveStoredCart(next);
    setCartItems(next);
  }, []);

  const addItem = (product: Product, packOption: PackOption, quantity: number = 1) => {
    const unitPrice = packOption.offerPrice ?? packOption.price ?? null;
    updateCartState((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.size === packOption.size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }

      return [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          size: packOption.size,
          quantity,
          unitPrice,
          pricingStatus: packOption.pricingStatus
        }
      ];
    });

    trackEvent('wholesale_cart_add', {
      product: product.name,
      size: packOption.size,
      quantity
    });
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size);
      return;
    }

    updateCartState((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeItem = (productId: string, size: string) => {
    updateCartState((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size === size))
    );
  };

  const clearCart = () => {
    updateCartState(() => []);
  };

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const sendEnquiry = (formDetails: {
    name: string;
    businessType: string;
    deliveryLocation: string;
    gpsLocation?: string;
    notes?: string;
  }) => {
    trackEvent('wholesale_enquiry_submit', {
      itemCount: totalItemsCount,
      items: cartItems.map((i) => `${i.productName} (${i.size}) x${i.quantity}`),
      businessType: formDetails.businessType
    });

    const url = buildMultiItemWholesaleWhatsAppUrl({
      name: formDetails.name,
      businessType: formDetails.businessType,
      deliveryLocation: formDetails.deliveryLocation,
      gpsLocation: formDetails.gpsLocation,
      items: cartItems,
      notes: formDetails.notes
    });

    window.open(url, '_blank', 'noopener,noreferrer');
    clearCart();
  };

  return {
    cartItems,
    isDrawerOpen,
    setIsDrawerOpen,
    openDrawer,
    closeDrawer,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    totalItemsCount,
    sendEnquiry
  };
}

export { useWholesaleCart as useEnquiryCart };
