"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ProjectsHero() {
  const imgRef     = useRef<HTMLImageElement>(null);
  const topBarRef  = useRef<HTMLDivElement>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const countRef   = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 1.6, ease: "power3.out" }
      );
      gsap.fromTo(topBarRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(bottomRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
      );
      gsap.fromTo(countRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: "power2.out", delay: 1 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section data-nav-theme="dark" className="relative h-screen flex flex-col overflow-hidden">
      {/* Full-bleed image */}
      <img
        ref={imgRef}
        src="/work-surfers.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/50" />

      {/* Top bar */}
      <div
        ref={topBarRef}
        className="relative z-10 flex items-center justify-between px-4 md:px-8 pt-20"
        style={{ opacity: 0 }}
      >
        <p className="font-mono text-sm text-white/60 uppercase leading-[1.1]">[ Harvey Specter ]</p>
        <p className="font-mono text-sm text-white/60 uppercase leading-[1.1]">[ Projects ]</p>
      </div>

      {/* Bottom content */}
      <div
        ref={bottomRef}
        className="relative z-10 mt-auto px-4 md:px-8 pb-10 md:pb-14 flex flex-col gap-4 md:gap-6"
        style={{ opacity: 0 }}
      >
        <hr className="border-0 border-t border-white/20" />
        <div className="flex items-end justify-between">
          <h1 className="font-light text-white uppercase leading-[0.86] tracking-[-0.06em] text-[14vw] md:text-[7vw]">
            Selected<br />
            <em className="font-playfair italic">Work.</em>
          </h1>
          <span
            ref={countRef}
            className="font-mono text-sm text-white/50 uppercase leading-[1.1] pb-2"
            style={{ opacity: 0 }}
          >
            004 projects
          </span>
        </div>
      </div>
    </section>
  );
}
