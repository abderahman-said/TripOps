"use client";

import { Phone, MessageCircle } from "lucide-react";

import { useSiteSettings } from "@/hooks/useSiteSettings";

interface FooterColumn {
  title: string;
  items: { label: string; href: string }[];
}

export function Footer() {
  const { data: settings } = useSiteSettings();

  const cols: FooterColumn[] = [
    {
      title: "الوجهات", items: [
        { label: "شرم الشيخ", href: "/search?query=شرم الشيخ" },
        { label: "الغردقة", href: "/search?query=الغردقة" },
        { label: "أسوان", href: "/search?query=أسوان" },
        { label: "الأقصر", href: "/search?query=الأقصر" },
        { label: "مكة المكرمة", href: "/search?query=مكة" }
      ]
    },
    {
      title: "الشركة", items: [
        { label: "من نحن", href: "/about" },
        { label: "تواصل معنا", href: "/contact" },
        { label: "سياسة الخصوصية", href: "#" },
        { label: "الشروط والأحكام", href: "#" }
      ]
    },
  ];

  const stripHtml = (html: string) => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, '');
  };

  const SOCIAL_LIST = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      href: settings?.social_media.facebook,
      label: "Facebook"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      href: settings?.social_media.instagram,
      label: "Instagram"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
      href: settings?.social_media.x,
      label: "Twitter"
    },
    { icon: <MessageCircle className="w-4 h-4" />, href: `https://wa.me/${settings?.whatsapp}`, label: "WhatsApp" },
  ];


  return (
    <footer style={{ background: "linear-gradient(180deg,#060f2e 0%,#081a4b 100%)" }}>
      {/* Wave */}
      <div style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%" }}>
          <path fill="#f8faff" d="M0,20 C360,60 1080,0 1440,40 L1440,0 L0,0 Z" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-5 pt-6 pb-12" dir="rtl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              {settings?.logo ? (
                <div className="w-20 h-16 rounded-xl overflow-hidden bg-white p-1">
                  <img src={settings.logo} alt={settings.name} className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-xl"
                  style={{ background: "linear-gradient(135deg,#F59E0B,#D97706)" }}>
                  {settings?.name ? settings.name.charAt(0) : "."}
                </div>
              )}
              
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: "rgba(147,197,253,.55)" }}>
              {settings?.about_us ? stripHtml(settings.about_us).substring(0, 150) + "..." : "وجهتك الأولى للسفر والسياحة في مصر. نقدم أفضل الرحلات الداخلية والدينية بأعلى جودة وأفضل الأسعار."}
            </p>
            {/* Socials */}

            <div className="flex gap-2">
              {SOCIAL_LIST.filter(s => s.href).map(s => (
                <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(147,197,253,.6)" }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {cols.map(col => (
            <div key={col.title}>
              <p className="text-white font-black text-sm mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.items.map(item => (
                  <li key={item.label}><a href={item.href} className="footer-link hover:text-yellow-400 transition-colors">{item.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-xs" style={{ color: "rgba(147,197,253,.4)" }}>
            Copyright © {new Date().getFullYear()} {settings?.name || "El-Rahman Tours"} — جميع الحقوق محفوظة
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {settings?.contact.phones.map(n => (
              <a key={n} href={`tel:${n}`}
                className="flex items-center gap-1.5 text-xs transition-colors duration-200 hover:text-yellow-400"
                style={{ color: "rgba(147,197,253,.5)" }}>
                <Phone className="w-3 h-3" />
                {n}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
