'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface StatData {
  value: number;
  suffix: string;
  label: string;
}

const FALLBACK_STATS: StatData[] = [
  { value: 8,   suffix: '+', label: 'Years of craft' },
  { value: 120, suffix: '+', label: 'Projects delivered' },
  { value: 40,  suffix: '+', label: 'Brand identities' },
  { value: 4,   suffix: '',  label: 'Continents reached' },
];

export default function StatsSection({ stats }: { stats?: StatData[] }) {
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const data = (stats && stats.length > 0) ? stats : FALLBACK_STATS;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      numRefs.current.forEach((el, i) => {
        if (!el) return;
        const { value, suffix } = data[i] ?? {};
        if (value == null) return;
        const obj = { val: 0 };

        gsap.fromTo(
          obj,
          { val: 0 },
          {
            val: value,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
            onUpdate() { el.textContent = Math.round(obj.val) + (suffix ?? ''); },
          },
        );

        gsap.fromTo(
          el.closest('.stat-item'),
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.8, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
          },
        );
      });
    });

    return () => ctx.revert();
  }, [data]);

  return (
    <section ref={sectionRef} data-nav-theme="dark" className="bg-black px-4 py-12 md:px-8 md:py-[80px]">
      <div className="flex flex-col gap-3 items-end mb-10 md:mb-16">
        <p className="font-mono text-sm text-white/40 uppercase leading-[1.1] text-right">[ by the numbers ]</p>
        <hr className="w-full border-0 border-t border-white/20" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 md:gap-8">
        {data.map(({ suffix, label }, i) => (
          <div key={label} className="stat-item flex flex-col gap-3" style={{ opacity: 0 }}>
            <p
              className="font-medium text-white leading-[0.8] tracking-[-0.07em]"
              style={{ fontSize: 'clamp(56px, 9vw, 120px)' }}
            >
              <span ref={(el) => { numRefs.current[i] = el; }}>0{suffix}</span>
            </p>
            <p className="font-mono text-sm text-white/40 uppercase leading-[1.1]">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
