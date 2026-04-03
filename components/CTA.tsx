"use client";

import { useInView } from "@/hooks/useInView";

export function CTA() {
  const [ref, inView] = useInView();
  return (
    <section id="contact" ref={ref} className="py-20 px-4"
      >
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center"
          style={{
            background: "linear-gradient(135deg,#081a4b 0%,#1565C0 60%,#1976D2 100%)",
            boxShadow: "0 30px 80px rgba(21,101,192,.38)",
            animation: inView ? "scaleIn .7s ease both" : "none",
            opacity: inView ? 1 : 0,
          }}>
          <div className="absolute inset-0 stars-bg" />
          {/* Blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none animate-blob"
            style={{ background: "radial-gradient(circle,rgba(251,191,36,.1),transparent)", transform: "translate(35%,-35%)" }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none animate-blob"
            style={{ background: "radial-gradient(circle,rgba(6,182,212,.1),transparent)", transform: "translate(-35%,35%)", animationDelay: "-4s" }} />

          <div className="relative z-10">
            <span className="tag-pill inline-flex mb-6" style={{ color: "#F59E0B", borderColor: "rgba(245,158,11,.4)", background: "rgba(245,158,11,.15)" }}>
              ✈ احجز رحلتك الآن
            </span>
            <h2 className="font-black text-white mb-4 mt-4"
              style={{ fontSize: "clamp(1.75rem,5vw,3rem)", letterSpacing: "-0.02em" }}>
              جاهز تبدأ مغامرتك؟
            </h2>
            <p className="mb-10 max-w-lg mx-auto" style={{ color: "rgba(147,197,253,.75)", lineHeight: 1.8 }}>
              تواصل معنا الآن وسيقوم فريقنا المتخصص بمساعدتك في تخطيط رحلة لا تُنسى بأفضل الأسعار
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {["+20 106 945 1177", "+20 100 328 7333"].map(n => (
                <a key={n} href={`tel:${n.replace(/\s/g, "")}`}
                  className="btn-shine flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-white transition-all hover:scale-105"
                  style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.22)", boxShadow: "0 4px 20px rgba(0,0,0,.2)" }}>
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.674 2.695a2 2 0 01-.45 1.955L8.5 10.12a11.065 11.065 0 005.38 5.38l.955-.948a2 2 0 011.955-.45l2.695.674A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z" />
                  </svg>
                  {n}
                </a>
              ))}
              <a href="https://wa.me/201069451177" target="_blank" rel="noopener noreferrer"
                className="btn-shine flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", boxShadow: "0 4px 20px rgba(37,211,102,.35)" }}>
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                واتساب
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
