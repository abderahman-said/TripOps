"use client";

import { useInView } from "@/hooks/useInView";
import { 
  Users, Award, Compass, Heart, CheckCircle2, Users2, Building2, Globe2
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function AboutPage() {
  const { data: settings } = useSiteSettings();
  const [ref, inView] = useInView();

  const stats = [
    { icon: <Users2 className="w-8 h-8" />, label: "عميل سعيد", value: "10k+", color: "#F59E0B" },
    { icon: <Building2 className="w-8 h-8" />, label: "فندق شريك", value: "500+", color: "#3B82F6" },
    { icon: <Globe2 className="w-8 h-8" />, label: "وجهة سياحية", value: "15+", color: "#10B981" },
    { icon: <Award className="w-8 h-8" />, label: "عام خبرة", value: "12+", color: "#8B5CF6" },
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
        
        <h1 className="text-white font-black leading-tight mb-4" style={{ fontSize: "clamp(2.5rem,8vw,5rem)" }}>
          تعرف على <span className="shimmer-text">{settings?.name || "الرحمن تورز"}</span>
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
       قصة نجاح بدأت بشغف وتستمر بثقتكم
        </p>
      </div>

      <div className="absolute bottom-[-1px] left-0 right-0 z-10" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%" }}>
          <path fill="#f8faff" d="M0,55 C200,85 500,25 720,55 C940,85 1200,25 1440,55 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>

 
      

      <section className="py-24 px-5 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div ref={ref} className={inView ? "animate-floatUp" : "opacity-0"}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-bold text-sm mb-6">
            <Compass className="w-4 h-4" /> من نحن
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#081a4b] mb-8">نحن لا نصنع رحلات، بل <span className="text-blue-600">نصنع ذكريات لا تُنسى</span></h2>
          <div 
            className="prose prose-lg text-gray-600 leading-relaxed font-tajawal max-w-none prose-p:mb-4"
            dangerouslySetInnerHTML={{ __html: settings?.about_us || "<p>شركة رائدة في مجال السياحة والسفر، نسعى لتقديم أفضل الخدمات لعملائنا.</p>" }} 
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80" className="rounded-3xl shadow-xl h-64 w-full object-cover mt-12" alt="Travel" />
          <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80" className="rounded-3xl shadow-xl h-80 w-full object-cover" alt="Luxury" />
        </div>
      </section>

      <section className="py-20 bg-[#081a4b] text-white relative">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-3xl hover:bg-white/5 transition-all">
              <div className="flex justify-center mb-4" style={{ color: stat.color }}>{stat.icon}</div>
              <div className="text-3xl md:text-5xl font-black mb-2">{stat.value}</div>
              <div className="text-blue-200/60 font-bold text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-5 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#081a4b] mb-4">قيمنا الجوهرية</h2>
          <p className="text-gray-500">الشفافية، الجودة، والاهتمام بالتفاصيل هي ما يميزنا</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "الشفافية", desc: "نلتزم بتقديم كافة المعلومات بوضوح تام لبناء علاقة طويلة الأمد.", icon: <CheckCircle2 className="w-10 h-10 text-emerald-500" /> },
            { title: "الجودة", desc: "نختار أفضل أماكن الإقامة ووسائل النقل لضمان راحتكم.", icon: <Award className="w-10 h-10 text-yellow-500" /> },
            { title: "الإخلاص", desc: "فريقنا متواجد لخدمتكم والإجابة على استفساراتكم بكل اهتمام.", icon: <Heart className="w-10 h-10 text-rose-500" /> }
          ].map((v, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 hover:shadow-xl transition-all">
              <div className="mb-4">{v.icon}</div>
              <h3 className="text-xl font-black text-[#081a4b] mb-2">{v.title}</h3>
              <p className="text-gray-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
