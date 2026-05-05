'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Corner({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

const FALLBACK_BIO =
  'A creative director and photographer with 8+ years shaping brand identities and visual stories. Combining art direction with web design to build complete brand ecosystems — from concept to code.';

export default function BioSection({ bio }: { bio?: string }) {
  const desktopImgRef = useRef<HTMLImageElement>(null);
  const desktopTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (desktopImgRef.current) {
        gsap.fromTo(
          desktopImgRef.current,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            ease: 'none',
            scrollTrigger: {
              trigger: desktopImgRef.current,
              start: 'top 85%',
              end: 'top 20%',
              scrub: 1,
            },
          },
        );
      }

      if (desktopTextRef.current) {
        gsap.fromTo(
          desktopTextRef.current,
          { x: 0 },
          {
            x: -80,
            ease: 'none',
            scrollTrigger: {
              trigger: desktopTextRef.current,
              start: 'top 80%',
              end: 'bottom top',
              scrub: 1.5,
            },
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const text = bio || FALLBACK_BIO;

  return (
    <section id="bio" className="bg-[#fafafa] px-4 py-12 md:px-8 md:py-[80px]">

      {/* ── Desktop layout ─────────────────────────────────────────── */}
      <div className="hidden md:flex justify-between items-start">

        <p className="font-mono text-sm text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap shrink-0">
          [ About ]
        </p>

        <div className="flex gap-8 items-end flex-1 max-w-[71.4%]">

          <div ref={desktopTextRef} className="flex-1 flex gap-3 items-stretch min-w-[400px]">
            <div className="flex flex-col justify-between w-6 shrink-0">
              <Corner />
              <Corner className="rotate-[-90deg]" />
            </div>
            <div className="flex-1 flex items-center py-3">
              <p className="text-sm text-[#1f1f1f] tracking-[-0.035em] leading-[1.3]">
                {text}
              </p>
            </div>
            <div className="flex flex-col justify-between w-6 shrink-0 items-end">
              <Corner className="rotate-90" />
              <Corner className="rotate-180" />
            </div>
          </div>

          <div className="flex gap-6 items-start shrink-0">
            <p className="font-mono text-sm text-[#1f1f1f] leading-[1.1]">002</p>
            <div className="grid w-[30.3vw] shrink-0">
              <div className="[grid-area:1/1] bg-black" />
              <img
                ref={desktopImgRef}
                src="/about-guy-image.png"
                alt="Harvey Specter portrait"
                className="block w-full h-auto [grid-area:1/1]"
                style={{ clipPath: 'inset(0 100% 0 0)' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile layout ──────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 md:hidden">
        <p className="font-mono text-sm text-[#1f1f1f] leading-[1.1]">002</p>
        <p className="font-mono text-sm text-[#1f1f1f] uppercase leading-[1.1]">[ About ]</p>

        <div className="flex gap-3 items-stretch">
          <div className="flex flex-col justify-between w-6 shrink-0">
            <Corner />
            <Corner className="rotate-[-90deg]" />
          </div>
          <div className="flex-1 flex items-center py-3">
            <p className="text-sm text-[#1f1f1f] tracking-[-0.035em] leading-[1.3]">
              {text}
            </p>
          </div>
          <div className="flex flex-col justify-between w-6 shrink-0 items-end">
            <Corner className="rotate-90" />
            <Corner className="rotate-180" />
          </div>
        </div>
      </div>

    </section>
  );
}
