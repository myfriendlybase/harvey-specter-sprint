'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PillButton from './pill-button';
import { useContactModal } from './contact-modal-context';

export default function HeroSection() {
  const { openModal } = useContactModal();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const helloRef = useRef<HTMLParagraphElement>(null);
  const harveyRef = useRef<HTMLSpanElement>(null);
  const specterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
        .to(
          [helloRef.current, harveyRef.current],
          { x: () => -window.innerWidth * 0.5, ease: 'none' },
          0,
        )
        .to(
          specterRef.current,
          { x: () => window.innerWidth * 0.5, ease: 'none' },
          0,
        )
        .to(bgRef.current, { scale: 1.5, y: '+25%', ease: 'none' }, 0);
    });

    return () => ctx.revert();
  }, []);

  return (
    /*
     * No overflow-hidden on the section — the text must be able to slide
     * beyond the section edges. The bg wrapper gets its own overflow-hidden
     * so the scale doesn't bleed out.
     */
    <section ref={sectionRef} className="h-screen relative flex flex-col bg-[#fafafa]">

      {/* Background image — clipped inside its own wrapper */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          ref={bgRef}
          src="/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover object-[47%_top] md:object-[center_top] origin-center will-change-transform"
        />
      </div>

      {/* Frosted-glass overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[349px] backdrop-blur-[10px] bg-[rgba(217,217,217,0.01)] pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_35%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_35%)]" />

      {/* Hero text */}
      <div className="relative flex-1">
        <div className="
          absolute left-0 right-0 px-4 pb-[24px]
          top-[calc(100%_-_341px)] h-[341px] flex flex-col justify-end gap-[32px]
          md:top-[30%] md:h-auto md:pb-8 md:px-8 md:justify-start md:gap-8
        ">

          {/* [ Hello I'm ] + Harvey Specter */}
          <div className="flex flex-col items-center w-full md:items-start">
            <div className="flex items-center justify-center px-[18px] w-full md:px-0 md:justify-start">
              <p
                ref={helloRef}
                className="font-mono text-sm text-white uppercase mix-blend-overlay leading-[1.1] whitespace-nowrap will-change-transform"
              >
                [ Hello i&apos;m ]
              </p>
            </div>
            <h1 className="
              font-medium capitalize text-white text-center mix-blend-overlay w-full
              text-[96px] tracking-[-6.72px] leading-[0.8]
              md:text-[13.75vw] md:tracking-[-0.07em] md:leading-[1.1] md:whitespace-nowrap
            ">
              {/* inline-block so GSAP x transform works reliably */}
              <span
                ref={harveyRef}
                className="block md:inline-block will-change-transform"
              >
                Harvey
              </span>
              <span className="hidden md:inline-block">&nbsp;&nbsp;&nbsp;</span>
              <span
                ref={specterRef}
                className="block md:inline-block will-change-transform"
              >
                Specter
              </span>
            </h1>
          </div>

          {/* Description + CTA */}
          <div className="flex flex-col gap-[17px] items-center w-full max-w-[293px] mx-auto md:mx-0 md:items-start md:max-w-none md:w-[293px] md:self-end">
            <p className="font-bold italic text-sm text-[#1f1f1f] uppercase tracking-[-0.035em] leading-[1.1] text-center md:text-left">
              <span>H.Studio is a </span>
              <span className="font-normal not-italic">full-service</span>
              <span> creative studio creating beautiful digital experiences and products. We are an </span>
              <span className="font-normal not-italic">award winning</span>
              <span> design and art group specializing in branding, web design and engineering.</span>
            </p>
            <PillButton variant="dark" onClick={openModal}>Let&apos;s talk</PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
