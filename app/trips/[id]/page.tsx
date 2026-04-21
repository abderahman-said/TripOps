"use client";

import { useState, useEffect, useRef } from "react";


/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface DayPlan {
  day: number;
  title: string;
  activities: string[];
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const DAY_PLANS: DayPlan[] = [
  {
    day: 1,
    title: "الوصول والاسترخاء",
    activities: [
      "الاستقبال في مطار شرم الشيخ الدولي والتسكين بالفندق",
      "وقت حر للاستمتاع بحمام السباحة والشاطئ",
      "عشاء فاخر بالفندق مع عرض حي"
    ]
  },
  {
    day: 2,
    title: "عالم البحار والمغامرة",
    activities: [
      "رحلة بحرية باليخت إلى جزيرة تيران",
      "الاستمتاع بالسنوركلينج ومشاهدة الشعاب المرجانية",
      "غداء على اليخت في عرض البحر",
      "جولة حرة في سوهو سكوير مساءً"
    ]
  },
  {
    day: 3,
    title: "سفاري الصحراء",
    activities: [
      "الانطلاق فجرًا في رحلة بيتش باجي بالصحراء",
      "شرب الشاي البدوي ومشاهدة شروق الشمس",
      "العودة للفندق للراحة والاستمتاع بمرافق الفندق",
      "سهرة بدوية في المساء مع رقص فنون شعبية"
    ]
  },
  {
    day: 4,
    title: "ذكرى لا تُنسى والعودة",
    activities: [
      "جولة حرة للتسوق في السوق القديم",
      "زيارة مسجد الصحابة ذو العمارة الفريدة",
      "المغادرة والتوجه للمطار للعودة بسلامة الله"
    ]
  }
];

const GALLERY = [
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
  "https://images.unsplash.com/photo-1510009489794-352fba48496d?w=800&q=80",
  "https://images.unsplash.com/photo-1570737197686-397227447f52?w=800&q=80",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80",
  "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80",
  "https://images.unsplash.com/photo-1445013517793-14e3046f5619?w=800&q=80",
];

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */

function TripHero() {
  return (
    <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1800&q=90"
          alt="Sharm El Sheikh"
          className="w-full h-full object-cover animate-scaleSlow"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081a4b] via-[#081a4b]/40 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 text-center px-4 animate-floatUp" dir="rtl">
        <span className="tag-pill mb-6 inline-flex" style={{ color: "#F59E0B", borderColor: "rgba(245,158,11,0.4)", background: "rgba(245,158,11,0.15)" }}>
          ✦ عروض 2026 الحصرية ✦
        </span>
        <h1 className="text-white font-black leading-tight mb-4" style={{ fontSize: "clamp(2.5rem,8vw,5.5rem)" }}>
          شرم <span className="shimmer-text">الشيخ</span>
        </h1>
        <p className="text-white/80 text-xl md:text-2xl font-bold max-w-2xl mx-auto">
          استمتع برحلتك مع أفضل عروض 2026🌴☀️
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="px-8 py-3 rounded-2xl bg-yellow-400 text-[#081a4b] font-black text-xl shadow-2xl">
            ابتداءً من 1,200 ج.م
          </div>
          <a href="https://wa.me/201069451177" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366] text-white font-black text-xl shadow-2xl hover:scale-105 transition-all btn-shine">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            احجز الآن
          </a>
        </div>
      </div>
      <div className="absolute bottom-[-1px] left-0 right-0 z-10" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%" }}>
          <path fill="#f8faff" d="M0,55 C200,85 500,25 720,55 C940,85 1200,25 1440,55 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}

function TripProgram() {
  return (
    <section className="py-24 px-4 bg-white" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[#081a4b] font-black text-4xl mb-4">برنامج <span className="gold-text">الرحلة</span></h2>
          <p className="text-gray-500">عيش تفاصيل المغامرة يوم بيوم مع برنامجنا المخطط بعناية</p>
        </div>

        <div className="space-y-8">
          {DAY_PLANS.map((plan, i) => (
            <div key={i} className="flex gap-6 relative group">
              {/* Day Number */}
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#081a4b] text-white flex items-center justify-center font-black text-2xl shadow-xl relative z-10">
                {plan.day}
              </div>
              {/* Connector */}
              {i !== DAY_PLANS.length - 1 && (
                <div className="absolute top-16 left-8 w-1 h-20 bg-[#081a4b]/5 -z-0" />
              )}
              {/* Content */}
              <div className="flex-1 pb-10">
                <h3 className="text-xl font-black text-[#081a4b] mb-4 mt-2">{plan.title}</h3>
                <ul className="space-y-3">
                  {plan.activities.map((act, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-600">
                      <span className="w-2 h-2 rounded-full bg-yellow-400" />
                      {act}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

 

function TripGallery() {
  return (
    <section className="py-24 px-4 bg-[#f8faff]" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[#081a4b] font-black text-4xl mb-4">معرض <span className="gold-text">الصور</span></h2>
          <p className="text-gray-500">استمتع بمشاهدة جمال الوجهة قبل سفرك</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY.map((img, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-3xl group cursor-pointer shadow-lg">
              <img
                src={img}
                alt={`Sharm ${i}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function TripPage() {
  return (
    <>
      <TripHero />
      <TripGallery />
      <TripProgram />
    </>
  );
}

