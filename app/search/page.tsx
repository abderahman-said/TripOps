"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WAButton } from "@/components/WAButton";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface Trip {
  id: string;
  title: string;
  titleEn: string;
  category: "domestic" | "religious" | "flight";
  price: string;
  img: string;
  slug: string;
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const ALL_TRIPS: Trip[] = [
  {
    id: "sharm",
    title: "شرم الشيخ",
    titleEn: "Sharm El Sheikh",
    category: "domestic",
    price: "1,200 ج.م",
    img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
    slug: "sharm-el-sheikh",
  },
  {
    id: "hurghada",
    title: "الغردقة",
    titleEn: "Hurghada",
    category: "domestic",
    price: "1,500 ج.م",
    img: "https://images.unsplash.com/photo-1510009489794-352fba48496d?w=800&q=80",
    slug: "hurghada",
  },
  {
    id: "matrouh",
    title: "مرسى مطروح",
    titleEn: "Marsa Matrouh",
    category: "domestic",
    price: "1,100 ج.م",
    img: "https://images.unsplash.com/photo-1570737197686-397227447f52?w=800&q=80",
    slug: "matrouh",
  },
  {
    id: "north-coast",
    title: "الساحل الشمالي",
    titleEn: "North Coast",
    category: "domestic",
    price: "2,200 ج.م",
    img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80",
    slug: "north-coast",
  },
  {
    id: "dahab",
    title: "دهب",
    titleEn: "Dahab",
    category: "domestic",
    price: "1,000 ج.م",
    img: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80",
    slug: "dahab",
  },
  {
    id: "aswan",
    title: "أسوان",
    titleEn: "Aswan",
    category: "domestic",
    price: "1,800 ج.م",
    img: "https://images.unsplash.com/photo-1571769267292-e24dfadebbdc?w=800&q=80",
    slug: "aswan",
  },
  {
    id: "luxor",
    title: "الأقصر",
    titleEn: "Luxor",
    category: "domestic",
    price: "1,900 ج.م",
    img: "https://images.unsplash.com/photo-1599572412431-7f8976c66657?w=800&q=80",
    slug: "luxor",
  },
  {
    id: "omra",
    title: "العمرة",
    titleEn: "Umrah",
    category: "religious",
    price: "8,500 ج.م",
    img: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80",
    slug: "omra",
  },
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */

function SearchContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("all");

  useEffect(() => {
    const cat = searchParams.get("cat");
    const q = searchParams.get("query");
    if (cat && ["domestic", "religious", "flight"].includes(cat)) {
      setActiveCat(cat);
    }
    if (q) {
      setQuery(q);
    }
  }, [searchParams]);

  const filteredTrips = useMemo(() => {
    return ALL_TRIPS.filter((t) => {
      const matchQuery = t.title.includes(query) || t.titleEn.toLowerCase().includes(query.toLowerCase());
      const matchCat = activeCat === "all" || t.category === activeCat;
      return matchQuery && matchCat;
    });
  }, [query, activeCat]);

  return (
    <>
      {/* Header / Search Area */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#081a4b]/5" />
          <div className="absolute top-0 left-0 w-full h-full stars-bg opacity-10" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center" dir="rtl">
          <span className="tag-pill mb-6 inline-flex" style={{ color: "#1565C0", borderColor: "rgba(21,101,192,0.2)", background: "rgba(21,101,192,0.05)" }}>
            ✦ ابحث عن مغامرتك القادمة ✦
          </span>
          <h1 className="text-[#081a4b] font-black text-4xl md:text-6xl mb-8">
            استكشف <span className="gold-text">جميع الرحلات</span>
          </h1>

          {/* Search Bar */}
          <div className="relative group max-w-2xl mx-auto mb-10">
            <div className="absolute inset-0 bg-white/40 blur-2xl group-hover:blur-3xl transition-all duration-500 rounded-3xl" />
            <div className="relative flex items-center bg-white rounded-3xl shadow-2xl p-2 border border-gray-100">
              <div className="flex-1 px-4 flex items-center">
                <svg className="w-5 h-5 text-gray-400 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="ابحث عن وجهة (مثلاً: شرم الشيخ)..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent py-4 text-[#081a4b] text-lg outline-none placeholder-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { id: "all", label: "الكل" },
              { id: "domestic", label: "رحلات داخلية" },
              { id: "religious", label: "رحلات دينية" },
              { id: "flight", label: "طيران" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${activeCat === cat.id
                    ? "bg-[#081a4b] text-white shadow-xl scale-105"
                    : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        <div className="absolute bottom-[-1px] left-0 right-0 z-10" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%" }}>
            <path fill="#f8faff" d="M0,55 C200,85 500,25 720,55 C940,85 1200,25 1440,55 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-12 px-4" dir="rtl">
        <div className="max-w-7xl mx-auto">
          {filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#081a4b]/20 hover:-translate-y-3 hover:rotate-1 transition-all duration-500 group border border-gray-100/50 flex flex-col relative"
                >
                  {/* Image Area */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={trip.img}
                      alt={trip.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Text Over Image */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black/0 group-hover:bg-black/20 transition-all duration-500">
                      <h3 className="text-white font-black text-3xl mb-1 drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500">{trip.title}</h3>
                      <p className="text-white/90 font-bold text-sm tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        {trip.titleEn}
                      </p>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black bg-white/20 backdrop-blur-md text-white border border-white/30 uppercase">
                        {trip.category === "domestic" ? "داخلية" : trip.category === "religious" ? "دينية" : "طيران"}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">السعر يبدأ من</p>
                        <p className="text-2xl font-black text-[#081a4b]">{trip.price}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#081a4b]/5 flex items-center justify-center text-xl">
                        🏖️
                      </div>
                    </div>

                    <a href={`/trips/${trip.slug}`} className="mt-auto">
                      <button className="w-full py-4 rounded-2xl cursor-pointer bg-[#081a4bf7] text-white font-black text-sm shadow-lg shadow-[#081a4bf7]/30 group-hover:shadow-[#081a4bf7]/50 group-hover:bg-[#081a4bf7] group-hover:scale-[1.02] active:scale-95 transition-all duration-300">
                        اكتشف الآن
                      </button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-4 animate-floatUp">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-black text-[#081a4b] mb-3">عفواً، لم نجد نتائج</h3>
              <p className="text-gray-500">جرب البحث بكلمة أخرى أو تغيير الفئات.</p>
              <button
                onClick={() => { setQuery(""); setActiveCat("all"); }}
                className="mt-6 text-[#1565C0] font-bold border-b border-[#1565C0]"
              >
                عرض كل الرحلات
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-[#f8faff]">
      <Navbar />
      <Suspense fallback={<div className="h-screen flex items-center justify-center">تحميل...</div>}>
        <SearchContent />
      </Suspense>
      <Footer />
      <WAButton />
    </main>
  );
}
