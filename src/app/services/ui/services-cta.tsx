"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PillButton from "@/app/ui/pill-button";
import { useContactModal } from "@/app/ui/contact-modal-context";

function Corner({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export default function ServicesCta() {
  const { openModal } = useContactModal();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        boxRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: boxRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#f3f3f3] px-4 py-12 md:px-8 md:py-[120px]">
      <div
        ref={boxRef}
        className="relative p-8 md:p-14 max-w-[860px] mx-auto"
        style={{ opacity: 0 }}
      >
        {/* Corner marks */}
        <Corner className="absolute top-0 left-0" />
        <Corner className="absolute top-0 right-0 rotate-90" />
        <Corner className="absolute bottom-0 left-0 -rotate-90" />
        <Corner className="absolute bottom-0 right-0 rotate-180" />

        <div className="flex flex-col gap-6 items-start">
          <p className="font-mono text-sm text-[#1f1f1f]/40 uppercase leading-[1.1]">
            [ Ready to start ]
          </p>
          <p className="font-light text-[#1f1f1f] text-[28px] md:text-[38px] tracking-[-0.05em] leading-[1.15] max-w-[620px]">
            Have a project in mind? Tell us what you&apos;re building — we&apos;ll tell you if we&apos;re the right fit.
          </p>
          <PillButton variant="dark" onClick={openModal}>Schedule a call</PillButton>
        </div>
      </div>
    </section>
  );
}
