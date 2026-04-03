"use client";

import { DESTINATIONS } from "@/constants/landing";
import { useInView } from "@/hooks/useInView";

export function Destinations() {
  const [ref, inView] = useInView();
  return (
    <section id="destinations" ref={ref} className="py-24 px-4" style={{ background: "#f8faff" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16"
          style={{ animation: inView ? "floatUp .7s ease both" : "none", opacity: inView ? 1 : 0 }}>
          <span className="tag-pill mb-4 inline-flex" style={{ color: "#1565C0", borderColor: "rgba(21,101,192,0.25)", background: "rgba(21,101,192,0.07)" }}>
            ✦ وجهاتنا السياحية ✦
          </span>
          <h2 className="font-black mb-4 mt-4" style={{ color: "#081a4b", fontSize: "clamp(2rem,6vw,3.75rem)", letterSpacing: "-0.025em" }}>
            اختار وجهتك{" "}
            <span className="gradient-text">بسهولة</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto" style={{ lineHeight: 1.8 }}>
            اكتشف مجموعة الوجهات الرائعة التي تناسب جميع أنواع الرحلات سواء داخلية أو دينية أو طيران
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DESTINATIONS.map((d, i) => (
            <div key={i} className="dest-card rounded-3xl overflow-hidden group cursor-pointer"
              style={{
                boxShadow: "0 8px 40px rgba(8,26,75,0.12)",
                animation: inView ? `floatUp .7s ease ${.15 + i * .15}s both` : "none",
                opacity: inView ? 1 : 0,
                background: "white",
              }}>
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                <img src={d.img} alt={d.title} className="dest-img w-full h-full object-cover" />
                {/* Gradient */}
                <div className="absolute inset-0 transition-opacity duration-400"
                  style={{ background: "linear-gradient(to top, rgba(8,26,75,.92) 0%, rgba(8,26,75,.3) 55%, transparent 100%)" }} />
                {/* Top badges */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-yellow-400 text-gray-900 shadow-lg">
                    {d.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}>
                    {d.tag}
                  </span>
                </div>
                {/* Price */}
                <div className="absolute bottom-14 left-4 z-10">
                  <span className="px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-lg"
                    style={{ background: `${d.accent}dd`, backdropFilter: "blur(8px)" }}>
                    {d.price}
                  </span>
                </div>
                {/* Bottom text in image */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10 translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
                  <h3 className="text-lg font-black text-white">{d.title}</h3>
                  <p className="text-white/65 text-xs mt-0.5">{d.sub}</p>
                </div>
              </div>

              {/* Card footer */}
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-4">
                  {d.features.map(f => (
                    <span key={f} className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ background: `${d.accent}15`, color: d.accent, border: `1px solid ${d.accent}30` }}>
                      ✓ {f}
                    </span>
                  ))}
                </div>
                <a href={d.slug ? `/trips/${d.slug}` : "#"} className="w-full block">
                  <button className="w-full py-3 rounded-xl text-sm font-black text-white btn-shine transition-all hover:scale-[1.02] cursor-pointer"
                    style={{ background: `linear-gradient(135deg,${d.accent},${d.accent}99)`, boxShadow: `0 4px 15px ${d.accent}44` }}>
                    اكتشف الآن ←
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
