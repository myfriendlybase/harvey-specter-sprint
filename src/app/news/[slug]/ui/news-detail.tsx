"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

interface Block {
  _type: string;
  _key: string;
  [key: string]: unknown;
}

export interface PostPreview {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  category?: string;
  excerpt?: string;
  coverImage?: { asset: { _ref: string }; alt?: string };
}

export interface NewsDetailData {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  category?: string;
  excerpt?: string;
  coverImage?: { asset: { _ref: string }; alt?: string };
  body?: Block[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[17px] md:text-[19px] text-[#1f1f1f] tracking-[-0.035em] leading-[1.7] font-light">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-black italic text-[#1f1f1f] uppercase tracking-[-0.04em] leading-[1.05] text-[26px] md:text-[32px] pt-8">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-bold text-[#1f1f1f] tracking-[-0.03em] leading-[1.15] text-[20px] md:text-[24px] pt-6">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#1f1f1f]/20 pl-6 text-[#1f1f1f]/60 italic text-[18px] md:text-[22px] tracking-[-0.035em] leading-[1.55]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-5 flex flex-col gap-2 text-[17px] md:text-[19px] text-[#1f1f1f] tracking-[-0.035em] leading-[1.7] font-light">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-5 flex flex-col gap-2 text-[17px] md:text-[19px] text-[#1f1f1f] tracking-[-0.035em] leading-[1.7] font-light">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 decoration-[#1f1f1f]/30 hover:decoration-[#1f1f1f] transition-all duration-200"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const src = value?.asset ? urlFor(value).width(1600).url() : null;
      if (!src) return null;
      return (
        <figure className="my-4 -mx-4 md:-mx-0">
          <img
            src={src}
            alt={value?.alt ?? ""}
            className="w-full object-cover"
          />
          {value?.alt && (
            <figcaption className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.06em] text-[#1f1f1f]/40 px-4 md:px-0">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

function MoreCard({ post }: { post: PostPreview }) {
  const imgSrc = post.coverImage?.asset
    ? urlFor(post.coverImage).width(800).url()
    : null;

  return (
    <a
      href={`/news/${post.slug.current}`}
      className="group flex flex-col gap-4 cursor-pointer"
    >
      <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#e0e0e0]">
        {imgSrc && (
          <img
            src={imgSrc}
            alt={post.coverImage?.alt ?? post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
        {post.category && (
          <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.06em] text-white bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
            {post.category}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[11px] text-[#1f1f1f]/40 uppercase tracking-[0.06em]">
          {formatDate(post.publishedAt)}
        </p>
        <h3 className="font-bold italic text-[18px] md:text-[20px] text-[#1f1f1f] uppercase tracking-[-0.04em] leading-[1.1] transition-transform duration-300 ease-out group-hover:translate-x-1">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-[#1f1f1f]/60 tracking-[-0.035em] leading-[1.6] line-clamp-2">
            {post.excerpt}
          </p>
        )}
      </div>
    </a>
  );
}

export default function NewsDetail({ post, morePosts }: { post: NewsDetailData; morePosts: PostPreview[] }) {
  const coverSrc = post.coverImage?.asset
    ? urlFor(post.coverImage).width(2000).url()
    : null;

  return (
    <article>
      {/* Hero */}
      <div
        data-nav-theme="dark"
        className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-[#111]"
      >
        {coverSrc && (
          <img
            src={coverSrc}
            alt={post.coverImage?.alt ?? post.title}
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

        <a
          href="/news"
          className="absolute top-24 left-4 md:left-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 font-mono text-[11px] uppercase tracking-[0.06em]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All News
        </a>

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 md:px-8 md:pb-12 flex flex-col gap-4 max-w-4xl">
          {post.category && (
            <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-white/60 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full w-fit">
              {post.category}
            </span>
          )}
          <h1 className="font-black italic text-white uppercase leading-[0.88] tracking-[-0.04em] text-[36px] md:text-[6vw]">
            {post.title}
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-white/50">
            {formatDate(post.publishedAt)}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="bg-[#f3f3f3] px-4 py-14 md:px-8 md:py-20">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          {post.excerpt && !post.body?.length && (
            <p className="text-[18px] md:text-[22px] text-[#1f1f1f] tracking-[-0.04em] leading-[1.55] font-light">
              {post.excerpt}
            </p>
          )}
          {post.body && post.body.length > 0 && (
            <PortableText value={post.body} components={components} />
          )}
          {!post.body?.length && !post.excerpt && (
            <p className="font-mono text-sm text-[#1f1f1f]/40 uppercase">Content coming soon.</p>
          )}
        </div>
      </div>

      {/* More News */}
      {morePosts.length > 0 && (
        <div className="bg-[#ebebeb] px-4 py-14 md:px-8 md:py-20 flex flex-col gap-10">
          <div className="flex items-center justify-between border-b border-black/10 pb-6">
            <p className="font-mono text-sm text-[#1f1f1f] uppercase tracking-[0.06em]">[ More News ]</p>
            <a
              href="/news"
              className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#1f1f1f]/50 hover:text-[#1f1f1f] transition-colors duration-200"
            >
              All articles →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {morePosts.map((p) => (
              <MoreCard key={p._id} post={p} />
            ))}
          </div>
        </div>
      )}

      {/* Bottom nav */}
      <div className="bg-[#f3f3f3] px-4 py-14 md:px-8 md:py-20 border-t border-black/10 flex items-center justify-between">
        <a
          href="/news"
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[#1f1f1f]/50 hover:text-[#1f1f1f] transition-colors duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to News
        </a>
        <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#1f1f1f]/30">H.Studio</p>
      </div>
    </article>
  );
}
