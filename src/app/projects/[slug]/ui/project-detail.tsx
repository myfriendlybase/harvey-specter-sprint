"use client";

import { urlFor } from "@/sanity/lib/image";

interface GalleryImage {
  asset: { _ref: string };
  alt?: string;
}

export interface ProjectPreview {
  _id: string;
  title: string;
  slug: { current: string };
  tags: string[];
  image?: { asset: { _ref: string }; alt?: string };
}

export interface ProjectDetailData {
  _id: string;
  title: string;
  slug: { current: string };
  subtitle?: string;
  description?: string;
  client?: string;
  year?: string;
  link?: string;
  tags: string[];
  image?: { asset: { _ref: string }; alt?: string };
  gallery?: GalleryImage[];
}

const FALLBACK_IMAGES: Record<string, string> = {
  "surfers-paradise": "/work-surfers.jpg",
  "cyberpunk-caffe": "/work-cyberpunk.jpg",
  "agency-976": "/work-agency.jpg",
  "minimal-playground": "/work-minimal.jpg",
};

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M4 14L14 4M14 4H7M14 4V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProjectDetail({ project, moreProjects }: { project: ProjectDetailData; moreProjects: ProjectPreview[] }) {
  const coverSrc = project.image?.asset
    ? urlFor(project.image).width(2400).url()
    : FALLBACK_IMAGES[project.slug.current] ?? "/work-surfers.jpg";

  return (
    <article className="bg-[#111] min-h-screen text-white">

      {/* Full-bleed cover */}
      <div className="w-full h-[55vh] md:h-[75vh] overflow-hidden">
        <img
          src={coverSrc}
          alt={project.image?.alt ?? project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title block */}
      <div className="px-4 pt-10 pb-8 md:px-8 md:pt-16 md:pb-12 border-b border-white/10">
        <a
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-white/40 hover:text-white transition-colors duration-200 mb-6"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All Projects
        </a>
        <h1 className="font-black italic text-white uppercase leading-[0.88] tracking-[-0.04em] text-[48px] md:text-[8vw] max-w-5xl">
          {project.title}
        </h1>
        {project.subtitle && (
          <p className="mt-4 text-white/50 text-base md:text-lg tracking-[-0.035em] max-w-xl font-light">
            {project.subtitle}
          </p>
        )}
      </div>

      {/* Meta strip — full width row, no sidebar */}
      {(project.client || project.year || project.tags?.length > 0 || project.link) && (
        <div className="px-4 py-8 md:px-8 md:py-10 border-b border-white/10 flex flex-wrap gap-8 md:gap-16">
          {project.client && <MetaItem label="Client" value={project.client} />}
          {project.year && <MetaItem label="Year" value={project.year} />}
          {project.tags?.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/30">Services</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-[0.06em] text-white/70 border border-white/20 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          {project.link && (
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/30">Live Site</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-white border-b border-white/30 pb-1 w-fit hover:border-white transition-colors duration-200"
              >
                View project
                <ArrowUpRight />
              </a>
            </div>
          )}
        </div>
      )}

      {/* Description */}
      {project.description && (
        <div className="px-4 py-14 md:px-8 md:py-20 border-b border-white/10">
          <div className="max-w-2xl flex flex-col gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/30">[ Overview ]</p>
            <p className="text-[18px] md:text-[22px] text-white/80 tracking-[-0.04em] leading-[1.6] font-light">
              {project.description}
            </p>
          </div>
        </div>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="px-4 py-14 md:px-8 md:py-20 border-b border-white/10 flex flex-col gap-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/30">[ Gallery ]</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.gallery.map((img, i) => {
              const src = img.asset ? urlFor(img).width(1600).url() : null;
              if (!src) return null;
              const isWide = i === 0 && project.gallery!.length % 2 !== 0;
              return (
                <div
                  key={i}
                  className={`relative overflow-hidden bg-white/5 ${
                    isWide ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
                  }`}
                >
                  <img
                    src={src}
                    alt={img.alt ?? `${project.title} — ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* More Projects */}
      {moreProjects.length > 0 && (
        <div className="border-t border-white/10">
          <div className="px-4 pt-14 pb-6 md:px-8 md:pt-20 md:pb-8 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/30">[ More Projects ]</p>
            <a
              href="/projects"
              className="font-mono text-[11px] uppercase tracking-[0.06em] text-white/40 hover:text-white transition-colors duration-200"
            >
              All work →
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {moreProjects.map((p) => {
              const src = p.image?.asset
                ? urlFor(p.image).width(800).url()
                : FALLBACK_IMAGES[p.slug.current] ?? null;
              return (
                <a
                  key={p._id}
                  href={`/projects/${p.slug.current}`}
                  className="group relative overflow-hidden aspect-square bg-white/5"
                >
                  {src && (
                    <img
                      src={src}
                      alt={p.image?.alt ?? p.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-50 transition-all duration-700 ease-out group-hover:opacity-80 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                    <h3 className="font-bold italic text-white uppercase tracking-[-0.04em] leading-[1.1] text-[12px] md:text-[15px] line-clamp-2">
                      {p.title}
                    </h3>
                    {p.tags && p.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.05em] text-white/60 border border-white/25 px-1.5 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom nav */}
      <div className="px-4 py-10 md:px-8 md:py-14 border-t border-white/10 flex items-center justify-between">
        <a
          href="/projects"
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-white/40 hover:text-white transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Projects
        </a>
        <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-white/20">H.Studio</p>
      </div>
    </article>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/30">{label}</p>
      <p className="text-sm font-medium text-white/80 tracking-[-0.035em]">{value}</p>
    </div>
  );
}
