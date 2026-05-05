'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useContactModal } from './contact-modal-context';

function Corner({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

const SERVICE_OPTIONS = ['Brand Discovery', 'Web Design & Dev', 'Marketing', 'Photography', 'Other'];

const inputClass =
  'w-full bg-transparent border-b border-[#1f1f1f]/20 py-3 text-sm text-[#1f1f1f] tracking-[-0.035em] placeholder:text-[#1f1f1f]/30 focus:outline-none focus:border-[#1f1f1f] transition-colors duration-200';

export default function ContactModal() {
  const { isOpen, closeModal } = useContactModal();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });

  // mount on first open so it's not in the DOM on initial paint
  useEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);

  useEffect(() => {
    if (!mounted) return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(panelRef.current, { x: '100%' });
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      gsap.to(panelRef.current, { x: '0%', duration: 0.5, ease: 'power3.out' });
    } else {
      document.body.style.overflow = '';
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' });
      gsap.to(panelRef.current, {
        x: '100%', duration: 0.4, ease: 'power3.in',
        onComplete: () => setMounted(false),
      });
    }
  }, [isOpen, mounted]);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeModal]);

  if (!mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const handleClose = () => {
    closeModal();
    // reset after animation
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', service: '', message: '' }); }, 450);
  };

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal aria-label="Contact">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute top-0 right-0 bottom-0 w-full md:w-[560px] bg-[#fafafa] overflow-y-auto flex flex-col"
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 shrink-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#1f1f1f]/40">[ contact ]</p>
          <button
            onClick={handleClose}
            aria-label="Close contact form"
            className="p-1 cursor-pointer text-[#1f1f1f]/50 hover:text-[#1f1f1f] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Heading */}
        <div className="px-8 pb-10 shrink-0">
          <h2 className="font-light text-[#1f1f1f] uppercase tracking-[-0.06em] leading-[0.88] text-[11vw] md:text-[52px]">
            Let&apos;s build<br />
            <em className="font-playfair italic">something.</em>
          </h2>
        </div>

        {/* Form */}
        <div className="px-8 pb-12 flex-1">
          <div className="relative p-8">
            <Corner className="absolute top-0 left-0" />
            <Corner className="absolute top-0 right-0 rotate-90" />
            <Corner className="absolute bottom-0 left-0 -rotate-90" />
            <Corner className="absolute bottom-0 right-0 rotate-180" />

            {sent ? (
              <div className="flex flex-col gap-4 py-8">
                <p className="font-bold italic text-[28px] text-[#1f1f1f] uppercase tracking-[-0.04em] leading-[1.1]">
                  Message sent.
                </p>
                <p className="text-sm text-[#1f1f1f]/60 tracking-[-0.035em] leading-[1.6]">
                  Thanks for reaching out — I&apos;ll get back to you within 1–2 business days.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 self-start font-mono text-[11px] uppercase tracking-[0.06em] px-6 py-3 rounded-full border border-[#1f1f1f] text-[#1f1f1f] cursor-pointer hover:text-white hover:bg-[#1f1f1f] transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#1f1f1f]/40">Name</label>
                    <input
                      required type="text" placeholder="Your name"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#1f1f1f]/40">Email</label>
                    <input
                      required type="email" placeholder="your@email.com"
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#1f1f1f]/40">Service</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>Select a service</option>
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#1f1f1f]/40">Message</label>
                  <textarea
                    required rows={5} placeholder="Tell me about your project…"
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="self-start font-mono text-[11px] uppercase tracking-[0.06em] px-6 py-3 rounded-full border border-[#1f1f1f] text-[#1f1f1f] cursor-pointer hover:text-white hover:bg-[#1f1f1f] transition-colors duration-300"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
