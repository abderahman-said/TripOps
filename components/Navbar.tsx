"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Share2,
  Image,
  Monitor,
  ChevronDown,
  Plane,
  Youtube
} from "lucide-react";

import { useSiteSettings } from "@/hooks/useSiteSettings";

interface NavItem {
  label: string;
  href: string;
  dd: { label: string; href: string }[] | null;
}

const NAV: NavItem[] = [
  { label: "الرئيسية", href: "/", dd: null },
  { label: "كل الرحلات", href: "/search", dd: null },
  { label: "من نحن", href: "/about", dd: null },
  { label: "تواصل معنا", href: "/contact", dd: null },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { data: settings } = useSiteSettings();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const SOCIAL_LIST = [
    {
      key: "Facebook",
      href: settings?.social_media.facebook || "#",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      key: "Instagram",
      href: settings?.social_media.instagram || "#",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },

    {
      key: "TikTok",
      href: settings?.social_media.tiktok || "#",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.417 6.417 0 01-1.87-1.54v8.83c.03 2.15-.44 4.39-1.78 6.03-1.33 1.64-3.32 2.71-5.4 3.01-2.48.36-5.1-.21-7.07-1.75-2.05-1.61-3.21-4.13-2.98-6.72.19-2.22 1.34-4.39 3.22-5.59 1.83-1.18 4.16-1.57 6.27-1.01v4.11c-1.2-.56-2.61-.59-4.04-.15-.81.25-1.56.73-2.07 1.4-1.34 1.74-1.15 4.63.43 6.14 1.42 1.37 3.86 1.54 5.48.4 1.11-.78 1.76-2.14 1.71-3.52V.02z" />
        </svg>
      ),
    },
  ];

  return (
    <header
      className="fixed top-0 w-full z-[100] transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(8,26,75,0.97)"
          : "linear-gradient(180deg,rgba(8,26,75,0.9) 0%,rgba(21,101,192,0.5) 100%)",
        backdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
        boxShadow: scrolled ? "0 2px 40px rgba(8,26,75,0.5)" : "none",
        padding: scrolled ? "8px 0" : "14px 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group select-none">
            {settings?.logo ? (
              <div className="w-20 h-12 rounded-xl overflow-hidden shadow-lg relative z-10 transition-transform duration-300 group-hover:scale-105 bg-white p-1">
                <img src={settings.logo} alt={settings.name} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-lg relative z-10 transition-transform duration-300 group-hover:scale-105"
                style={{ background: "linear-gradient(135deg,#F59E0B,#D97706)" }}>
                {settings?.name ? settings.name.charAt(0).toUpperCase() : "."}
              </div>
            )}
          
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV.map((item) => (
            <div key={item.label} className="relative"
              onMouseEnter={() => item.dd && setHovered(item.label)}
              onMouseLeave={() => setHovered(null)}>
              <a href={item.href}
                className="nav-pill flex items-center gap-1.5 px-4 py-2 rounded-xl text-white/85 hover:text-white hover:bg-white/10 text-[13.5px] font-semibold transition-all duration-200">
                {item.label}
                {item.dd && (
                  <ChevronDown className="w-3 h-3 opacity-60 transition-transform duration-200"
                    style={{ transform: hovered === item.label ? "rotate(180deg)" : "none" }} />
                )}
              </a>
              {item.dd && hovered === item.label && (
                <div className="absolute top-full right-0 mt-2 w-44 rounded-2xl overflow-hidden shadow-2xl animate-scaleIn"
                  style={{ background: "rgba(8,26,75,0.97)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {item.dd.map((d) => (
                    <a key={d.label} href={d.href}
                      className="block px-5 py-2.5 text-[13px] text-white/70 hover:text-white hover:bg-white/8 transition-all border-b border-white/5 last:border-0"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      {d.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Social icons */}
          <div className="hidden md:flex gap-1.5">
            {SOCIAL_LIST.map(({ key, icon, href }) => (
              <a key={key} href={href} aria-label={key} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-yellow-400 transition-all duration-200 hover:scale-110"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {icon}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a href="/contact"
            className="hidden md:flex btn-shine items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-black text-white transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg,#F59E0B,#D97706)", boxShadow: "0 4px 18px rgba(245,158,11,0.45)" }}>
            <Plane className="w-4 h-4" /> احجز الآن
          </a>
          {/* Hamburger */}
          <button onClick={() => setMobileOpen(p => !p)}
            className="lg:hidden flex flex-col gap-1.5 w-9 h-9 items-center justify-center rounded-lg"
            style={{ background: "rgba(255,255,255,0.08)" }}>
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-5 h-0.5 bg-white rounded-full transition-all duration-300"
                style={{
                  transform: mobileOpen
                    ? i === 0 ? "rotate(45deg) translateY(8px)" : i === 2 ? "rotate(-45deg) translateY(-8px)" : "scaleX(0)"
                    : "none"
                }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div style={{ maxHeight: mobileOpen ? "520px" : "0", opacity: mobileOpen ? 1 : 0, overflow: "hidden", transition: "max-height .35s ease, opacity .3s ease" }}>
        <div className="px-5 py-4 flex flex-col gap-1 border-t border-white/8 overflow-y-auto"
          style={{ background: "rgba(8,26,75,0.98)", borderColor: "rgba(255,255,255,0.08)", maxHeight: "500px" }}>
          {NAV.map((item) => (
            <div key={item.label} className="flex flex-col">
              <div className="flex items-center justify-between">
                <a href={item.href} onClick={() => !item.dd && setMobileOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/8 text-sm font-semibold transition-all text-right">
                  {item.label}
                </a>
                {item.dd && (
                  <button onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                    className="p-3 text-white/50 hover:text-white transition-colors">
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                  </button>
                )}
              </div>
              {item.dd && mobileExpanded === item.label && (
                <div className="flex flex-col gap-1 pr-6 pb-2">
                  {item.dd.map((d) => (
                    <a key={d.label} href={d.href} onClick={() => setMobileOpen(false)}
                      className="px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 text-[12.5px] font-medium transition-all text-right">
                      {d.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a href="/contact" onClick={() => setMobileOpen(false)}
            className="mt-2 text-center flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black text-white"
            style={{ background: "linear-gradient(135deg,#F59E0B,#D97706)" }}>
            <Plane className="w-4 h-4" /> احجز الآن
          </a>
        </div>
      </div>
    </header>
  );
}
