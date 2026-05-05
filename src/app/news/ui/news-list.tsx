"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { urlFor } from "@/sanity/lib/image";

export interface PostData {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  category?: string;
  excerpt?: string;
  coverImage?: { asset: { _ref: string }; alt?: string };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function ArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M4 14L14 4M14 4H7M14 4V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PostCard({ post, index }: { post: PostData; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 87%", toggleActions: "play none none none" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const imgSrc = post.coverImage?.asset
    ? urlFor(post.coverImage).width(900).url()
    : null;

  return (
    <article ref={ref} style={{ opacity: 0 }} className="group flex flex-col gap-4 cursor-pointer">
      <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#e8e8e8]">
        {imgSrc && (
          <img
            src={imgSrc}
            alt={post.coverImage?.alt ?? post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
        {post.category && (
          <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.06em] text-white bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
            {post.category}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-mono text-[11px] text-[#1f1f1f]/40 uppercase tracking-[0.06em]">
          {formatDate(post.publishedAt)}
        </p>
        <h2 className="font-bold italic text-[20px] md:text-[22px] text-[#1f1f1f] uppercase tracking-[-0.04em] leading-[1.1] transition-transform duration-300 ease-out group-hover:translate-x-1">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-[#1f1f1f]/60 tracking-[-0.035em] leading-[1.6]">
            {post.excerpt}
          </p>
        )}
        <a
          href={`/news/${post.slug.current}`}
          className="flex gap-2 items-center text-[#1f1f1f] border-b border-[#1f1f1f]/30 pb-1 w-fit transition-all duration-200 hover:border-[#1f1f1f] hover:gap-3"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.06em]">Read more</span>
          <ArrowUpRight />
        </a>
      </div>
    </article>
  );
}

export default function NewsList({ posts }: { posts: PostData[] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const headerRef = useRef<HTMLDivElement>(null);

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean) as string[]))];

  const filtered = activeFilter === "All"
    ? posts
    : posts.filter((p) => p.category === activeFilter);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#f3f3f3] px-4 py-16 md:px-8 md:py-[100px] flex flex-col gap-10 md:gap-14">
      <div ref={headerRef} style={{ opacity: 0 }} className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-black/10 pb-6">
          <p className="font-mono text-sm text-[#1f1f1f] uppercase leading-[1.1]">[ news ]</p>
          <p className="font-mono text-sm text-[#1f1f1f]/40 uppercase leading-[1.1]">
            {String(filtered.length).padStart(3, "0")} articles
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => {
            const active = cat === activeFilter;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`font-mono text-[11px] uppercase tracking-[0.06em] px-3 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-[#1f1f1f] text-white border-[#1f1f1f]"
                    : "bg-transparent text-[#1f1f1f]/50 border-[#1f1f1f]/20 hover:border-[#1f1f1f]/50 hover:text-[#1f1f1f]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14 md:gap-y-16">
          {filtered.map((post, i) => (
            <PostCard key={post._id} post={post} index={i} />
          ))}
        </div>
      ) : (
        <p className="font-mono text-sm text-[#1f1f1f]/40 uppercase">No posts yet — check back soon.</p>
      )}
    </section>
  );
}
