'use client';

import { useEffect, useRef, useState } from 'react';
import ContactModal from './contact-modal';

export default function LayoutClient({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setFooterHeight(entries[0].borderBoxSize[0].blockSize);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <div ref={footerRef} className="fixed bottom-0 left-0 right-0 z-0">
        {footer}
      </div>
      <main className="relative z-10" style={{ paddingBottom: footerHeight || undefined, pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }}>
          {children}
        </div>
      </main>
      <ContactModal />
    </>
  );
}
