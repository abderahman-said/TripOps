"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WAButton } from "@/components/WAButton";



function ContactHero() {
  return (
    <section className="relative min-h-[450px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1800&q=85" alt="Contact Us" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,26,75,.95) 0%, rgba(8,26,75,.6) 55%, rgba(8,26,75,.4) 100%)" }} />
        <div className="absolute inset-0 stars-bg opacity-50" />
      </div>

      <div className="relative z-10 text-center px-5 pt-16 animate-floatUp" dir="rtl">
        <span className="tag-pill mb-6 inline-flex" style={{ color: "#F59E0B", borderColor: "rgba(245,158,11,0.4)", background: "rgba(245,158,11,0.15)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
          تواصل معنا ✦
        </span>
        <h1 className="text-white font-black leading-tight mb-4" style={{ fontSize: "clamp(2.5rem,8vw,5rem)" }}>
          يسعدنا دائمًا <span className="shimmer-text">مساعدتك</span>
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
          نحن فريق الرحمن تورز، متواجدون على مدار الساعة للرد على استفساراتكم وتخطيط رحلاتكم بكل احترافية وجودة.
        </p>
      </div>

      <div className="absolute bottom-[-1px] left-0 right-0 z-10" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%" }}>
          <path fill="#f8faff" d="M0,55 C200,85 500,25 720,55 C940,85 1200,25 1440,55 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}

function ContactGrid() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', msg: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="py-24 px-4 bg-[#f8faff]" dir="rtl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Info Column */}
        <div className="space-y-8 animate-floatUp" style={{ animationDelay: '0.2s' }}>
          <div className="mb-10">
            <h2 className="text-[#081a4b] font-black text-4xl mb-4">اتصل بنا <span className="gold-text">مباشرة</span></h2>
            <p className="text-gray-500 leading-relaxed max-w-md">يمكنك التواصل معنا عبر الهاتف، الواتساب أو زيارة مكتبنا. نحن هنا لخدمتكم!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "ارقام الهاتف", val: "+20 106 945 1177", val2: "+20 100 328 7333", icon: "📞", color: "#F59E0B" },
              { title: "واتساب", val: "+20 106 945 1177", icon: "💬", color: "#25D366", link: "https://wa.me/201069451177" },
              { title: "البريد الإلكتروني", val: "info@elrahman-tours.com", icon: "📧", color: "#3B82F6" },
              { title: "العنوان", val: "القاهرة، مدينة نصر، شارع عباس العقاد", icon: "📍", color: "#EF4444" }
            ].map((card, i) => (
              <div key={i} className="stat-card glass rounded-3xl p-6 transition-all hover:scale-105"
                style={{
                  background: 'white',
                  boxShadow: '0 10px 30px rgba(8,26,75,0.06)',
                  border: '1px solid rgba(8,26,75,0.05)'
                }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: `${card.color}15`, color: card.color }}>
                  {card.icon}
                </div>
                <h3 className="font-bold text-[#081a4b] mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm mb-1">{card.val}</p>
                {card.val2 && <p className="text-gray-500 text-sm">{card.val2}</p>}
                {card.link && <a href={card.link} className="text-xs font-bold mt-3 block" style={{ color: card.color }}>تواصل الآن ←</a>}
              </div>
            ))}
          </div>

          {/* Socials Card */}
          <div className="glass rounded-3xl p-8" style={{ background: 'linear-gradient(135deg,#081a4b,#1565C0)', color: 'white' }}>
            <h3 className="font-black text-xl mb-4">تابعنا على السوشيال ميديا</h3>
            <div className="flex gap-4">
              {["f", "◎", "▶", "♪"].map((ic, i) => (
                <button key={ic} className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-sm font-bold glass transition-all hover:scale-110 hover:bg-yellow-400 hover:text-gray-900 border-none">
                  {ic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="animate-floatUp" style={{ animationDelay: '0.4s' }}>
          <div className="glass-dark rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
            style={{ background: 'rgba(8,26,75,0.98)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="absolute inset-0 stars-bg opacity-30" />

            <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
              <h3 className="text-white font-black text-2xl mb-6">ارسل لنا <span className="shimmer-text">رسالة</span></h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="الاسم بالكامل" required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/30 text-sm outline-none focus:border-yellow-400 focus:bg-white/10 transition-all" />
                <input type="email" placeholder="البريد الإلكتروني" required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/30 text-sm outline-none focus:border-yellow-400 focus:bg-white/10 transition-all" />
              </div>

              <input type="tel" placeholder="رقم الهاتف"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/30 text-sm outline-none focus:border-yellow-400 focus:bg-white/10 transition-all" />

              <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white/50 text-sm outline-none focus:border-yellow-400 transition-all appearance-none">
                <option>نوع الاستفسار</option>
                <option>حجز رحلة داخلية</option>
                <option>حجز عمرة/حج</option>
                <option>حجز طيران</option>
                <option>استفسار عام</option>
              </select>

              <textarea rows={4} placeholder="رسالتك ..." required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/30 text-sm outline-none focus:border-yellow-400 focus:bg-white/10 transition-all resize-none"></textarea>

              <button type="submit" className="w-full py-5 rounded-2xl font-black text-white btn-shine transition-all hover:scale-[1.02]"
                style={{ background: sent ? '#34D399' : 'linear-gradient(135deg,#F59E0B,#D97706)', boxShadow: '0 8px 25px rgba(245,158,11,0.3)' }}>
                {sent ? "✓ تم الإرسال بنجاح" : "🚀 ارسل الرسالة الآن"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section className="h-[450px] relative overflow-hidden grayscale contrast-[1.2] hover:grayscale-0 transition-all duration-700">
      <iframe
        title="Map"
        width="100%"
        height="100%"
        frameBorder="0"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.60385043812!2d31.188423405786415!3d30.059483320140226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296efbc603c!2z2KfZhNmC2KfZh9ix2KnYjCDZhdit2KfZgdi42Kkg2KfZhNmC2KfZh9ix2KnigKw!5e0!3m2!1sar!2seg!4v1700000000000"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade">
      </iframe>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(248,250,255,0.4) 0%, transparent 15%, transparent 85%, rgba(248,250,255,0.4) 100%)' }} />
    </section>
  );
}


export default function ContactPage() {
  return (
    <main className="bg-[#f8faff] min-h-screen">
      <Navbar />
      <ContactHero />
      <ContactGrid />
      <MapSection />
      <Footer />
      <WAButton />
    </main>
  );
}
