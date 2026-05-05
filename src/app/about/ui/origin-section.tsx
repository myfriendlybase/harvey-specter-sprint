'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface MilestoneData {
  _id: string;
  year: string;
  heading: string;
  body: string;
}

export default function OriginSection({ milestones }: { milestones: MilestoneData[] }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            ease: 'none',
            scrollTrigger: {
              trigger: imgRef.current,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1,
            },
          },
        );
      }

      rowsRef.current.filter(Boolean).forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 28, filter: 'blur(4px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 88%', toggleActions: 'play none none none' },
          },
        );
      });
    });

    return () => ctx.revert();
  }, [milestones]);

  if (!milestones.length) return null;

  return (
    <section className="bg-[#fafafa] px-4 py-12 md:px-8 md:py-[120px]">

      <div className="flex flex-col gap-3 items-end mb-10 md:mb-16">
        <p className="font-mono text-sm text-[#1f1f1f] uppercase leading-[1.1] text-right">[ The story ]</p>
        <hr className="w-full border-0 border-t border-black/20" />
      </div>

      {/* ── Desktop ─────────────────────────────────────────── */}
      <div className="hidden md:grid grid-cols-[1fr_30.3vw] gap-16 items-start">
        <div className="flex flex-col divide-y divide-black/10">
          {milestones.map(({ _id, year, heading, body }, i) => (
            <div
              key={_id}
              ref={(el) => { rowsRef.current[i] = el; }}
              className="flex gap-8 py-10 group"
              style={{ opacity: 0 }}
            >
              <p className="font-mono text-sm text-[#1f1f1f]/40 leading-[1.1] w-10 shrink-0 pt-[3px]">{year}</p>
              <div className="flex flex-col gap-3">
                <p className="font-bold italic text-[22px] text-[#1f1f1f] uppercase tracking-[-0.04em] leading-[1.1] transition-transform duration-300 ease-out group-hover:translate-x-1">
                  {heading}
                </p>
                <p className="text-sm text-[#1f1f1f]/70 tracking-[-0.035em] leading-[1.5] max-w-[420px]">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="sticky top-[88px] self-start grid">
          <div className="[grid-area:1/1] bg-black aspect-[422/594]" />
          <img
            ref={imgRef}
            src="/about-guy-image.png"
            alt="Harvey Specter"
            className="block w-full h-auto [grid-area:1/1]"
            style={{ clipPath: 'inset(0 100% 0 0)' }}
          />
        </div>
      </div>

      {/* ── Mobile ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-8 md:hidden">
        <div className="grid w-full aspect-[422/594]">
          <div className="[grid-area:1/1] bg-black" />
          <img src="/about-guy-image.png" alt="Harvey Specter" className="block w-full h-full object-cover [grid-area:1/1]" />
        </div>
        <div className="flex flex-col divide-y divide-black/10">
          {milestones.map(({ _id, year, heading, body }, i) => (
            <div
              key={_id}
              ref={(el) => { rowsRef.current[i + milestones.length] = el; }}
              className="flex gap-5 py-7"
              style={{ opacity: 0 }}
            >
              <p className="font-mono text-sm text-[#1f1f1f]/40 leading-[1.1] w-9 shrink-0 pt-[3px]">{year}</p>
              <div className="flex flex-col gap-2">
                <p className="font-bold italic text-[18px] text-[#1f1f1f] uppercase tracking-[-0.04em] leading-[1.1]">{heading}</p>
                <p className="text-sm text-[#1f1f1f]/70 tracking-[-0.035em] leading-[1.5]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
