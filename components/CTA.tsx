"use client";

import { useInView } from "@/hooks/useInView";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Phone, MessageCircle } from "lucide-react";


export function CTA() {
  const { data: settings } = useSiteSettings();
  const [ref, inView] = useInView();

  const phones = settings?.contact.phones || ["+20 106 945 1177"];
  const whatsapp = settings?.whatsapp || "201018484871";

  return (
    <section id="contact" ref={ref} className="py-20 px-4">
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
              {phones.slice(0, 2).map(n => (
                <a key={n} href={`tel:${n}`}
                  className="btn-shine flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-white transition-all hover:scale-105"
                  style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.22)", boxShadow: "0 4px 20px rgba(0,0,0,.2)" }}>
                  <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  {n}
                </a>
              ))}
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="btn-shine flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", boxShadow: "0 4px 20px rgba(37,211,102,.35)" }}>
                <MessageCircle className="w-5 h-5 flex-shrink-0" />
                واتساب
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}
