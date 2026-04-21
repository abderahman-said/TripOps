"use client";

import { useSiteSettings } from "@/hooks/useSiteSettings";
import { 
  Phone, Mail, MapPin, 
  Send, Loader2, MessageSquare, 
} from "lucide-react";

import { useState } from "react";

export default function ContactPage() {
  const { data: settings, isLoading } = useSiteSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const contactData = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "اتصل بنا",
      value: settings?.phone || "غير متوفر",
      link: `tel:${settings?.phone}`,
      color: "bg-blue-500"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "واتساب",
      value: settings?.whatsapp || "غير متوفر",
      link: `https://wa.me/${settings?.whatsapp}`,
      color: "bg-emerald-500"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "البريد الإلكتروني",
      value: settings?.contact?.email || "contact@tripops.com",
      link: `mailto:${settings?.contact?.email || "contact@tripops.com"}`,
      color: "bg-amber-500"
    }
  ];

  return (
    <div className="  min-h-screen">
      {/* Hero Section */}
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

      <div className="max-w-7xl mx-auto px-5  py-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Quick Contact Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactData.map((item, i) => (
              <a 
                key={i}
                href={item.link}
                className="block p-6 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className={`${item.color} p-4 rounded-2xl text-white shadow-lg shadow-blue-500/20`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider">{item.title}</h3>
                    <p className="text-[#081a4b] font-black text-lg dir-ltr">{item.value}</p>
                  </div>
                </div>
              </a>
            ))}

            {/* Social Media Card */}
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-[#081a4b] font-black text-xl mb-6">تابعنا على</h3>
              <div className="flex gap-4">
                {settings?.social_media?.facebook && (
                  <a href={settings.social_media.facebook} className="p-4 bg-slate-50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                )}
                {settings?.social_media?.instagram && (
                  <a href={settings.social_media.instagram} className="p-4 bg-slate-50 rounded-2xl hover:bg-pink-600 hover:text-white transition-all">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                )}

              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 md:p-12">
            <h2 className="text-3xl font-black text-[#081a4b] mb-8">أرسل لنا رسالة</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 mr-2">الاسم بالكامل</label>
                  <input 
                    type="text" 
                    placeholder="مثال: أحمد محمد"
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 mr-2">رقم الهاتف</label>
                  <input 
                    type="tel" 
                    placeholder="01xxxxxxxxx"
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 mr-2">الموضوع</label>
                <input 
                  type="text" 
                  placeholder="كيف يمكننا مساعدتك؟"
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 mr-2">الرسالة</label>
                <textarea 
                  rows={4} 
                  placeholder="اكتب رسالتك هنا..."
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none resize-none" 
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-12 py-5 bg-[#081a4b] text-white font-black rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                إرسال الرسالة
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
