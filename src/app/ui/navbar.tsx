'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useContactModal } from './contact-modal-context';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navLinks = [
  { label: 'About',    href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'News',     href: '/news' },
  { label: 'Contact',  href: '/contact' },
];

const mobileNavLinks = [
  { label: 'Home',     href: '/' },
  ...navLinks,
];

export default function Navbar() {
  const { openModal } = useContactModal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Mobile menu refs
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const ctaWrapRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Color-changeable element refs
  const logoRef = useRef<HTMLSpanElement>(null);
  const hamBarsRef = useRef<HTMLSpanElement[]>([]);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);
  const ctaFillRef = useRef<HTMLSpanElement>(null);
  const ctaLabelRef = useRef<HTMLSpanElement>(null);

  // Build mobile menu open/close timeline
  useGSAP(() => {
    const menu = menuRef.current;
    if (!menu) return;
    gsap.set(menu, { xPercent: 100 });
    gsap.set([ctaWrapRef.current, ...linksRef.current], { opacity: 0, y: 24 });
    tlRef.current = gsap.timeline({ paused: true })
      .to(menu, { xPercent: 0, duration: 0.45, ease: 'power3.out' })
      .to(ctaWrapRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, '-=0.2')
      .to(linksRef.current, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.07 }, '-=0.25');
  }, { scope: menuRef });

  // Watch dark sections and flip isDark on every scroll tick
  useEffect(() => {
    const update = () => {
      const dark = Array.from(
        document.querySelectorAll<HTMLElement>('[data-nav-theme="dark"]'),
      ).some((el) => {
        const { top, bottom } = el.getBoundingClientRect();
        return top <= 2 && bottom > 0;
      });
      setIsDark((prev) => (prev === dark ? prev : dark));
    };

    window.addEventListener('scroll', update, { passive: true });
    update(); // set correct colour immediately on mount
    return () => window.removeEventListener('scroll', update);
  }, []);

  // Smoothly animate navbar colors when isDark changes
  useEffect(() => {
    const fg = isDark ? '#ffffff' : '#000000';
    const btnBg = isDark ? 'rgba(0,0,0,0)' : '#000000';
    const btnBorder = isDark ? '#ffffff' : '#000000';

    gsap.to(logoRef.current, { color: fg, duration: 0.4, ease: 'power2.out' });
    gsap.to(hamBarsRef.current, { backgroundColor: fg, duration: 0.4, ease: 'power2.out' });
    if (desktopNavRef.current) {
      gsap.to(desktopNavRef.current.querySelectorAll('a'), { color: fg, duration: 0.4, ease: 'power2.out' });
    }
    gsap.to(ctaBtnRef.current, { backgroundColor: btnBg, borderColor: btnBorder, duration: 0.4, ease: 'power2.out' });
    // label is always white — it only flips to black during the hover fill animation
    gsap.to(ctaLabelRef.current, { color: '#ffffff', duration: 0.4, ease: 'power2.out' });
  }, [isDark]);

  const openMenu = () => { setMenuOpen(true); tlRef.current?.play(); };
  const closeMenu = () => { tlRef.current?.reverse().then(() => setMenuOpen(false)); };

  const onCtaEnter = () => {
    gsap.killTweensOf([ctaFillRef.current, ctaLabelRef.current]);
    gsap.set(ctaFillRef.current, { transformOrigin: 'left center' });
    gsap.to(ctaFillRef.current, { scaleX: 1, duration: 0.4, ease: 'power3.out' });
    gsap.to(ctaLabelRef.current, { color: '#000000', duration: 0.18, delay: 0.14, ease: 'none' });
  };

  const onCtaLeave = () => {
    gsap.killTweensOf([ctaFillRef.current, ctaLabelRef.current]);
    gsap.set(ctaFillRef.current, { transformOrigin: 'right center' });
    gsap.to(ctaFillRef.current, { scaleX: 0, duration: 0.35, ease: 'power3.in' });
    gsap.to(ctaLabelRef.current, { color: isDark ? '#ffffff' : '#ffffff', duration: 0.18, ease: 'none' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between py-6 px-4 md:px-8 w-full">
      <a href="/" className="font-semibold text-base tracking-[-0.04em] capitalize text-black" style={{ color: 'inherit' }}>
        <span ref={logoRef} className="font-semibold text-base tracking-[-0.04em] capitalize text-black">
          H.Studio
        </span>
      </a>

      {/* Desktop nav links */}
      <div ref={desktopNavRef} className="hidden md:flex gap-14 font-semibold text-base tracking-[-0.04em] capitalize text-black">
        {navLinks.map(({ label, href }) => (
          <NavLink key={label} href={href} label={label} isDark={isDark} />
        ))}
      </div>

      {/* Desktop CTA */}
      <button
        ref={ctaBtnRef}
        className="hidden md:flex items-center justify-center text-sm font-medium tracking-[-0.035em] px-4 py-3 rounded-full cursor-pointer border relative overflow-hidden"
        style={{ backgroundColor: '#000000', borderColor: '#000000' }}
        onClick={openModal}
        onMouseEnter={onCtaEnter}
        onMouseLeave={onCtaLeave}
      >
        <span
          ref={ctaFillRef}
          aria-hidden
          className="absolute inset-0 bg-white rounded-full"
          style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
        />
        <span ref={ctaLabelRef} className="relative z-10 text-white">Let&apos;s talk</span>
      </button>

      {/* Mobile hamburger */}
      <button className="md:hidden flex flex-col gap-[5px] p-1 cursor-pointer" onClick={openMenu} aria-label="Open menu">
        {([0, 1, 2] as const).map((i) => (
          <span key={i} ref={(el) => { if (el) hamBarsRef.current[i] = el; }} className="block w-6 h-[2px] bg-black" />
        ))}
      </button>

      {/* Mobile full-screen menu */}
      <div ref={menuRef} className="fixed inset-0 bg-black z-50 flex flex-col px-4 py-6 overflow-y-auto" aria-hidden={!menuOpen}>
        <div className="flex items-center justify-between shrink-0">
          <span className="font-semibold text-base tracking-[-0.04em] capitalize text-white">H.Studio</span>
          <button onClick={closeMenu} aria-label="Close menu" className="p-1 cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="flex-1 flex flex-col justify-center gap-6 py-14">
          <div ref={ctaWrapRef}>
            <MobileCtaBtn onClick={() => { closeMenu(); openModal(); }} />
          </div>
          {mobileNavLinks.map(({ label, href }, i) => (
            <a
              key={label}
              ref={(el) => { if (el) linksRef.current[i] = el; }}
              href={href}
              className="font-light text-white uppercase leading-[0.86] tracking-[-0.08em] text-[56px]"
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, label, isDark }: { href: string; label: string; isDark: boolean }) {
  const underlineRef = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    gsap.killTweensOf(underlineRef.current);
    gsap.set(underlineRef.current, { transformOrigin: 'left center' });
    gsap.to(underlineRef.current, { scaleX: 1, duration: 0.3, ease: 'power2.out' });
  };

  const onLeave = () => {
    gsap.killTweensOf(underlineRef.current);
    gsap.set(underlineRef.current, { transformOrigin: 'right center' });
    gsap.to(underlineRef.current, { scaleX: 0, duration: 0.25, ease: 'power2.in' });
  };

  // Keep underline color in sync with theme
  useEffect(() => {
    if (underlineRef.current) {
      gsap.to(underlineRef.current, { backgroundColor: isDark ? '#ffffff' : '#000000', duration: 0.4 });
    }
  }, [isDark]);

  return (
    <a href={href} className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {label}
      <span
        ref={underlineRef}
        aria-hidden
        className="absolute bottom-[-2px] left-0 h-[1.5px] w-full block bg-black"
        style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
      />
    </a>
  );
}

function MobileCtaBtn({ onClick }: { onClick: () => void }) {
  const fillRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden border border-white text-sm font-medium tracking-[-0.035em] px-4 py-3 rounded-full cursor-pointer w-fit"
      onMouseEnter={() => {
        gsap.killTweensOf([fillRef.current, labelRef.current]);
        gsap.set(fillRef.current, { transformOrigin: 'left center' });
        gsap.to(fillRef.current, { scaleX: 1, duration: 0.4, ease: 'power3.out' });
        gsap.to(labelRef.current, { color: '#000000', duration: 0.18, delay: 0.14, ease: 'none' });
      }}
      onMouseLeave={() => {
        gsap.killTweensOf([fillRef.current, labelRef.current]);
        gsap.set(fillRef.current, { transformOrigin: 'right center' });
        gsap.to(fillRef.current, { scaleX: 0, duration: 0.35, ease: 'power3.in' });
        gsap.to(labelRef.current, { color: '#ffffff', duration: 0.18, ease: 'none' });
      }}
    >
      <span ref={fillRef} aria-hidden className="absolute inset-0 bg-white rounded-full" style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }} />
      <span ref={labelRef} className="relative z-10 text-white">Let&apos;s talk</span>
    </button>
  );
}
