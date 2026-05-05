'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { urlFor } from '@/sanity/lib/image';

export interface TestimonialData {
  _id: string;
  logo?: { asset: { _ref: string }; alt?: string };
  quote: string;
  author: string;
  rotation: string;
}

const DESKTOP_POSITIONS = [
  { left: '7%',    top: '110px' },
  { left: '47%',   top: '200px' },
  { left: '21%',   top: '553px' },
  { left: '68.5%', top: '546px' },
];

function TestimonialCard({ t }: { t: TestimonialData }) {
  return (
    <div className={`flex-none ${t.rotation}`}>
      <div className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 items-start w-[353px] md:w-[353px]">
        {t.logo?.asset && (
          <div className="relative h-8 w-[140px]">
            <img
              alt={t.logo.alt ?? ''}
              className="absolute inset-0 w-full h-full object-contain object-left"
              src={urlFor(t.logo).height(64).url()}
            />
          </div>
        )}
        <p className="font-normal text-[#1f1f1f] text-[18px] tracking-[-0.72px] leading-[1.3]">
          {t.quote}
        </p>
        <p className="font-black text-black text-[16px] tracking-[-0.64px] leading-[1.1] uppercase">
          {t.author}
        </p>
      </div>
    </div>
  );
}

export default function TestimonialsSection({ testimonials }: { testimonials: TestimonialData[] }) {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLParagraphElement>(null);
  const cardsRef    = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, scale: 1.06 },
          {
            opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 95%', toggleActions: 'restart none none reset' },
          },
        );
      }

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.9 + i * 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 95%', toggleActions: 'restart none none reset' },
          },
        );
      });
    });

    return () => ctx.revert();
  }, [testimonials]);

  if (!testimonials.length) return null;

  return (
    <section id="testimonials" ref={sectionRef} className="bg-[#fafafa]">

      {/* ── Desktop ─────────────────────────────────────────── */}
      <div className="hidden md:block relative min-h-[900px] px-8 py-[120px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <p
            ref={headingRef}
            className="font-medium capitalize text-black text-center text-[13.75vw] tracking-[-0.07em] leading-[1.1] whitespace-nowrap"
            style={{ opacity: 0 }}
          >
            Testimonials
          </p>
        </div>

        {testimonials.slice(0, 4).map((t, i) => (
          <div
            key={t._id}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="absolute flex items-center justify-center"
            style={{ left: DESKTOP_POSITIONS[i]?.left ?? '10%', top: DESKTOP_POSITIONS[i]?.top ?? '200px', opacity: 0 }}
          >
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>

      {/* ── Mobile ──────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col gap-8 px-4 py-16">
        <p className="font-medium capitalize text-black text-[64px] tracking-[-4.48px] leading-[0.8] text-center">
          Testimonials
        </p>
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4 py-10 -my-10">
          <div className="flex gap-4 w-max">
            {testimonials.map((t) => (
              <div key={t._id} className={`flex-none ${t.rotation}`}>
                <div className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 items-start w-[260px]">
                  {t.logo?.asset && (
                    <div className="relative h-8 w-[140px]">
                      <img alt={t.logo.alt ?? ''} className="absolute inset-0 w-full h-full object-contain object-left" src={urlFor(t.logo).height(64).url()} />
                    </div>
                  )}
                  <p className="font-normal text-[#1f1f1f] text-[18px] tracking-[-0.72px] leading-[1.3]">{t.quote}</p>
                  <p className="font-black text-black text-[16px] tracking-[-0.64px] leading-[1.1] uppercase">{t.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
