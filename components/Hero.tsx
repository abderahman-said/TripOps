"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Calendar from 'react-calendar';
import { useSliders } from "@/hooks/useSliders";
import { useCities } from "@/hooks/useCities";

const FALLBACK_SLIDE = {
  image_url: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1800&q=85",
  title: "سافر",
  subtitle: "بثقة",
  link_url: "/search",
  button_label: "ابحث الآن",
};

export function Hero() {
  const [cur, setCur] = useState(0);
  const [query, setQuery] = useState("");
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [typed, setTyped] = useState("");
  const [phIdx, setPhIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { data: cities = [] } = useCities();
  const { data: SLIDES = [] } = useSliders();

  const EFFECTIVE_SLIDES = SLIDES.length > 0 ? SLIDES : [FALLBACK_SLIDE];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Typewriter using cities
  useEffect(() => {
    if (cities.length === 0) return;

    let idx = 0;
    const ph = (cities[phIdx]?.name ?? "") + "...";
    let forward = true;

    const t = setInterval(() => {
      if (forward) {
        idx++;
        setTyped(ph.slice(0, idx));
        if (idx >= ph.length) { forward = false; }
      } else {
        idx--;
        setTyped(ph.slice(0, idx));
        if (idx === 0) {
          setPhIdx(p => (p + 1) % cities.length);
          clearInterval(t);
        }
      }
    }, 80);

    return () => clearInterval(t);
  }, [phIdx, cities]);

  // Slide auto-advance
  const advance = useCallback(() => {
    setCur(p => (p + 1) % EFFECTIVE_SLIDES.length);
  }, [EFFECTIVE_SLIDES.length]);

  useEffect(() => {
    timerRef.current = setInterval(advance, 6500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [advance]);

  const goTo = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCur(i);
    timerRef.current = setInterval(advance, 6500);
  };

  const slider = EFFECTIVE_SLIDES[cur] || EFFECTIVE_SLIDES[0];
  const s = {
    img: slider?.image_url,
    line1: slider?.title || "سافر",
    line2: slider?.subtitle || "بثقة",
    sub: "",
    href: slider?.link_url || "/search",
    cta: slider?.button_label || "ابحث الآن",
    accent: "#F59E0B",
  };

  return (
    <section className="relative md:h-screen min-h-[650px] md:min-h-[780px] overflow-hidden pb-20 md:pb-0">
      {/* BG slides */}
      {EFFECTIVE_SLIDES.map((sl, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-1200"
          style={{ opacity: i === cur ? 1 : 0, zIndex: i === cur ? 1 : 0 }}>
          <img src={sl.image_url} alt="" className="w-full h-full object-cover"
            style={{ transform: i === cur ? "scale(1.06)" : "scale(1)", transition: "transform 9s ease", transformOrigin: "center" }} />
          <div className="absolute inset-0 opacity-50" style={{ background: "linear-gradient(to top, rgba(8,26,75,.95) 0%, rgba(8,26,75,.45) 55%, rgba(8,26,75,.15) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,26,75,.5) 0%, transparent 60%)" }} />
          <div className="absolute inset-0 stars-bg" />
        </div>
      ))}

      {/* Decorative blobs */}
      <div className="absolute top-28 left-10 w-40 h-40 rounded-full animate-blob pointer-events-none hidden md:block"
        style={{ background: `radial-gradient(circle,${s.accent}33,transparent)`, zIndex: 2 }} />
      <div className="absolute bottom-40 right-10 w-28 h-28 rounded-full animate-blob pointer-events-none hidden md:block"
        style={{ background: `radial-gradient(circle,${s.accent}22,transparent)`, animationDelay: "-5s", zIndex: 2 }} />

      {/* Content */}
      <div className="relative pt-[120px] md:pt-[150px] z-10 h-full flex flex-col items-center text-center px-4" dir="rtl">

        {/* Headline */}
        <h1 className="leading-none flex justify-center gap-2" style={{ letterSpacing: "-0.025em" }}>
          {[s.line1, s.line2].map((word, wi) => (
            <div key={`${cur}-${wi}`} className="animate-floatUp  pb-4 overflow-hidden block"
              style={{ animationDelay: `${.18 + wi * .16}s`, fontSize: "clamp(2rem,5vw,5rem)", fontWeight: 900 }}>
              {wi === 0
                ? <span className="shimmer-text">{word}</span>
                : <span style={{ color: "white" }}>{word}</span>
              }
            </div>
          ))}
        </h1>

        {/* Sub */}
        <p key={`sub-${cur}`} className="animate-floatUp text-white/70 max-w-md mx-auto mb-5"
          style={{ animationDelay: ".52s", fontSize: "clamp(.95rem,2.5vw,1.2rem)", lineHeight: 1.8 }}>
          {s.sub}
        </p>

        {/* Search bar */}
        <div className="max-w-4xl w-full mx-auto relative z-20 px-4">
          <div className="glass-dark p-2 rounded-3xl w-full flex flex-col md:flex-row items-stretch md:items-center gap-2 shadow-2xl relative z-10 animate-scaleIn select-none border border-white/10"
            style={{ background: "rgba(10,36,99,0.3)", backdropFilter: "blur(40px)" }}>

            {/* DESTINATION */}
            <div className="flex-[2] min-w-0 flex items-center px-4 bg-white/5 md:bg-transparent rounded-2xl md:rounded-none border border-white/5 md:border-none">
              <svg className="w-5 h-5 text-white/40 ml-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={`الوجهة: ${typed}`}
                dir="rtl"
                className="w-full bg-transparent py-4 text-white placeholder-white/40 text-sm outline-none"
              />
            </div>

            {/* SEPARATOR */}
            <div className="hidden md:block w-px h-8 bg-white/10 shrink-0" />

            {/* DATE RANGE PICKER */}
            <div
              className="relative flex-1 min-w-0 flex items-center px-4 py-2 bg-white/5 md:bg-transparent rounded-2xl md:rounded-none group cursor-pointer border border-white/5 md:border-none"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <svg className="w-4 h-4 text-white/40 ml-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex flex-col text-right flex-1 truncate">
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-0.5">موعد الرحلة (اختياري)</span>
                <span className="text-white text-xs whitespace-nowrap overflow-hidden">
                  {mounted && dateRange && Array.isArray(dateRange) && dateRange[0] && dateRange[1]
                    ? `${dateRange[0].toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' })} - ${dateRange[1].toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' })}`
                    : "اختار التاريخ"}
                </span>
              </div>

              {/* CALENDAR POPUP */}
              {mounted && showCalendar && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-0 mt-3 z-[200] animate-scaleIn"
                  onClick={e => e.stopPropagation()}
                >
                  <Calendar
                    onChange={(val: [Date, Date] | null) => {
                      setDateRange(val);
                      if (val && val[1]) setShowCalendar(false);
                    }}
                    value={dateRange}
                    selectRange={true}
                    locale="ar-EG"
                  />
                  <button
                    onClick={() => { setDateRange(null); setShowCalendar(false); }}
                    className="w-full py-2 bg-white/5 hover:bg-white/10 text-[11px] text-white/50 border-t border-white/10 rounded-b-3xl"
                  >
                    مسح التاريخ
                  </button>
                </div>
              )}
            </div>

            {/* BUTTON */}
            <a href={`${s.href}?query=${encodeURIComponent(query)}`} className="md:ml-2">
              <button
                className="px-6 py-4 md:py-3 rounded-2xl w-full md:min-w-[150px] text-sm font-black text-white btn-shine transition-all hover:scale-[1.03]"
                style={{ background: `linear-gradient(135deg,${s.accent},${s.accent}99)`, boxShadow: `0 4px 20px ${s.accent}55` }}
              >
                {s.cta}
              </button>
            </a>
          </div>

          {/* Quick tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {cities.slice(0, 6).map(city => (
              <button
                key={city.id}
                onClick={() => setQuery(city.name)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-white/75 hover:text-white transition-all hover:scale-105"
                style={{ background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.18)" }}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>

        {/* Slide dots */}
        <div className="hidden md:flex absolute bottom-16 md:bottom-24 items-center gap-2.5">
          {EFFECTIVE_SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className="rounded-full transition-all duration-500"
              style={{ width: i === cur ? "36px" : "9px", height: "9px", background: i === cur ? s.accent : "rgba(255,255,255,0.35)" }} />
          ))}
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-[-100px] md:bottom-8 left-1/2 -translate-x-1/2 animate-float opacity-40">
          <div className="w-5 h-8 rounded-full flex items-start justify-center p-1"
            style={{ border: "1.5px solid rgba(255,255,255,0.4)" }}>
            <div className="w-1 h-2 rounded-full bg-white animate-float" />
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-[-1px] left-0 right-0 z-10" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%" }}>
          <path fill="#f8faff" d="M0,55 C200,85 500,25 720,55 C940,85 1200,25 1440,55 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}