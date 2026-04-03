"use client";

interface FooterColumn {
  title: string;
  items: { label: string; href: string }[];
}

export function Footer() {
  const cols: FooterColumn[] = [
    { title: "الرحلات", items: [
      { label: "الرحلات الداخلية", href: "/search?cat=domestic" },
      { label: "الرحلات الدينية", href: "/search?cat=religious" },
      { label: "الطيران", href: "/search?cat=flight" },
      { label: "العروض الخاصة", href: "/search" }
    ] },
    { title: "الوجهات", items: [
      { label: "شرم الشيخ", href: "/trips/sharm-el-sheikh" },
      { label: "الغردقة", href: "/search?query=الغردقة" },
      { label: "أسوان", href: "/search?query=أسوان" },
      { label: "الأقصر", href: "/search?query=الأقصر" },
      { label: "مكة المكرمة", href: "/search?query=مكة" }
    ] },
    { title: "الشركة", items: [
      { label: "من نحن", href: "/" },
      { label: "تواصل معنا", href: "/contact" },
      { label: "سياسة الخصوصية", href: "#" },
      { label: "الشروط والأحكام", href: "#" }
    ] },
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
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-xl"
                style={{ background: "linear-gradient(135deg,#F59E0B,#D97706)" }}>
                ر
              </div>
              <div>
                <p className="text-white font-black text-xl">الرحمن تورز</p>
                <p className="text-yellow-400 text-[10px] tracking-[.18em]">AL-RAHMAAN TOURS</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: "rgba(147,197,253,.55)" }}>
              وجهتك الأولى للسفر والسياحة في مصر. نقدم أفضل الرحلات الداخلية والدينية بأعلى جودة وأفضل الأسعار منذ أكثر من 12 عاماً.
            </p>
            {/* Socials */}
            <div className="flex gap-2">
              {[
                { ic: "f", label: "Facebook" },
                { ic: "◎", label: "Instagram" },
                { ic: "♪", label: "TikTok" },
                { ic: "▶", label: "YouTube" },
              ].map(s => (
                <a key={s.label} href="#" aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-200 hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(147,197,253,.6)" }}>
                  {s.ic}
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
            Copyright © 2024 El-Rahman Tours — جميع الحقوق محفوظة
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {["+20 106 945 1177", "+20 100 328 7333"].map(n => (
              <a key={n} href={`tel:${n.replace(/\s/g, "")}`}
                className="flex items-center gap-1.5 text-xs transition-colors duration-200 hover:text-yellow-400"
                style={{ color: "rgba(147,197,253,.5)" }}>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.674 2.695a2 2 0 01-.45 1.955L8.5 10.12a11.065 11.065 0 005.38 5.38l.955-.948a2 2 0 011.955-.45l2.695.674A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z" />
                </svg>
                {n}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
