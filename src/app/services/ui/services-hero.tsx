"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const services = ["Brand Discovery", "Web Design & Dev", "Marketing", "Photography"];

export default function ServicesHero() {
  const imgRef = useRef<HTMLImageElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image scale-in on load
      gsap.fromTo(
        imgRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 1.6, ease: "power3.out" }
      );

      // Top bar fade down
      gsap.fromTo(
        topBarRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.3 }
      );

      // Bottom content fade up
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.5 }
      );

      // Service names stagger in
      gsap.fromTo(
        itemRefs.current.filter(Boolean),
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.7,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      data-nav-theme="dark"
      className="relative h-screen flex flex-col overflow-hidden"
    >
      {/* Full-bleed image */}
      <img
        ref={imgRef}
        src="/photographer.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay — heavier at top and bottom */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/50" />

      {/* Top bar */}
      <div
        ref={topBarRef}
        className="relative z-10 flex items-center justify-between px-4 md:px-8 pt-20"
        style={{ opacity: 0 }}
      >
        <p className="font-mono text-sm text-white/60 uppercase leading-[1.1]">
          [ Harvey Specter ]
        </p>
        <p className="font-mono text-sm text-white/60 uppercase leading-[1.1]">
          [ Services ]
        </p>
      </div>

      {/* Bottom content */}
      <div
        ref={bottomRef}
        className="relative z-10 mt-auto px-4 md:px-8 pb-10 md:pb-14 flex flex-col gap-6 md:gap-8"
        style={{ opacity: 0 }}
      >
        {/* Statement */}
        <h1 className="font-light text-white uppercase leading-[0.86] tracking-[-0.06em] text-[11vw] md:text-[6.5vw] max-w-[80%]">
          Four disciplines.<br />
          <em className="font-playfair italic">One studio.</em>
        </h1>

        {/* Divider */}
        <hr className="border-0 border-t border-white/20" />

        {/* Service names row */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-0">
          {services.map((s, i) => (
            <span key={s} className="flex items-center">
              <span
                ref={(el) => { itemRefs.current[i] = el; }}
                className="font-mono text-sm text-white/70 uppercase tracking-[0.04em] leading-[1.1]"
                style={{ opacity: 0 }}
              >
                {s}
              </span>
              {i < services.length - 1 && (
                <span className="hidden md:block mx-6 text-white/20">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
