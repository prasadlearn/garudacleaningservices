import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface QuoteModalContextType {
  isOpen: boolean;
  initialService: string;
  openModal: (serviceTitle?: string) => void;
  closeModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

export const QuoteModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialService, setInitialService] = useState('');

  const openModal = useCallback((serviceTitle = '') => {
    setInitialService(serviceTitle);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setInitialService('');
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
