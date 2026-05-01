function Corner({ className }: { className?: string }) {
  // ┌ shape — rotated for each corner
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M15 1H1V15" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export default function BioSection() {
  return (
    <section id="bio" className="px-4 py-12 md:px-8 md:py-[80px]">

      {/* ── Desktop layout ─────────────────────────────────────────── */}
      <div className="hidden md:flex justify-between items-start">

        {/* Far-left label */}
        <p className="font-mono text-sm text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap shrink-0">
          [ About ]
        </p>

        {/*
         * Right block — flex-1 so it fills space after [ ABOUT ].
         * items-end: text box and image column bottom-align, so the
         * short text box floats to the bottom of the tall image.
         */}
        <div className="flex gap-8 items-end flex-1 max-w-[71.4%]">

          {/* Text block: bracket columns stretch to match text height */}
          <div className="flex-1 flex gap-3 items-stretch min-w-[400px]">
            {/* Left bracket column */}
            <div className="flex flex-col justify-between w-6 shrink-0">
              <Corner />
              <Corner className="rotate-[-90deg]" />
            </div>
            {/* Paragraph */}
            <div className="flex-1 flex items-center py-3">
              <p className="text-sm text-[#1f1f1f] tracking-[-0.035em] leading-[1.3]">
                Placeholder paragraph one. This is where you introduce yourself — your background,
                your passion for your craft, and what drives you creatively. Two to three sentences
                work best here. Placeholder paragraph two. Here you can describe your technical
                approach, how you collaborate with clients, or what sets your work apart from
                others in your field.
              </p>
            </div>
            {/* Right bracket column */}
            <div className="flex flex-col justify-between w-6 shrink-0 items-end">
              <Corner className="rotate-90" />
              <Corner className="rotate-180" />
            </div>
          </div>

          {/* Image + 002 label — items-start so 002 sits at the top */}
          <div className="flex gap-6 items-start shrink-0">
            <p className="font-mono text-sm text-[#1f1f1f] leading-[1.1]">002</p>
            <div className="w-[30.3vw] overflow-hidden shrink-0">
              <img
                src="/about-portrait.jpg"
                alt="Harvey Specter portrait"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile layout ──────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 md:hidden">
        <p className="font-mono text-sm text-[#1f1f1f] leading-[1.1]">002</p>
        <p className="font-mono text-sm text-[#1f1f1f] uppercase leading-[1.1]">[ About ]</p>

        {/* Text block with corner brackets */}
        <div className="flex gap-3 items-stretch">
          <div className="flex flex-col justify-between w-6 shrink-0">
            <Corner />
            <Corner className="rotate-[-90deg]" />
          </div>
          <div className="flex-1 flex items-center py-3">
            <p className="text-sm text-[#1f1f1f] tracking-[-0.035em] leading-[1.3]">
              Placeholder paragraph one. This is where you introduce yourself — your background,
              your passion for your craft, and what drives you creatively. Two to three sentences
              work best here. Placeholder paragraph two. Here you can describe your technical
              approach, how you collaborate with clients, or what sets your work apart from
              others in your field.
            </p>
          </div>
          <div className="flex flex-col justify-between w-6 shrink-0 items-end">
            <Corner className="rotate-90" />
            <Corner className="rotate-180" />
          </div>
        </div>

        {/* Full-width portrait */}
        <div className="w-full aspect-[422/594] overflow-hidden">
          <img
            src="/about-portrait.jpg"
            alt="Harvey Specter portrait"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </section>
  );
}
