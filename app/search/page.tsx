"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WAButton } from "@/components/WAButton";
import { useProperties } from "@/hooks/useProperties";
import { useCities } from "@/hooks/useCities";
import { toSlug } from "@/lib/slug";

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */

function SearchContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("query") || "");
  const [activeCity, setActiveCity] = useState<number | null>(null);
  const {
    data: properties = [],
    isLoading,
    error,
    refetch,
  } = useProperties({ city_id: activeCity ?? undefined });
  const { data: cities = [] } = useCities();
  // const { data: properties = [], isLoading, error, refetch } = useProperties({ city_id: 4 });

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchQuery =
        property.name.toLowerCase().includes(query.toLowerCase()) ||
        property.city.name.toLowerCase().includes(query.toLowerCase());
      const matchCity = activeCity === null || property.city.id === activeCity;
      return matchQuery && matchCity;
    });
  }, [query, activeCity, properties]);

  return (
    <>
      {/* Header / Search Area */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#081a4b]/5" />
          <div className="absolute top-0 left-0 w-full h-full stars-bg opacity-10" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center" dir="rtl">
          <span
            className="tag-pill mb-6 inline-flex"
            style={{
              color: "#1565C0",
              borderColor: "rgba(21,101,192,0.2)",
              background: "rgba(21,101,192,0.05)",
            }}
          >
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
                <svg
                  className="w-5 h-5 text-gray-400 ml-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
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

          {/* Cities Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveCity(null)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                activeCity === null
                  ? "bg-[#F59E0B] text-white shadow-lg scale-105"
                  : "bg-white/70 text-gray-500 hover:bg-white border border-gray-200"
              }`}
            >
              جميع المدن
            </button>
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => setActiveCity(city.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  activeCity === city.id
                    ? "bg-[#F59E0B] text-white shadow-lg scale-105"
                    : "bg-white/70 text-gray-500 hover:bg-white border border-gray-200"
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>
        <div
          className="absolute bottom-[-1px] left-0 right-0 z-10"
          style={{ lineHeight: 0 }}
        >
          <svg
            viewBox="0 0 1440 80"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%" }}
          >
            <path
              fill="#f8faff"
              d="M0,55 C200,85 500,25 720,55 C940,85 1200,25 1440,55 L1440,80 L0,80 Z"
            />
          </svg>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-12 px-4" dir="rtl">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#081a4b]"></div>
                <p className="mt-4 text-gray-500">Loading properties...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">! </div>
              <h3 className="text-2xl font-black text-[#081a4b] mb-3">
                Error loading properties
              </h3>
              <p className="text-gray-500 mb-6">{error.message}</p>
              <button
                onClick={() => refetch()}
                className="px-6 py-3 bg-[#081a4b] text-white rounded-2xl font-bold hover:bg-[#081a4b]/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#081a4b]/20 hover:-translate-y-3 hover:rotate-1 transition-all duration-500 group border border-gray-100/50 flex flex-col relative"
                >
                  {/* Image Area */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={property.cover || "/placeholder-property.jpg"}
                      alt={property.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Text Over Image */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black/0 group-hover:bg-black/20 transition-all duration-500">
                      <h3 className="text-white font-black text-2xl mb-1 drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                        {property.name}
                      </h3>
                      <p className="text-white/90 font-bold text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        {property.city.name}
                      </p>
                    </div>

                    {/* Type Tag */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black bg-white/20 backdrop-blur-md text-white border border-white/30 uppercase">
                        {property.type.label}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
                          Location
                        </p>
                        <p className="text-lg font-black text-[#081a4b]">
                          {property.city.name}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#081a4b]/5 flex items-center justify-center text-xl">
                        {property.type.label === "Hotel" ||
                        property.type.label === "Hotel"
                          ? "Hotel"
                          : "Building"}
                      </div>
                    </div>

                    {/* Gallery Preview */}
                    {property.gallery && property.gallery.length > 0 && (
                      <div className="mb-4">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">
                          {property.gallery.length} Photos
                        </p>
                        <div className="flex gap-1">
                          {property.gallery.slice(0, 3).map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`Gallery ${index + 1}`}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          ))}
                          {property.gallery.length > 3 && (
                            <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                              +{property.gallery.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
 
                    <a
                      href={`/properties/${toSlug(property.id, property.name)}`}
                      className="mt-auto w-full py-4 rounded-2xl flex items-center justify-center bg-[#081a4bf7] text-white font-black text-sm shadow-lg shadow-[#081a4bf7]/30 group-hover:shadow-[#081a4bf7]/50 group-hover:bg-[#081a4bf7] group-hover:scale-[1.02] active:scale-95 transition-all duration-300"
                    >
                      عرض التفاصيل
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center py-24 px-4 animate-floatUp"
              dir="rtl"
            >
              {/* Illustration */}
              <div className="relative mb-8">
                <div className="w-32 h-32 rounded-full bg-[#081a4b]/5 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#081a4b]/10 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-[#081a4b]/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
                {/* floating dots */}
                <div
                  className="absolute top-1 right-1 w-3 h-3 rounded-full bg-blue-200 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="absolute bottom-2 left-0 w-2 h-2 rounded-full bg-indigo-200 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="absolute top-4 left-2 w-1.5 h-1.5 rounded-full bg-sky-300 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>

              {/* Text */}
              <h3 className="text-2xl font-black text-[#081a4b] mb-3 text-center">
                لا توجد نتائج مطابقة
              </h3>
              <p className="text-gray-400 text-sm text-center max-w-xs leading-relaxed mb-8">
                حاول تغيير كلمة البحث أو اختر تصنيفاً مختلفاً للعثور على ما تبحث
                عنه
              </p>

              {/* Suggestions */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {["الكل", "رحلات داخلية", "رحلات دينية"].map((label) => (
                  <span
                    key={label}
                    className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#081a4b]/5 text-[#081a4b]/50 border border-[#081a4b]/10"
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* Reset button */}
              <button
                onClick={() => {
                  setQuery("");
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#081a4b] text-white text-sm font-black shadow-lg shadow-[#081a4b]/20 hover:bg-[#081a4b]/90 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                إعادة تعيين البحث
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
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            تحميل...
          </div>
        }
      >
        <SearchContent />
      </Suspense>
      <Footer />
      <WAButton />
    </main>
  );
}
