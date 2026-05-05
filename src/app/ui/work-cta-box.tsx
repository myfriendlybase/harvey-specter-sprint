'use client';

import PillButton from './pill-button';
import { useContactModal } from './contact-modal-context';

function Corner({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export default function WorkCtaBox() {
  const { openModal } = useContactModal();
  return (
    <div className="flex gap-3 items-stretch max-w-[465px]">
      <div className="flex flex-col justify-between w-6 shrink-0">
        <Corner />
        <Corner className="rotate-[-90deg]" />
      </div>
      <div className="flex-1 flex flex-col gap-[10px] justify-center py-3">
        <p className="text-sm italic text-[#1f1f1f] tracking-[-0.035em] leading-[1.3]">
          Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
        </p>
        <PillButton variant="dark" onClick={openModal}>Let&apos;s talk</PillButton>
      </div>
      <div className="flex flex-col justify-between w-6 shrink-0 items-end">
        <Corner className="rotate-90" />
        <Corner className="rotate-180" />
      </div>
    </div>
  );
}
