import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface QuoteModalOptions {
  serviceTitle?: string;
  tier?: string;
  sourcePage?: string;
}

interface QuoteModalContextType {
  isOpen: boolean;
  initialService: string;
  openModal: (options?: string | QuoteModalOptions) => void;
  closeModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

const AUTO_OPEN_STORAGE_KEY = 'garuda_booking_modal_auto_opened_v1';

export const QuoteModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialService, setInitialService] = useState('');

  const openModal = useCallback((options?: string | QuoteModalOptions) => {
    if (typeof options === 'string') {
      setInitialService(options);
    } else if (options && typeof options === 'object') {
      let title = options.serviceTitle || '';
      if (options.tier) {
        title = `${title} (${options.tier})`;
      }
      setInitialService(title);
    } else {
      setInitialService('');
    }
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setInitialService('');
  }, []);

  // Automatic booking form opening after 10 seconds of opening website
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QuoteModalContext.Provider value={{ isOpen, initialService, openModal, closeModal }}>
      {children}
    </QuoteModalContext.Provider>
  );
};

export const useQuoteModal = (): QuoteModalContextType => {
  const context = useContext(QuoteModalContext);
  if (!context) {
    throw new Error('useQuoteModal must be used within a QuoteModalProvider');
  }
  return context;
};
