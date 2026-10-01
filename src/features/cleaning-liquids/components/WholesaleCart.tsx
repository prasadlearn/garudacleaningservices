import React, { useState } from 'react';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  Building,
  MapPin,
  User,
  Loader2,
  CheckCircle
} from 'lucide-react';
import type { CartItem } from '../types/product';
import { formatCurrency } from '../utils/pricing';
import { DeliveryNotice } from './DeliveryNotice';
import { useLocation } from '../hooks/useLocation';
import { useWholesaleCart } from '../hooks/useWholesaleCart';

export interface WholesaleCartProps {
  isOpen?: boolean;
  onClose?: () => void;
  cartItems?: CartItem[];
  onUpdateQuantity?: (productId: string, size: string, quantity: number) => void;
  onRemoveItem?: (productId: string, size: string) => void;
  onClearCart?: () => void;
  onSendEnquiry?: (formDetails: {
    name: string;
    businessType: string;
    deliveryLocation: string;
    gpsLocation?: string;
    notes?: string;
  }) => void;
}

export const WholesaleCart: React.FC<WholesaleCartProps> = (props) => {
  const hookState = useWholesaleCart();

  const isOpen = props.isOpen !== undefined ? props.isOpen : hookState.isDrawerOpen;
  const onClose = props.onClose || hookState.closeDrawer;
  const cartItems = props.cartItems !== undefined ? props.cartItems : hookState.cartItems;
  const onUpdateQuantity = props.onUpdateQuantity || hookState.updateQuantity;
  const onRemoveItem = props.onRemoveItem || hookState.removeItem;
  const onClearCart = props.onClearCart || hookState.clearCart;
  const onSendEnquiry = props.onSendEnquiry || hookState.sendEnquiry;

  const [name, setName] = useState('');
  const [businessType, setBusinessType] = useState('Apartment / Residential Society');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const {
    deliveryLocation,
    setDeliveryLocation,
    gpsLocation,
    isDetecting,
    locationError,
    requestUserLocation
  } = useLocation();

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendEnquiry({
      name,
      businessType,
      deliveryLocation,
      gpsLocation: gpsLocation && gpsLocation !== '-' ? gpsLocation : undefined,
      notes
    });
    onClearCart();
    setIsSubmitted(true);
  };

  const businessTypes = [
    'Apartment / Residential Society',
    'Hotel / Lodge / Guest House',
    'Office / Corporate Space',
    'Shop / Retail Store / Supermarket',
    'School / Educational Institution',
    'Cleaning Contractor / Housekeeping Crew',
    'Individual Household'
  ];

  const totalItemsCount = hookState.totalItemsCount;

  return (
    <>
      {/* Floating Wholesale Cart Trigger (active on all pages when cart has items) */}
      {totalItemsCount > 0 && !isOpen && (
        <aside
          aria-label="Wholesale Enquiry Cart"
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <button
            type="button"
            onClick={hookState.openDrawer}
            className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#041B3B] text-white shadow-2xl border border-white/20 hover:bg-[#062654] transition-all cursor-pointer group"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#22AC33] group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#22AC33] text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
                {totalItemsCount}
              </span>
            </div>
            <div className="text-left">
              <span className="text-xs font-black block leading-none">Wholesale Cart</span>
              <span className="text-[10px] text-slate-300">
                {cartItems.length} {cartItems.length === 1 ? 'product' : 'products'} selected
              </span>
            </div>
          </button>
        </aside>
      )}

      {/* Drawer Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-[var(--z-modal)] overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#041B3B]/60 backdrop-blur-xs transition-opacity"
            onClick={handleClose}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/90">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#22AC33] flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-[#041B3B]">
                      Wholesale Enquiry Cart
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {isSubmitted
                        ? 'Enquiry submitted'
                        : `${cartItems.length} ${cartItems.length === 1 ? 'product' : 'products'} selected`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!isSubmitted && cartItems.length > 0 && (
                    <button
                      type="button"
                      onClick={onClearCart}
                      className="text-[11px] text-slate-400 hover:text-red-600 font-bold px-1.5 py-1 cursor-pointer transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer transition-colors"
                    aria-label="Close cart"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                {isSubmitted ? (
                  /* SUCCESS VIEW */
                  <div className="text-center py-10 space-y-3">
                    <div className="w-14 h-14 bg-emerald-100 text-[#22AC33] rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle className="w-9 h-9" />
                    </div>
                    <h3 className="text-xl font-black text-[#041B3B]">
                      Request Sent via WhatsApp!
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm max-w-xs mx-auto">
                      Thank you! Our Tirupati coordinator has received your request and will confirm your timing and estimate shortly.
                    </p>
                    <div className="pt-4 flex justify-center">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="btn-homecare-navy px-8 py-2.5 min-h-[42px] text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Close Window
                      </button>
                    </div>
                  </div>
                ) : cartItems.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-[#041B3B]">Your wholesale cart is empty</p>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Browse products and click "+ Add" on any pack size to compile your enquiry.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Selected Items:
                    </span>
                {cartItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <h4 className="font-extrabold text-[#041B3B] truncate">
                        {item.productName}
                      </h4>
                      <div className="flex items-center gap-2 text-slate-500 mt-0.5 font-semibold">
                        <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[10px] font-bold">
                          {item.size}
                        </span>
                        <span>{formatCurrency(item.unitPrice)} each</span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5 shrink-0 bg-white px-2 py-1 rounded-lg border border-slate-200">
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateQuantity(item.productId, item.size, item.quantity - 1)
                        }
                        className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-[#041B3B] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center font-bold text-[#041B3B]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateQuantity(item.productId, item.size, item.quantity + 1)
                        }
                        className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-[#041B3B] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.productId, item.size)}
                      className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Delivery Notice */}
            <DeliveryNotice variant="compact" />

            {/* Customer Details Form */}
            {cartItems.length > 0 && (
              <form id="wholesale-cart-form" onSubmit={handleSubmit} className="space-y-3 pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Procurement Details:
                </span>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Contact Person Name
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar / Facility Head"
                      className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 text-xs focus:border-[#22AC33] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Business / Property Type
                  </label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 text-xs focus:border-[#22AC33] outline-none bg-white font-medium"
                    >
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* GPS LOCATION (OPTIONAL) with Auto-Pin GPS */}
                <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between gap-1.5 mb-1">
                    <label className="block text-[11px] font-bold text-[#041B3B] uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#22AC33]" />
                      <span>GPS Location (Optional)</span>
                    </label>
                    <button
                      type="button"
                      onClick={requestUserLocation}
                      disabled={isDetecting}
                      className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-[#22AC33] bg-[#E8F8EC] px-2.5 py-1 rounded-lg border border-[#22AC33]/30 hover:bg-[#d5f3dc] transition-all cursor-pointer disabled:opacity-60"
                    >
                      {isDetecting ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Pinning...</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-3 h-3 text-[#22AC33]" />
                          <span>Auto-Pin GPS</span>
                        </>
                      )}
                    </button>
                  </div>

                  <input
                    type="text"
                    value={deliveryLocation}
                    onChange={(e) => {
                      setDeliveryLocation(e.target.value);
                    }}
                    placeholder="Click 'Auto-Pin GPS' or enter area name in Tirupati"
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs font-mono focus:border-[#22AC33] outline-none bg-white font-medium text-slate-800"
                  />

                  {locationError && (
                    <p className="text-[10px] text-amber-700 font-medium">
                      {locationError}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Special Notes / Recurring Schedule (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Need GST invoice, recurring monthly supply..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#22AC33] outline-none resize-none"
                  />
                </div>
              </form>
            )}
          </div>

          {/* Footer CTA */}
          {!isSubmitted && cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/90 space-y-1.5">
              <button
                type="submit"
                form="wholesale-cart-form"
                className="w-full btn-homecare-green py-3 text-xs sm:text-sm font-bold justify-center flex items-center gap-2 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Wholesale Enquiry on WhatsApp</span>
              </button>
              <p className="text-[10px] text-slate-400 text-center">
                Zero advance payment required. Delivery charges confirmed based on location.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )}
</>
  );
};

export { WholesaleCart as EnquiryCartDrawer };
