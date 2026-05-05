"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    num: "01",
    title: "Discovery",
    body: "We start by listening. A deep-dive into your goals, audience, and competitive landscape. No assumptions, no templates — just honest questions and sharp observations.",
  },
  {
    num: "02",
    title: "Strategy",
    body: "Before anything is designed, we align on direction. Positioning, tone, visual reference, success criteria. The brief becomes a shared contract between studio and client.",
  },
  {
    num: "03",
    title: "Create",
    body: "This is where craft comes in. We design, build, and refine in focused sprints — sharing work early, iterating fast, and maintaining a high bar at every stage.",
  },
  {
    num: "04",
    title: "Launch",
    body: "Handoff is never an afterthought. We deliver polished assets, documentation, and a launch plan. For ongoing clients, we stay in the room.",
  },
];

export default function ProcessSection() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      rowRefs.current.filter(Boolean).forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section data-nav-theme="dark" className="bg-black px-4 py-12 md:px-8 md:py-[120px]">

      {/* Section label */}
      <div className="flex flex-col gap-3 items-end mb-10 md:mb-16">
        <p className="font-mono text-sm text-white/40 uppercase leading-[1.1] text-right">
          [ How we work ]
        </p>
        <hr className="w-full border-0 border-t border-white/20" />
      </div>

      {/* Large heading */}
      <h2 className="font-light text-white uppercase leading-[0.86] tracking-[-0.07em] text-[11vw] md:text-[7vw] mb-14 md:mb-20">
        The process
      </h2>

      <div className="grid md:grid-cols-4 gap-px bg-white/10">
        {steps.map(({ num, title, body }, i) => (
          <div
            key={num}
            ref={(el) => { rowRefs.current[i] = el; }}
            className="bg-black p-8 flex flex-col gap-6"
            style={{ opacity: 0 }}
          >
            <p className="font-mono text-sm text-white/40 leading-[1.1]">{num}</p>
            <p className="font-bold italic text-[22px] text-white uppercase tracking-[-0.04em] leading-[1.1]">
              {title}
            </p>
            <p className="text-sm text-white/50 tracking-[-0.035em] leading-[1.6] mt-auto">
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
