'use client';

import { createContext, useContext, useState } from 'react';

interface ContactModalCtx {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalCtx>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ContactModalContext.Provider
      value={{ isOpen, openModal: () => setIsOpen(true), closeModal: () => setIsOpen(false) }}
    >
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  return useContext(ContactModalContext);
}
