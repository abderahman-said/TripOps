"use client";

import { useState, useEffect } from "react";

interface NavItem {
  label: string;
  href: string;
  dd: { label: string; href: string }[] | null;
}

const NAV: NavItem[] = [
  { label: "الرئيسية", href: "/", dd: null },
  { label: "كل الرحلات", href: "/search", dd: null },
  { label: "الرحلات الداخلية", href: "/search?cat=domestic", dd: [
      { label: "شرم الشيخ", href: "/trips/sharm-el-sheikh" },
      { label: "الغردقة", href: "/search?query=الغردقة" },
      { label: "الأقصر وأسوان", href: "/search?query=الأقصر" },
      { label: "دهب", href: "/search?query=دهب" },
      { label: "مرسى مطروح", href: "/search?query=مطروح" },
    ] 
  },
  { label: "الرحلات الدينية", href: "/search?cat=religious", dd: [
      { label: "العمرة", href: "/search?query=عمرة" },
      { label: "الحج", href: "/search?query=حج" },
      { label: "زيارة المدينة", href: "/search?query=المدينة" },
    ] 
  },
  { label: "تواصل معنا", href: "/contact", dd: null },
];

const SocialIcons = {
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  YouTube: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  TikTok: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
    </svg>
  ),
};

const SOCIAL_LIST = [
  { key: "Facebook",  Icon: SocialIcons.Facebook,  href: "#" },
  { key: "Instagram", Icon: SocialIcons.Instagram, href: "#" },
  { key: "YouTube",   Icon: SocialIcons.YouTube,   href: "#" },
  { key: "TikTok",    Icon: SocialIcons.TikTok,    href: "#" },
];
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

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
        <a href="/" className="flex items-center gap-3 group select-none">
          <div className="relative w-11 h-11">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-lg relative z-10 transition-transform duration-300 group-hover:scale-105"
              style={{ background: "linear-gradient(135deg,#F59E0B,#D97706)" }}>
              ر
            </div>
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-400 blur-lg"
              style={{ background: "#F59E0B" }} />
          </div>
          <div>
            <p className="text-white font-black text-[15px] leading-tight">الرحمن تورز</p>
            <p className="text-yellow-400/80 text-[9px] tracking-[0.2em] font-medium">AL-RAHMAAN TOURS</p>
          </div>
        </a>

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
                  <svg className="w-3 h-3 opacity-60 transition-transform duration-200"
                    style={{ transform: hovered === item.label ? "rotate(180deg)" : "none" }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
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
            {SOCIAL_LIST.map(({ key, Icon }) => (
                <a key={key} href="#" aria-label={key}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-yellow-400 transition-all duration-200 hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <Icon />
                </a>
              ))}
          </div>
          {/* CTA */}
          <a href="/contact"
            className="hidden md:flex btn-shine items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-black text-white transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg,#F59E0B,#D97706)", boxShadow: "0 4px 18px rgba(245,158,11,0.45)" }}>
            ✈ احجز الآن
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
                    <svg className={`w-4 h-4 transition-transform duration-300 ${mobileExpanded === item.label ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
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
            className="mt-2 text-center py-3 rounded-xl text-sm font-black text-white"
            style={{ background: "linear-gradient(135deg,#F59E0B,#D97706)" }}>
            ✈ احجز الآن
          </a>
        </div>
      </div>
    </header>
  );
}
