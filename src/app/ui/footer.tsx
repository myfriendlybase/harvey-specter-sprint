const socialLinks = [
  { label: 'Facebook',  href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'X.com',     href: '#' },
  { label: 'LinkedIn',  href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white overflow-hidden">

      {/* ── Desktop ─────────────────────────────────────────── */}
      <div className="hidden md:flex flex-col gap-[120px] pt-[48px] px-[32px]">

        {/* Top row: CTA | Social centre | Social right */}
        <div className="flex flex-col gap-[48px]">
          <div className="flex items-start justify-between">

            {/* Left — headline + button */}
            <div className="flex flex-col gap-3 w-[298px]">
              <p className="font-light italic text-[24px] text-white tracking-[-0.96px] uppercase leading-[1.1]">
                Have a{' '}
                <span className="font-black not-italic">project</span>
                {' '}in mind?
              </p>
              <button className="border border-white text-white font-medium text-[14px] tracking-[-0.56px] px-4 py-3 rounded-full w-fit hover:bg-white hover:text-black transition-colors cursor-pointer">
                Let&apos;s talk
              </button>
            </div>

            {/* Centre — Facebook, Instagram */}
            <div className="text-center w-[298px]">
              {socialLinks.slice(0, 2).map((s) => (
                <a key={s.label} href={s.href} className="block font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1] hover:opacity-60 transition-opacity">
                  {s.label}
                </a>
              ))}
            </div>

            {/* Right — X.com, LinkedIn */}
            <div className="text-right w-[298px]">
              {socialLinks.slice(2).map((s) => (
                <a key={s.label} href={s.href} className="block font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1] hover:opacity-60 transition-opacity">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <hr className="border-0 border-t border-white/20 w-full" />
        </div>

        {/* Bottom row — fixed 80px gap, H.Studio sized to fill its container exactly */}
        <div className="flex items-end gap-[80px] w-full">

          {/* H.Studio section — flex-1, sticks to bottom */}
          <div className="relative flex-1 flex flex-col justify-end">
            {/* [ Coded By Claude ] rotated label */}
            <div className="absolute left-0 bottom-4 flex items-center justify-center w-[15px] h-[160px]">
              <p className="font-mono text-[14px] text-white uppercase whitespace-nowrap -rotate-90 origin-center leading-[1.1]">
                [ Coded By Claude ]
              </p>
            </div>
            {/*
              font-size calc: fills flex-1 width at any viewport.
              Available width = 100vw - 64px (padding) - 80px (gap) - ~184px (links) = 100vw - 328px
              Inter Semibold char ratio for "H.Studio" ≈ 3.9 → font = (100vw - 328px) / 3.9
            */}
            <p
              className="font-semibold capitalize text-white tracking-[-0.06em] leading-[0.8] whitespace-nowrap pl-5"
              style={{ fontSize: 'calc((100vw - 328px) / 3.9)' }}
            >
              H.Studio
            </p>
          </div>

          {/* Licences + Privacy Policy — bottom-aligned, exactly 80px from H.Studio */}
          <div className="flex gap-[34px] items-center pb-8 shrink-0">
            <a href="#" className="font-normal text-[12px] text-white tracking-[-0.48px] uppercase underline leading-[1.1]">Licences</a>
            <a href="#" className="font-normal text-[12px] text-white tracking-[-0.48px] uppercase underline leading-[1.1]">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* ── Mobile ──────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col gap-[48px] pt-[48px] px-4">

        {/* Top block */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {/* Headline + button */}
            <div className="flex flex-col gap-3">
              <p className="font-light italic text-[24px] text-white tracking-[-0.96px] uppercase leading-[1.1] max-w-[298px]">
                Have a{' '}
                <span className="font-black not-italic">project</span>
                {' '}in mind?
              </p>
              <button className="border border-white text-white font-medium text-[14px] tracking-[-0.56px] px-4 py-3 rounded-full w-fit hover:bg-white hover:text-black transition-colors cursor-pointer">
                Let&apos;s talk
              </button>
            </div>

            {/* Social links */}
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href} className="block font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1] hover:opacity-60 transition-opacity">
                {s.label}
              </a>
            ))}
          </div>

          {/* Divider */}
          <hr className="border-0 border-t border-white/20 w-full" />
        </div>

        {/* Bottom block */}
        <div className="flex flex-col gap-4">
          {/* Licences + Privacy Policy */}
          <div className="flex gap-[34px] items-center justify-center pb-4">
            <a href="#" className="font-normal text-[12px] text-white tracking-[-0.48px] uppercase underline leading-[1.1]">Licences</a>
            <a href="#" className="font-normal text-[12px] text-white tracking-[-0.48px] uppercase underline leading-[1.1]">Privacy Policy</a>
          </div>

          {/* [ Coded By Claude ] + H.Studio */}
          <div className="flex flex-col gap-3 -mx-4">
            <p className="font-mono text-[10px] text-white uppercase leading-[1.1] px-4 pb-2">
              [ Coded By Claude ]
            </p>
            <p className="font-semibold capitalize text-white text-[24.4vw] tracking-[-0.06em] leading-[0.8] whitespace-nowrap px-4">
              H.Studio
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
