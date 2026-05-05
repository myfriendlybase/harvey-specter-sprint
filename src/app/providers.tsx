'use client';

import { ContactModalProvider } from './ui/contact-modal-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ContactModalProvider>{children}</ContactModalProvider>;
}
