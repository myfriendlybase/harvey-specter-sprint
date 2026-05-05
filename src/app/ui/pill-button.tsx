'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';

interface PillButtonProps {
  children: React.ReactNode;
  /** dark = black bg (use on light surfaces), light = transparent + white border (use on dark surfaces) */
  variant?: 'dark' | 'light';
  className?: string;
  onClick?: () => void;
}

export default function PillButton({ children, variant = 'dark', className = '', onClick }: PillButtonProps) {
  const fillRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    gsap.killTweensOf([fillRef.current, labelRef.current]);
    gsap.set(fillRef.current, { transformOrigin: 'left center' });
    gsap.to(fillRef.current, { scaleX: 1, duration: 0.4, ease: 'power3.out' });
    gsap.to(labelRef.current, { color: '#000000', duration: 0.18, delay: 0.14, ease: 'none' });
  };

  const onLeave = () => {
    gsap.killTweensOf([fillRef.current, labelRef.current]);
    gsap.set(fillRef.current, { transformOrigin: 'right center' });
    gsap.to(fillRef.current, { scaleX: 0, duration: 0.35, ease: 'power3.in' });
    gsap.to(labelRef.current, { color: '#ffffff', duration: 0.18, ease: 'none' });
  };

  const base =
    'relative overflow-hidden text-sm font-medium tracking-[-0.035em] px-4 py-3 rounded-full cursor-pointer w-fit';
  const variantClass =
    variant === 'dark'
      ? 'bg-black border border-black'
      : 'bg-transparent border border-white';

  return (
    <button
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`${base} ${variantClass} ${className}`}
    >
      {/* sliding fill */}
      <span
        ref={fillRef}
        aria-hidden
        className="absolute inset-0 bg-white rounded-full"
        style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
      />
      {/* label stays on top */}
      <span ref={labelRef} className="relative z-10 text-white">
        {children}
      </span>
    </button>
  );
}
