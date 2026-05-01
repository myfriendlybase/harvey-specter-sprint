'use client';

import { useState } from 'react';

const navLinks = ['About', 'Services', 'Projects', 'News', 'Contact'];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative flex items-center justify-between py-6 px-4 md:px-8 shrink-0 w-full z-10">
      <span className="font-semibold text-base tracking-[-0.04em] capitalize text-black">
        H.Studio
      </span>

      {/* Desktop nav links */}
      <div className="hidden md:flex gap-14 font-semibold text-base tracking-[-0.04em] capitalize text-black">
        {navLinks.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`} className="hover:opacity-60 transition-opacity">
            {link}
          </a>
        ))}
      </div>

      {/* Desktop CTA */}
      <button className="hidden md:flex items-center justify-center bg-black text-white text-sm font-medium tracking-[-0.035em] px-4 py-3 rounded-full cursor-pointer hover:opacity-80 transition-opacity">
        Let&apos;s talk
      </button>

      {/* Mobile hamburger / close */}
      <button
        className="md:hidden flex flex-col gap-[5px] p-1 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M18 6L6 18M6 6l12 12" stroke="black" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <>
            <span className="block w-6 h-[2px] bg-black" />
            <span className="block w-6 h-[2px] bg-black" />
            <span className="block w-6 h-[2px] bg-black" />
          </>
        )}
      </button>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col px-4 py-6 overflow-y-auto">
          {/* Top bar */}
          <div className="flex items-center justify-between shrink-0">
            <span className="font-semibold text-base tracking-[-0.04em] capitalize text-white">
              H.Studio
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="p-1 cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Nav links + CTA */}
          <div className="flex-1 flex flex-col justify-center gap-6 py-14">
            <button className="flex items-center justify-center border border-white text-white text-sm font-medium tracking-[-0.035em] px-4 py-3 rounded-full w-fit cursor-pointer hover:bg-white hover:text-black transition-colors">
              Let&apos;s talk
            </button>
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-light text-white uppercase leading-[0.86] tracking-[-0.08em] text-[56px]"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
