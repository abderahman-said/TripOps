"use client";

import { FEATURES } from "@/constants/landing";
import { useInView } from "@/hooks/useInView";

export function WhyUs() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className="py-24 px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#081a4b 0%,#1565C0 100%)" }}>
      <div className="absolute inset-0 stars-bg" />
      
      {/* Dynamic Blobs */}
      <div className="absolute top-0 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none animate-blob opacity-20"
        style={{ background: "radial-gradient(circle,#F59E0B,transparent)" }} />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none animate-blob opacity-20"
        style={{ background: "radial-gradient(circle,#06B6D4,transparent)", animationDelay: "-4s" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Modern Header Layout */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-20 px-4"
          style={{ animation: inView ? "floatUp .8s ease both" : "none", opacity: inView ? 1 : 0 }}>
          <div className="max-w-2xl text-right">
            <span className="tag-pill inline-flex mb-4" style={{ color: "#FBBF24", borderColor: "rgba(251,191,36,.3)", background: "rgba(251,191,36,.1)" }}>
              ✦ لمـاذا نحـن؟ ✦
            </span>
            <h2 className="font-black text-white mb-4"
              style={{ fontSize: "clamp(2.5rem,7vw,4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              سـافـر بـثـقـة <br />
              <span className="gold-text">مـع الـرحـمـن تـورز</span>
            </h2>
          </div>
          <div className="max-w-md text-right lg:pb-4">
            <p className="text-lg leading-relaxed" style={{ color: "rgba(147,197,253,.7)" }}>
              نـحـن نـعـمـل بـشـغـف لـتـقـديـم تـجـربـة سـفـر لا تـُنـسـى، مـجـمـوعة مـتـكـامـلـة مـن الـخـدمـات تـلـبـي كـافـة احـتـيـاجـاتـك.
            </p>
          </div>
        </div>

        {/* Enhanced Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card-premium group relative bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
              style={{
                animation: inView ? `floatUp .8s ease ${.2 + i * .15}s both` : "none",
                opacity: inView ? 1 : 0,
              }}>
              
              {/* Card Glow Effect */}
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                style={{ background: f.color }} />

              {/* Icon & Stat Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                  {f.emoji}
                </div>
                <div className="text-right">
                   <p className="text-5xl font-black italic opacity-10 absolute top-8 left-8 select-none" style={{ color: f.color }}>{f.stat}</p>
                   <p className="text-4xl font-black glow-text" style={{ color: "white" }}>{f.stat}</p>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-black text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300">{f.title}</h3>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(147,197,253,.75)" }}>{f.desc}</p>
              
              {/* Interactive Points */}
              <div className="space-y-4">
                {f.points.map((p, j) => (
                  <div key={j} className="flex items-center gap-4 group/item">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black transition-all duration-300 group-hover/item:scale-110"
                      style={{ background: `${f.color}20`, color: f.color, border: `1px solid ${f.color}40` }}>
                      ✓
                    </div>
                    <span className="text-sm font-medium transition-colors duration-300 group-hover/item:text-white" style={{ color: "rgba(255,255,255,.6)" }}>
                      {p}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
