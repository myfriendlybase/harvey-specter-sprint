'use client';

import PillButton from './pill-button';
import { useContactModal } from './contact-modal-context';

export interface SocialLink {
  platform: string;
  url: string;
}

interface FooterProps {
  socialLinks?: SocialLink[];
}

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Facebook', url: '#' },
  { platform: 'Instagram', url: '#' },
  { platform: 'X.com', url: '#' },
  { platform: 'LinkedIn', url: '#' },
];

export default function Footer({ socialLinks = DEFAULT_SOCIAL_LINKS }: FooterProps) {
  const { openModal } = useContactModal();
  const half = Math.ceil(socialLinks.length / 2);
  const leftLinks = socialLinks.slice(0, half);
  const rightLinks = socialLinks.slice(half);

  return (
    <footer data-nav-theme="dark" className="bg-black text-white overflow-hidden">

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
              <PillButton variant="light" onClick={openModal}>Let&apos;s talk</PillButton>
            </div>

            {/* Centre */}
            <div className="text-center w-[298px]">
              {leftLinks.map((s) => (
                <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" className="block font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1] hover:opacity-60 transition-opacity">
                  {s.platform}
                </a>
              ))}
            </div>

            {/* Right */}
            <div className="text-right w-[298px]">
              {rightLinks.map((s) => (
                <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" className="block font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1] hover:opacity-60 transition-opacity">
                  {s.platform}
                </a>
              ))}
            </div>
          </div>

          <hr className="border-0 border-t border-white/20 w-full" />
        </div>

        {/* Bottom row */}
        <div className="flex items-end gap-[80px] w-full">
          <div className="relative flex-1 flex flex-col justify-end">
            <div className="absolute left-0 bottom-4 flex items-center justify-center w-[15px] h-[160px]">
              <p className="font-mono text-[14px] text-white uppercase whitespace-nowrap -rotate-90 origin-center leading-[1.1]">
                [ Coded By Claude ]
              </p>
            </div>
            <p
              className="font-semibold capitalize text-white tracking-[-0.06em] leading-[0.8] whitespace-nowrap pl-5"
              style={{ fontSize: 'calc((100vw - 328px) / 3.9)' }}
            >
              H.Studio
            </p>
          </div>

          <div className="flex gap-[34px] items-center pb-8 shrink-0">
            <a href="/licences" className="font-normal text-[12px] text-white tracking-[-0.48px] uppercase underline leading-[1.1]">Licences</a>
            <a href="/privacy-policy" className="font-normal text-[12px] text-white tracking-[-0.48px] uppercase underline leading-[1.1]">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* ── Mobile ──────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col gap-[48px] pt-[48px] px-4 pb-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <p className="font-light italic text-[24px] text-white tracking-[-0.96px] uppercase leading-[1.1] max-w-[298px]">
                Have a{' '}
                <span className="font-black not-italic">project</span>
                {' '}in mind?
              </p>
              <PillButton variant="light" onClick={openModal}>Let&apos;s talk</PillButton>
            </div>
            {socialLinks.map((s) => (
              <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" className="block font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1] hover:opacity-60 transition-opacity">
                {s.platform}
              </a>
            ))}
          </div>
          <hr className="border-0 border-t border-white/20 w-full" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-[34px] items-center justify-center pb-4">
            <a href="/licences" className="font-normal text-[12px] text-white tracking-[-0.48px] uppercase underline leading-[1.1]">Licences</a>
            <a href="/privacy-policy" className="font-normal text-[12px] text-white tracking-[-0.48px] uppercase underline leading-[1.1]">Privacy Policy</a>
          </div>
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
