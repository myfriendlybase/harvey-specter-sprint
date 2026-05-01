const lukasLogo   = "https://www.figma.com/api/mcp/asset/e250497b-bf13-49ee-9057-22650c2d8f85";
const markoLogo   = "https://www.figma.com/api/mcp/asset/3c8eac7c-4c1e-4d38-aad1-91b6200bd592";
const sarahLogo   = "https://www.figma.com/api/mcp/asset/95660b47-7e94-4c72-9d34-deceafcc23fb";
const sofiaLogo   = "https://www.figma.com/api/mcp/asset/ef4655b0-dd84-4c37-949e-83ef62fd090f";

interface TestimonialCardProps {
  logo: string;
  quote: string;
  author: string;
  rotation: string;
  logoHeight?: string;
}

function TestimonialCard({ logo, quote, author, rotation, logoHeight = "h-5" }: TestimonialCardProps) {
  return (
    <div className={`flex-none ${rotation}`}>
      <div className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 items-start w-[353px] md:w-[353px]">
        <div className={`relative ${logoHeight} w-[140px]`}>
          <img alt="" className="absolute inset-0 w-full h-full object-contain object-left" src={logo} />
        </div>
        <p className="font-normal text-[#1f1f1f] text-[18px] tracking-[-0.72px] leading-[1.3]">
          {quote}
        </p>
        <p className="font-black text-black text-[16px] tracking-[-0.64px] leading-[1.1] uppercase">
          {author}
        </p>
      </div>
    </div>
  );
}

const testimonials = [
  {
    logo: markoLogo,
    quote: "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    author: "Marko Stojković",
    rotation: "rotate-[-6.85deg]",
    desktop: { left: "7%",    top: "110px" },
  },
  {
    logo: lukasLogo,
    quote: "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    author: "Lukas Weber",
    rotation: "rotate-[2.9deg]",
    desktop: { left: "47%",   top: "200px" },
  },
  {
    logo: sarahLogo,
    quote: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    author: "Sarah Jenkins",
    rotation: "rotate-[2.23deg]",
    desktop: { left: "21%",   top: "553px" },
    logoHeight: "h-8",
  },
  {
    logo: sofiaLogo,
    quote: "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    author: "Sofia Martínez",
    rotation: "rotate-[-4.15deg]",
    desktop: { left: "68.5%", top: "546px" },
    logoHeight: "h-9",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials">

      {/* ── Desktop ─────────────────────────────────────────── */}
      <div className="hidden md:block relative min-h-[900px] px-8 py-[120px] overflow-hidden">

        {/* "Testimonials" — absolutely centred, rendered first so it sits under cards */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <p className="font-medium capitalize text-black text-center text-[13.75vw] tracking-[-0.07em] leading-[1.1] whitespace-nowrap">
            Testimonials
          </p>
        </div>

        {/* Scattered cards — absolutely positioned on top */}
        {testimonials.map((t) => (
          <div
            key={t.author}
            className="absolute flex items-center justify-center"
            style={{ left: t.desktop.left, top: t.desktop.top }}
          >
            <TestimonialCard
              logo={t.logo}
              quote={t.quote}
              author={t.author}
              rotation={t.rotation}
              logoHeight={t.logoHeight}
            />
          </div>
        ))}
      </div>

      {/* ── Mobile ──────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col gap-8 px-4 py-16">
        <p className="font-medium capitalize text-black text-[64px] tracking-[-4.48px] leading-[0.8] text-center">
          Testimonials
        </p>
        {/* py-10 gives rotated card corners room; no-scrollbar hides the scrollbar */}
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4 py-10 -my-10">
          <div className="flex gap-4 w-max">
            {testimonials.map((t) => (
              <div key={t.author} className={`flex-none ${t.rotation}`}>
                <div className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 items-start w-[260px]">
                  <div className={`relative ${t.logoHeight ?? "h-5"} w-[140px]`}>
                    <img alt="" className="absolute inset-0 w-full h-full object-contain object-left" src={t.logo} />
                  </div>
                  <p className="font-normal text-[#1f1f1f] text-[18px] tracking-[-0.72px] leading-[1.3]">
                    {t.quote}
                  </p>
                  <p className="font-black text-black text-[16px] tracking-[-0.64px] leading-[1.1] uppercase">
                    {t.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
