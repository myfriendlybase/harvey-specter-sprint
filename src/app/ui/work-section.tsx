import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { WorkHeadingAnimation, WorkCardAnimation } from './work-animations'
import WorkCtaBox from './work-cta-box'

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
      <img src="/arrow.svg" width={32} height={32} alt="" aria-hidden />
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
    <a href={`/projects/${item.slug.current}`} className="group flex flex-col gap-[10px] cursor-pointer">
      <div className={`relative w-full ${heightClass} overflow-hidden`}>
        <img
          src={imgSrc}
          alt={item.image?.alt ?? item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
        <div className="absolute bottom-0 left-0 pb-4 pl-4 transition-transform duration-300 group-hover:translate-y-[-6px]">
          <Tags items={item.tags} />
        </div>
      </div>
      <div className="flex items-center justify-between pt-1">
        <p className="font-black text-black uppercase leading-[1.1] tracking-[-0.04em] text-[24px] md:text-[36px] md:tracking-[-0.04em] transition-transform duration-300 ease-out group-hover:translate-x-2">
          {item.title}
        </p>
        <div className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
          <ArrowIcon />
        </div>
      </div>
    </a>
  );
}

export default async function WorkSection() {
  const projects: PortfolioItem[] = await client.fetch(PORTFOLIO_QUERY, {}, { next: { revalidate: 30 } })

  const [first, second, third, fourth] = projects

  return (
    <section id="projects" className="bg-[#fafafa] px-4 py-12 md:px-8 md:py-[80px]">

      {/* ── Header ─────────────────────────────────────────── */}
      {/* Mobile */}
      <WorkHeadingAnimation>
        <div className="flex flex-col gap-4 mb-8 md:hidden">
          <p className="font-mono text-sm text-[#1f1f1f] uppercase leading-[1.1]">[ portfolio ]</p>
          <div className="flex items-start justify-between">
            <h2 className="font-light text-black uppercase leading-[0.86] tracking-[-0.08em] text-[32px]">
              Selected<br />Work
            </h2>
            <p className="font-mono text-sm text-[#1f1f1f] leading-[1.1]">004</p>
          </div>
        </div>
      </WorkHeadingAnimation>

      {/* Desktop */}
      <WorkHeadingAnimation>
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
      </WorkHeadingAnimation>

      {/* ── Mobile: single column ──────────────────────────── */}
      <div className="flex flex-col gap-6 md:hidden">
        {projects.map((p, i) => (
          <WorkCardAnimation key={p._id} delay={i * 0.1}>
            <ProjectCard item={p} heightClass="h-[390px]" />
          </WorkCardAnimation>
        ))}
        <WorkCtaBox />
      </div>

      {/* ── Desktop: two staggered columns ────────────────── */}
      {first && second && third && fourth && (
        <div className="hidden md:flex gap-6 items-start">
          <div className="flex-1 flex flex-col gap-[117px]">
            <WorkCardAnimation delay={0}>
              <ProjectCard item={first} heightClass={first.tall ? 'h-[744px]' : 'h-[699px]'} />
            </WorkCardAnimation>
            <WorkCardAnimation delay={0.1}>
              <ProjectCard item={second} heightClass={second.tall ? 'h-[744px]' : 'h-[699px]'} />
            </WorkCardAnimation>
            <WorkCtaBox />
          </div>
          <div className="flex-1 flex flex-col gap-[117px] pt-[240px]">
            <WorkCardAnimation delay={0.15}>
              <ProjectCard item={third} heightClass={third.tall ? 'h-[744px]' : 'h-[699px]'} />
            </WorkCardAnimation>
            <WorkCardAnimation delay={0.25}>
              <ProjectCard item={fourth} heightClass={fourth.tall ? 'h-[744px]' : 'h-[699px]'} />
            </WorkCardAnimation>
          </div>
        </div>
      )}
    </section>
  );
}

