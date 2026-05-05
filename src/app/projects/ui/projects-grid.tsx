"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { urlFor } from "@/sanity/lib/image";

interface PortfolioItem {
  _id: string;
  title: string;
  slug: { current: string };
  image?: { asset: { _ref: string }; alt?: string };
  tags: string[];
  tall: boolean;
}

const FALLBACK_IMAGES: Record<string, string> = {
  "surfers-paradise":   "/work-surfers.jpg",
  "cyberpunk-caffe":    "/work-cyberpunk.jpg",
  "agency-976":         "/work-agency.jpg",
  "minimal-playground": "/work-minimal.jpg",
};

function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {items.map((tag) => (
        <span
          key={tag}
          className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#1f1f1f]/50 border border-[#1f1f1f]/20 px-2 py-1 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function ProjectCard({ item, index }: { item: PortfolioItem; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const imgSrc = item.image?.asset
    ? urlFor(item.image).width(1200).url()
    : FALLBACK_IMAGES[item.slug.current] ?? "/work-surfers.jpg";

  const num = String(index + 1).padStart(2, "0");

  return (
    <a href={`/projects/${item.slug.current}`} ref={cardRef} style={{ opacity: 0 }} className="group cursor-pointer flex flex-col gap-4">
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#e8e8e8]">
        <img
          src={imgSrc}
          alt={item.image?.alt ?? item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 font-mono text-[11px] text-white/70 uppercase tracking-[0.06em] leading-[1.1]">
          {num}
        </span>
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <p className="font-bold italic text-[22px] md:text-[28px] text-[#1f1f1f] uppercase tracking-[-0.04em] leading-[1.1] transition-transform duration-300 ease-out group-hover:translate-x-1">
            {item.title}
          </p>
          <div className="shrink-0 mt-1 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
            <img src="/arrow.svg" width={24} height={24} alt="" aria-hidden />
          </div>
        </div>
        <Tags items={item.tags} />
      </div>
    </a>
  );
}

export default function ProjectsGrid({ projects }: { projects: PortfolioItem[] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const headerRef = useRef<HTMLDivElement>(null);

  // Collect unique tags across all projects
  const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.tags.includes(activeFilter));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#fafafa] px-4 py-16 md:px-8 md:py-[100px] flex flex-col gap-10 md:gap-14">

      {/* Header */}
      <div
        ref={headerRef}
        style={{ opacity: 0 }}
        className="flex flex-col gap-6"
      >
        <div className="flex items-center justify-between border-b border-black/10 pb-6">
          <p className="font-mono text-sm text-[#1f1f1f] uppercase leading-[1.1]">[ portfolio ]</p>
          <p className="font-mono text-sm text-[#1f1f1f]/40 uppercase leading-[1.1]">
            {String(filtered.length).padStart(3, "0")} projects
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap">
          {allTags.map((tag) => {
            const active = tag === activeFilter;
            return (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`font-mono text-[11px] uppercase tracking-[0.06em] px-3 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-[#1f1f1f] text-white border-[#1f1f1f]"
                    : "bg-transparent text-[#1f1f1f]/50 border-[#1f1f1f]/20 hover:border-[#1f1f1f]/50 hover:text-[#1f1f1f]"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-20">
        {filtered.map((item, i) => (
          <ProjectCard key={item._id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
