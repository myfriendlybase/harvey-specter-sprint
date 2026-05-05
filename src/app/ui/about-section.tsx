'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutSection() {
  const linesRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: linesRef.current[0],
          start: 'top 85%',
          end: 'bottom 30%',
          scrub: 1.2,
        },
      });

      linesRef.current.forEach((el) => {
        if (!el) return;
        tl.fromTo(
          el,
          { color: 'rgba(0,0,0,0.12)' },
          { color: 'rgba(0,0,0,1)', ease: 'none', duration: 1 },
          '>-0.4',
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const line = (i: number) => (el: HTMLElement | null) => {
    linesRef.current[i] = el;
  };

  return (
    <section id="about" className="bg-[#fafafa] px-4 py-12 md:px-8 md:py-[120px]">

      {/* [ 8+ YEARS IN INDUSTRY ] + hairline rule */}
      <div className="flex flex-col gap-3 items-end mb-6 md:mb-6">
        <p className="font-mono text-sm text-[#1f1f1f] uppercase leading-[1.1] text-right">
          [ 8+ years in industry ]
        </p>
        <hr className="w-full border-0 border-t border-black/20" />
      </div>

      <div className="flex flex-col gap-2 items-center md:items-start">

        {/* Line 1 */}
        <p className="font-mono text-sm text-[#1f1f1f] leading-[1.1] md:hidden">001</p>
        <div className="flex flex-col items-center md:flex-row md:items-start md:gap-3">
          <p
            ref={line(0)}
            className="font-light uppercase leading-[0.84] tracking-[-0.08em] md:whitespace-pre text-[32px] md:text-[6.67vw]"
            style={{ color: 'rgba(0,0,0,0.12)' }}
          >
            {`A creative director   /`}
          </p>
          <p className="hidden md:block font-mono text-sm text-[#1f1f1f] leading-[1.1] mt-1 shrink-0">
            001
          </p>
        </div>

        {/* Line 2 */}
        <p
          ref={line(1)}
          className="font-light uppercase leading-[0.84] tracking-[-0.08em] text-[32px] md:text-[6.67vw] md:pl-[14.86vw]"
          style={{ color: 'rgba(0,0,0,0.12)' }}
        >
          Photographer
        </p>

        {/* Line 3 */}
        <p
          ref={line(2)}
          className="font-light uppercase leading-[0.84] tracking-[-0.08em] text-[32px] md:text-[6.67vw] md:pl-[42.36vw]"
          style={{ color: 'rgba(0,0,0,0.12)' }}
        >
          Born{' '}
          <em className="font-playfair not-italic italic font-normal">{'&'}</em>
          {' '}raised
        </p>

        {/* Line 4 */}
        <p
          ref={line(3)}
          className="font-light uppercase leading-[0.84] tracking-[-0.08em] text-[32px] md:text-[6.67vw]"
          style={{ color: 'rgba(0,0,0,0.12)' }}
        >
          on the south side
        </p>

        {/* Line 5 */}
        <div className="flex flex-col items-center gap-3 md:flex-row md:items-baseline md:gap-4 md:pl-[42.08vw]">
          <p
            ref={line(4)}
            className="font-light uppercase leading-[0.84] tracking-[-0.08em] text-[32px] md:text-[6.67vw]"
            style={{ color: 'rgba(0,0,0,0.12)' }}
          >
            of chicago.
          </p>
          <p className="font-mono text-sm text-[#1f1f1f] leading-[1.1] whitespace-nowrap">
            [ creative freelancer ]
          </p>
        </div>

      </div>
    </section>
  );
}
