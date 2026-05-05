"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { urlFor } from "@/sanity/lib/image";

export interface ServiceData {
  _id: string;
  title: string;
  num: string;
  tag: string;
  description: string;
  deliverables: string[];
  image?: { asset: { _ref: string }; alt?: string };
}

const FALLBACK_IMAGES = [
  "/service-brand.jpg",
  "/service-web.jpg",
  "/service-marketing.jpg",
  "/service-photo.jpg",
];

function ServiceSection({ service, index }: { service: ServiceData; index: number }) {
  const metaRef  = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef  = useRef<HTMLDivElement>(null);
  const imgRef   = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const trigger = { start: "top 82%", toggleActions: "play none none none" };

    const ctx = gsap.context(() => {
      gsap.fromTo(metaRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: metaRef.current, ...trigger } }
      );
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 48, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: "power4.out", scrollTrigger: { trigger: titleRef.current, ...trigger } }
      );
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.1, scrollTrigger: { trigger: descRef.current, ...trigger } }
      );
      gsap.fromTo(imgRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out", delay: 0.15, scrollTrigger: { trigger: imgRef.current, ...trigger } }
      );
    });

    return () => ctx.revert();
  }, []);

  const imgSrc = service.image?.asset
    ? urlFor(service.image).width(840).url()
    : FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

  return (
    <section
      id={`service-${service.num}`}
      className="bg-[#fafafa] px-4 py-16 md:px-8 md:py-[100px] border-t border-black/10"
    >
      <div ref={metaRef} className="flex items-baseline gap-4 mb-6" style={{ opacity: 0 }}>
        <span className="font-mono text-[11px] text-[#1f1f1f]/40 uppercase tracking-[0.06em]">{service.num}</span>
        <span className="font-mono text-[11px] text-[#1f1f1f]/40 uppercase tracking-[0.06em]">{service.tag}</span>
      </div>

      <h2
        ref={titleRef}
        style={{ opacity: 0 }}
        className="font-bold italic text-[10vw] md:text-[5.5vw] uppercase tracking-[-0.04em] leading-[1] text-[#1f1f1f] mb-10 md:mb-14"
      >
        {service.title}
      </h2>

      <div className="grid md:grid-cols-[1fr_420px] gap-10 md:gap-16 items-start">
        <div ref={descRef} className="flex flex-col gap-8" style={{ opacity: 0 }}>
          <p className="text-base text-[#1f1f1f]/70 tracking-[-0.035em] leading-[1.7] max-w-[480px]">
            {service.description}
          </p>
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[11px] text-[#1f1f1f]/40 uppercase tracking-[0.04em]">Deliverables</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-[#1f1f1f] tracking-[-0.035em] leading-[1.5]">
                  <span className="mt-[7px] w-1 h-1 rounded-full bg-[#1f1f1f]/30 shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <img
          ref={imgRef}
          src={imgSrc}
          alt={service.image?.alt ?? service.title}
          style={{ opacity: 0 }}
          className="w-full aspect-[4/3] object-cover"
        />
      </div>
    </section>
  );
}

export default function ServicesList({ services }: { services: ServiceData[] }) {
  if (!services.length) return null;

  return (
    <>
      <div className="bg-[#fafafa] px-4 pt-12 pb-10 md:px-8 md:pt-[80px] md:pb-16 flex justify-end">
        <p className="font-mono text-sm text-[#1f1f1f] uppercase leading-[1.1]">[ What we do ]</p>
      </div>
      {services.map((service, i) => (
        <ServiceSection key={service._id} service={service} index={i} />
      ))}
    </>
  );
}
