import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

const PORTFOLIO_QUERY = `*[_type == "portfolio"] | order(order asc) {
  _id,
  title,
  slug,
  image,
  tags,
  tall
}`

interface PortfolioItem {
  _id: string
  title: string
  slug: { current: string }
  image?: { asset: { _ref: string }; alt?: string }
  tags: string[]
  tall: boolean
}

function Corner({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex gap-3 items-center">
      {items.map((tag) => (
        <span
          key={tag}
          className="backdrop-blur-[10px] bg-white/30 text-[#111] text-sm font-medium tracking-[-0.035em] px-2 py-1 rounded-full whitespace-nowrap"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function ArrowIcon() {
  return (
    <div className="size-8 flex items-center justify-center shrink-0">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M8 24L24 8M24 8H12M24 8V20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

const FALLBACK_IMAGES: Record<string, string> = {
  'surfers-paradise': '/work-surfers.jpg',
  'cyberpunk-caffe': '/work-cyberpunk.jpg',
  'agency-976': '/work-agency.jpg',
  'minimal-playground': '/work-minimal.jpg',
}

interface ProjectCardProps {
  item: PortfolioItem
  heightClass: string
}

function ProjectCard({ item, heightClass }: ProjectCardProps) {
  const imgSrc = item.image?.asset
    ? urlFor(item.image).width(900).url()
    : FALLBACK_IMAGES[item.slug.current] ?? '/work-surfers.jpg'

  return (
    <div className="flex flex-col gap-[10px]">
      <div className={`relative w-full ${heightClass} overflow-hidden`}>
        <img src={imgSrc} alt={item.image?.alt ?? item.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 pb-4 pl-4">
          <Tags items={item.tags} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-black text-black uppercase leading-[1.1] tracking-[-0.04em] text-[24px] md:text-[36px] md:tracking-[-0.04em]">
          {item.title}
        </p>
        <ArrowIcon />
      </div>
    </div>
  );
}

export default async function WorkSection() {
  const projects: PortfolioItem[] = await client.fetch(PORTFOLIO_QUERY)

  const [first, second, third, fourth] = projects

  return (
    <section id="projects" className="px-4 py-12 md:px-8 md:py-[80px]">

      {/* ── Header ─────────────────────────────────────────── */}
      {/* Mobile */}
      <div className="flex flex-col gap-4 mb-8 md:hidden">
        <p className="font-mono text-sm text-[#1f1f1f] uppercase leading-[1.1]">[ portfolio ]</p>
        <div className="flex items-start justify-between">
          <h2 className="font-light text-black uppercase leading-[0.86] tracking-[-0.08em] text-[32px]">
            Selected<br />Work
          </h2>
          <p className="font-mono text-sm text-[#1f1f1f] leading-[1.1]">004</p>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between mb-[61px]">
        <div className="flex gap-[10px] items-start uppercase">
          <h2 className="font-light text-black uppercase leading-[0.86] tracking-[-0.08em] text-[6.67vw]">
            Selected<br />Work
          </h2>
          <p className="font-mono text-sm text-[#1f1f1f] leading-[1.1] mt-1">004</p>
        </div>
        <div className="flex h-[110px] w-[15px] items-center justify-center">
          <p className="font-mono text-sm text-[#1f1f1f] uppercase whitespace-nowrap -rotate-90 origin-center">
            [ portfolio ]
          </p>
        </div>
      </div>

      {/* ── Mobile: single column ──────────────────────────── */}
      <div className="flex flex-col gap-6 md:hidden">
        {projects.map((p) => (
          <ProjectCard key={p._id} item={p} heightClass="h-[390px]" />
        ))}
        <CtaBox />
      </div>

      {/* ── Desktop: two staggered columns ────────────────── */}
      {first && second && third && fourth && (
        <div className="hidden md:flex gap-6 items-start">
          <div className="flex-1 flex flex-col gap-[117px]">
            <ProjectCard item={first} heightClass={first.tall ? 'h-[744px]' : 'h-[699px]'} />
            <ProjectCard item={second} heightClass={second.tall ? 'h-[744px]' : 'h-[699px]'} />
            <CtaBox />
          </div>
          <div className="flex-1 flex flex-col gap-[117px] pt-[240px]">
            <ProjectCard item={third} heightClass={third.tall ? 'h-[744px]' : 'h-[699px]'} />
            <ProjectCard item={fourth} heightClass={fourth.tall ? 'h-[744px]' : 'h-[699px]'} />
          </div>
        </div>
      )}
    </section>
  );
}

function CtaBox() {
  return (
    <div className="flex gap-3 items-stretch max-w-[465px]">
      <div className="flex flex-col justify-between w-6 shrink-0">
        <Corner />
        <Corner className="rotate-[-90deg]" />
      </div>
      <div className="flex-1 flex flex-col gap-[10px] justify-center py-3">
        <p className="text-sm italic text-[#1f1f1f] tracking-[-0.035em] leading-[1.3]">
          Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
        </p>
        <button className="bg-black text-white text-sm font-medium tracking-[-0.035em] px-4 py-3 rounded-full w-fit cursor-pointer hover:opacity-80 transition-opacity">
          Let&apos;s talk
        </button>
      </div>
      <div className="flex flex-col justify-between w-6 shrink-0 items-end">
        <Corner className="rotate-90" />
        <Corner className="rotate-180" />
      </div>
    </div>
  );
}
