'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function PhotoBreak() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!imgRef.current) return;
      gsap.fromTo(
        imgRef.current,
        { filter: 'blur(14px)' },
        {
          filter: 'blur(0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: imgRef.current,
            start: 'top 80%',
            end: 'center 75%',
            scrub: 1.5,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div data-nav-theme="dark" className="bg-[#fafafa] w-full overflow-hidden aspect-[375/565] md:aspect-[1440/900]">
      <img
        ref={imgRef}
        src="/photographer.jpg"
        alt=""
        className="w-full h-full object-cover object-center"
        style={{ filter: 'blur(14px)', transform: 'scale(1.05)' }}
      />
    </div>
  );
}
