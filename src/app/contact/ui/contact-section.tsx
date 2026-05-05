"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export interface ContactSettings {
  email?: string;
  location?: string;
  isAvailable?: boolean;
  availabilityLabel?: string;
  socialLinks?: { platform: string; url: string }[];
  serviceOptions?: string[];
}

function Corner({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export default function ContactSection({
  email = "hello@hstudio.co",
  location = "Chicago, IL",
  isAvailable = true,
  availabilityLabel = "Open to new projects",
  socialLinks = [
    { platform: "Instagram", url: "#" },
    { platform: "LinkedIn",  url: "#" },
    { platform: "X.com",     url: "#" },
    { platform: "Facebook",  url: "#" },
  ],
  serviceOptions = [],
}: ContactSettings) {
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });

  const allServiceOptions = serviceOptions.length
    ? [...serviceOptions, "Other"]
    : ["Brand Discovery", "Web Design & Dev", "Marketing", "Photography", "Other"];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(detailsRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.45 }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputClass =
    "w-full bg-transparent border-b border-[#1f1f1f]/20 py-3 text-sm text-[#1f1f1f] tracking-[-0.035em] placeholder:text-[#1f1f1f]/30 focus:outline-none focus:border-[#1f1f1f] transition-colors duration-200";

  return (
    <section className="bg-[#fafafa] px-4 pt-28 pb-16 md:px-8 md:pt-36 md:pb-[100px] flex flex-col gap-16 md:gap-20">

      <div ref={headingRef} style={{ opacity: 0 }} className="flex flex-col gap-3">
        <p className="font-mono text-sm text-[#1f1f1f]/40 uppercase leading-[1.1]">[ contact ]</p>
        <h1 className="font-light text-[#1f1f1f] uppercase tracking-[-0.06em] leading-[0.88] text-[13vw] md:text-[7vw]">
          Let&apos;s build<br />
          <em className="font-playfair italic">something.</em>
        </h1>
      </div>

      <div className="grid md:grid-cols-[1fr_280px] gap-16 md:gap-24 items-start">

        {/* Form */}
        <div ref={formRef} style={{ opacity: 0 }} className="relative p-8 md:p-12">
          <Corner className="absolute top-0 left-0" />
          <Corner className="absolute top-0 right-0 rotate-90" />
          <Corner className="absolute bottom-0 left-0 -rotate-90" />
          <Corner className="absolute bottom-0 right-0 rotate-180" />

          {sent ? (
            <div className="flex flex-col gap-4 py-8">
              <p className="font-bold italic text-[28px] text-[#1f1f1f] uppercase tracking-[-0.04em] leading-[1.1]">
                Message sent.
              </p>
              <p className="text-sm text-[#1f1f1f]/60 tracking-[-0.035em] leading-[1.6] max-w-[360px]">
                Thanks for reaching out — I&apos;ll get back to you within 1–2 business days.
              </p>
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
                  {allServiceOptions.map((s) => (
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
                className="relative overflow-hidden self-start font-mono text-[11px] uppercase tracking-[0.06em] px-6 py-3 rounded-full border border-[#1f1f1f] text-[#1f1f1f] cursor-pointer group/btn transition-colors duration-300 hover:text-white hover:bg-[#1f1f1f]"
              >
                Send message
              </button>
            </form>
          )}
        </div>

        {/* Details */}
        <div ref={detailsRef} style={{ opacity: 0 }} className="flex flex-col gap-10 md:pt-8">

          <div className="flex flex-col gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#1f1f1f]/40">Email</p>
            <a
              href={`mailto:${email}`}
              className="text-sm text-[#1f1f1f] tracking-[-0.035em] border-b border-[#1f1f1f]/20 pb-1 w-fit hover:border-[#1f1f1f] transition-colors duration-200"
            >
              {email}
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#1f1f1f]/40">Based in</p>
            <p className="text-sm text-[#1f1f1f] tracking-[-0.035em]">{location}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#1f1f1f]/40">Availability</p>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full shrink-0 ${isAvailable ? "bg-green-500" : "bg-[#1f1f1f]/30"}`} />
              <p className="text-sm text-[#1f1f1f] tracking-[-0.035em]">{availabilityLabel}</p>
            </div>
          </div>

          {socialLinks.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#1f1f1f]/40">Follow</p>
              <div className="flex flex-col gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#1f1f1f] tracking-[-0.035em] w-fit border-b border-transparent hover:border-[#1f1f1f]/40 transition-colors duration-200"
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
