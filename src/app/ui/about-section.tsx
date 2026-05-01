export default function AboutSection() {
  return (
    <section id="about" className="px-4 py-12 md:px-8 md:py-[120px]">

      {/* [ 8+ YEARS IN INDUSTRY ] + hairline rule */}
      <div className="flex flex-col gap-3 items-end mb-6 md:mb-6">
        <p className="font-mono text-sm text-[#1f1f1f] uppercase leading-[1.1] text-right">
          [ 8+ years in industry ]
        </p>
        <hr className="w-full border-0 border-t border-black/20" />
      </div>

      {/*
       * Main text block
       * Mobile:  centered, 32px, all lines stacked
       * Desktop: staircase indentation, 96px (~6.67vw)
       */}
      <div className="flex flex-col gap-2 items-center md:items-start">

        {/* Line 1: "A CREATIVE DIRECTOR   /" + "001" label */}
        {/* Mobile: 001 above, centered; Desktop: 001 inline-right */}
        <p className="font-mono text-sm text-[#1f1f1f] leading-[1.1] md:hidden">001</p>
        <div className="flex flex-col items-center md:flex-row md:items-start md:gap-3">
          <p className="
            font-light text-black uppercase leading-[0.84] tracking-[-0.08em] md:whitespace-pre
            text-[32px] md:text-[6.67vw]
          ">
            {`A creative director   /`}
          </p>
          <p className="hidden md:block font-mono text-sm text-[#1f1f1f] leading-[1.1] mt-1 shrink-0">
            001
          </p>
        </div>

        {/* Line 2: PHOTOGRAPHER — indented ~214px (14.86vw) on desktop */}
        <p className="
          font-light text-black uppercase leading-[0.84] tracking-[-0.08em]
          text-[32px] md:text-[6.67vw] md:pl-[14.86vw]
        ">
          Photographer
        </p>

        {/* Line 3: BORN & RAISED — indented ~610px (42.36vw) on desktop */}
        <p className="
          font-light text-black uppercase leading-[0.84] tracking-[-0.08em]
          text-[32px] md:text-[6.67vw] md:pl-[42.36vw]
        ">
          Born{' '}
          <em className="font-playfair not-italic italic font-normal">{'&'}</em>
          {' '}raised
        </p>

        {/* Line 4: ON THE SOUTH SIDE — no indent */}
        <p className="
          font-light text-black uppercase leading-[0.84] tracking-[-0.08em]
          text-[32px] md:text-[6.67vw]
        ">
          on the south side
        </p>

        {/* Line 5: OF CHICAGO. + [ CREATIVE FREELANCER ] */}
        {/* Mobile: stacked; Desktop: inline on same baseline */}
        <div className="flex flex-col items-center gap-3 md:flex-row md:items-baseline md:gap-4 md:pl-[42.08vw]">
          <p className="
            font-light text-black uppercase leading-[0.84] tracking-[-0.08em]
            text-[32px] md:text-[6.67vw]
          ">
            of chicago.
          </p>
          <p className="font-mono text-sm text-[#1f1f1f] leading-[1.1] whitespace-nowrap">
            [ creative freelancer ]
          </p>
        </div>

      </div>
    </section>
  );
}
