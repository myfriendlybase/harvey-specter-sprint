"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const LINES = ["Making the", "ordinary", "remarkable."];

function SplitLine({ text, lettersRef, offset }: {
  text: string;
  lettersRef: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  offset: number;
}) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => { lettersRef.current[offset + i] = el; }}
          style={{ color: "rgba(0,0,0,0)", display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </>
  );
}

export default function StatementHero() {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  const line0Len = LINES[0].length;
  const line1Len = LINES[1].length;

  useEffect(() => {
    const letters = lettersRef.current.filter(Boolean);
    if (!letters.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        letters,
        { color: "rgba(0,0,0,0)", y: 10, filter: "blur(6px)" },
        {
          color: "rgba(0,0,0,1)",
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.04,
          ease: "power3.out",
          delay: 0.4,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      data-nav-theme="light"
      className="bg-white min-h-screen flex flex-col px-4 py-6 md:px-8"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between pt-16 md:pt-20">
        <p className="font-mono text-sm text-black/40 uppercase leading-[1.1]">
          [ Harvey Specter ]
        </p>
        <p className="font-mono text-sm text-black/40 uppercase leading-[1.1]">
          [ About ]
        </p>
      </div>

      {/* Manifesto text — staircase layout */}
      <div className="flex-1 flex flex-col justify-center py-12 md:py-20">
        <p className="font-light uppercase leading-[0.84] tracking-[-0.06em] text-[10vw] md:text-[10.5vw]">
          <SplitLine text={LINES[0]} lettersRef={lettersRef} offset={0} />
        </p>
        <p className="font-light uppercase leading-[0.84] tracking-[-0.06em] text-[10vw] md:text-[10.5vw] pl-[8vw] md:pl-[12vw]">
          <SplitLine text={LINES[1]} lettersRef={lettersRef} offset={line0Len} />
        </p>
        <p className="font-bold italic uppercase leading-[0.84] tracking-[-0.06em] text-[10vw] md:text-[10.5vw] pl-[16vw] md:pl-[24vw] font-playfair not-italic">
          <em className="font-playfair italic">
            <SplitLine text={LINES[2]} lettersRef={lettersRef} offset={line0Len + line1Len} />
          </em>
        </p>
      </div>

      {/* Full-bleed image strip — negative margin to break out of section padding */}
      <div className="relative -mx-4 md:-mx-8 h-[40vh] md:h-[50vh] overflow-hidden mb-6">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          className="object-cover object-[center_30%]"
          priority
        />
      </div>

      {/* Bottom bar */}
      <div className="flex items-end justify-between pb-4">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-sm text-black/40 uppercase leading-[1.1]">Est. 2017</p>
          <p className="font-mono text-sm text-black/40 uppercase leading-[1.1]">Chicago, IL</p>
        </div>
        <p className="font-mono text-sm text-black/40 uppercase leading-[1.1] text-right">
          Creative Director<br />& Photographer
        </p>
      </div>
    </section>
  );
}
