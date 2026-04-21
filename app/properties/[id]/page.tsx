"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WAButton } from "@/components/WAButton";
import { useProperty } from "@/hooks/useProperty";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Building,
  Calendar,
  Star,
  Clock,
  UtensilsCrossed,
  Baby,
  Images,
  ArrowLeft,
} from "lucide-react";
import { idFromSlug } from "@/lib/slug";

export default function PropertyPage() {
  const params = useParams();
  const slug = params.id as string;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const propertyId = idFromSlug(slug);
  const { data: property, isLoading, error } = useProperty(propertyId);

  if (!slug) {
    return (
      <main className="min-h-screen" style={{ background: "#0a0e1a" }}>
        <Navbar />
        <div className="flex justify-center items-center min-h-[70vh]">
          <p className="text-white/50">لم يتم العثور على العقار</p>
        </div>
        <Footer />
        <WAButton />
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center min-h-[70vh]">
          <div className="text-center space-y-4">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-full border-2 border-[#c9a96e]/20" />
              <div
                className="absolute inset-0 rounded-full border-t-2 animate-spin"
                style={{ borderColor: "#c9a96e" }}
              />
            </div>
            <p
              className="text-sm tracking-widest uppercase"
              style={{ color: "#c9a96e", fontFamily: "serif" }}
            >
              جاري التحميل
            </p>
          </div>
        </div>
        <Footer />
        <WAButton />
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className="min-h-screen" style={{ background: "#f7f5f0" }}>
        <Navbar />
        <div className="flex justify-center items-center min-h-[70vh]">
          <div className="text-center">
            <h3
              className="text-2xl font-bold mb-3"
              style={{ color: "#081a4b" }}
            >
              حدث خطأ أثناء تحميل البيانات
            </h3>
            <p className="text-gray-400">
              {error?.message || "لم يتم العثور على العقار"}
            </p>
          </div>
        </div>
        <Footer />
        <WAButton />
      </main>
    );
  }

  const nextImage = () =>
    setActiveImageIndex((prev) => (prev + 1) % property.gallery.length);
  const prevImage = () =>
    setActiveImageIndex((prev) =>
      prev === 0 ? property.gallery.length - 1 : prev - 1
    );

  const stars = property.stars || 0;

  return (
    <main
      className="min-h-screen"
      dir="rtl"
    >
      <style>{`

        .gold { color: #c9a96e; }
        .gold-bg { background: #c9a96e; }
        .navy { color: #081a4b; }

        .hero-img {
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .hero-img:hover { transform: scale(1.02); }

        .thumb-btn {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .thumb-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 2px solid #c9a96e;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .thumb-btn.active::after { opacity: 1; }
        .thumb-btn:not(.active) { filter: brightness(0.65) saturate(0.7); }
        .thumb-btn:not(.active):hover { filter: brightness(0.85) saturate(0.9); }

        .nav-arrow {
          transition: all 0.25s ease;
          backdrop-filter: blur(8px);
        }
        .nav-arrow:hover {
          background: rgba(201,169,110,0.25) !important;
          border-color: #c9a96e !important;
        }

        .info-card {
          background: white;
          border: 1px solid rgba(201,169,110,0.15);
          transition: all 0.3s ease;
        }
        .info-card:hover {
          border-color: rgba(201,169,110,0.4);
          transform: translateY(-2px);
        }

        .divider-gold {
          height: 1px;
          background: linear-gradient(to left, transparent, #c9a96e55, transparent);
        }

        .book-btn {
          background: linear-gradient(135deg, #081a4b, #0d2460);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
       
        .book-btn:hover {  transform: translateY(-1px); box-shadow: 0 8px 30px rgba(8,26,75,0.35) !important; }

        .contact-btn {
          background: linear-gradient(135deg, #c9a96e, #b8935a);
          transition: all 0.3s ease;
        }
        .contact-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(201,169,110,0.4) !important;
        }

        .feature-chip {
          border: 1px solid rgba(201,169,110,0.25);
          background: rgba(201,169,110,0.06);
          transition: all 0.2s;
        }
        .feature-chip:hover {
          border-color: rgba(201,169,110,0.5);
          background: rgba(201,169,110,0.12);
        }

        .sticky-sidebar {
          position: sticky;
          top: 100px;
        }

        .breadcrumb-link {
          transition: color 0.2s;
        }
        .breadcrumb-link:hover { color: #c9a96e; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fadeInUp 0.6s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.2s; opacity: 0; }
        .delay-3 { animation-delay: 0.3s; opacity: 0; }
        .delay-4 { animation-delay: 0.4s; opacity: 0; }

        .progress-bar {
          height: 2px;
          background: rgba(201,169,110,0.2);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
        }
        .progress-fill {
          height: 100%;
          background: #c9a96e;
          transition: width 0.4s ease;
        }

        /* Scrollbar */
        .custom-scroll::-webkit-scrollbar { height: 3px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #c9a96e55; border-radius: 99px; }
      `}</style>

      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="pt-28 pb-0 px-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-xs mb-6 fade-in-up">
          <Link href="/" className="breadcrumb-link" style={{ color: "#9ca3af" }}>
            الرئيسية
          </Link>
          <ArrowLeft className="w-3 h-3" style={{ color: "#9ca3af" }} />
          <Link
            href="/properties"
            className="breadcrumb-link"
            style={{ color: "#9ca3af" }}
          >
            العقارات
          </Link>
          <ArrowLeft className="w-3 h-3" style={{ color: "#9ca3af" }} />
          <span style={{ color: "#c9a96e" }}>{property.name}</span>
        </div>
      </div>

      {/* ── Hero Gallery ── */}
      <section className="pb-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 ${property.gallery.length > 1 ? 'lg:grid-cols-[1fr_280px]' : ''} gap-4`}>

            {/* Main image */}
            <div
              className="relative rounded-2xl overflow-hidden fade-in-up"
              style={{ height: "500px" }}
            >
              <div className="w-full h-full overflow-hidden">
                <img
                  src={property.gallery[activeImageIndex]}
                  alt={property.name}
                  className="hero-img w-full h-full object-cover"
                />
              </div>

              {/* Gradient overlay bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-40"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8,26,75,0.7), transparent)",
                }}
              />

              {/* Top badges */}
              <div className="absolute top-5 right-5 flex items-center gap-2">
                <span
                  className="px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{
                    background: "rgba(8,26,75,0.7)",
                    color: "#c9a96e",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(201,169,110,0.3)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {property.type.label}
                </span>
                {stars > 0 && (
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
                    style={{
                      background: "rgba(201,169,110,0.15)",
                      color: "#c9a96e",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(201,169,110,0.3)",
                    }}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    {stars} نجوم
                  </span>
                )}
              </div>

              {/* Navigation arrows */}
              {property.gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="nav-arrow absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white"
                    style={{
                      background: "rgba(8,26,75,0.4)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="nav-arrow absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white"
                    style={{
                      background: "rgba(8,26,75,0.4)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Bottom info */}
              <div className="absolute bottom-5 right-5 left-5 flex items-end justify-between">
                <div>
                  <h1
                    className="text-2xl md:text-3xl font-bold text-white mb-1"
                    style={{ textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}
                  >
                    {property.name}
                  </h1>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <MapPin className="w-3.5 h-3.5" style={{ color: "#c9a96e" }} />
                    <span>{property.city.name}</span>
                    {property.address && (
                      <>
                        <span className="opacity-40">·</span>
                        <span className="opacity-80 text-xs">{property.address}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Counter pill */}
                <div
                  className="px-3 min-w-[70px] justify-center py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5"
                  style={{
                    background: "rgba(8,26,75,0.6)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <Images className="w-3 h-3" style={{ color: "#c9a96e" }} />
                  {activeImageIndex + 1} / {property.gallery.length}
                </div>
              </div>

              {/* Progress bar */}
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${((activeImageIndex + 1) / property.gallery.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Thumbnail strip — vertical on desktop */}
            {property.gallery.length > 1 && (
              <div className="hidden lg:flex flex-col gap-2.5 overflow-y-auto max-h-[520px] custom-scroll pl-1">
                {property.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`thumb-btn flex-shrink-0 w-full h-[118px] rounded-xl overflow-hidden ${activeImageIndex === index ? "active" : ""}`}
                  >
                    <img
                      src={img}
                      alt={`صورة ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile thumbnail strip */}
          {property.gallery.length > 1 && (
            <div className="lg:hidden flex gap-2.5 overflow-x-auto mt-3 pb-1 custom-scroll">
              {property.gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`thumb-btn flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden ${activeImageIndex === index ? "active" : ""}`}
                >
                  <img
                    src={img}
                    alt={`صورة ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── Left: Details ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Stats chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 fade-in-up delay-1">
                {[
                  { icon: Building, label: "النوع", value: property.type.label },
                  { icon: MapPin, label: "المدينة", value: property.city.name },
                  {
                    icon: Star,
                    label: "التصنيف",
                    value: stars > 0 ? `${stars} نجوم` : "—",
                  },
                  {
                    icon: Images,
                    label: "معرض الصور",
                    value: `${property.gallery.length} صورة`,
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="feature-chip rounded-2xl p-4 text-center"
                  >
                    <Icon
                      className="w-4 h-4 mx-auto mb-2"
                      style={{ color: "#c9a96e" }}
                    />
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest mb-1"
                      style={{ color: "#9ca3af" }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-sm font-bold"
                      style={{ color: "#081a4b" }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div
                className="info-card rounded-2xl p-7 fade-in-up delay-2"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="w-1 h-6 rounded-full"
                    style={{ background: "#c9a96e" }}
                  />
                  <h2
                    className="text-lg font-bold"
                    style={{ color: "#081a4b" }}
                  >
                    نبذة عن العقار
                  </h2>
                </div>
                <div className="divider-gold mb-5" />
                <div
                  className="text-sm leading-loose"
                  style={{ color: "#4b5563" }}
                  dangerouslySetInnerHTML={{ __html: property.description || "" }}
                />
              </div>

              {/* Booking Policy + Meal Plans */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 fade-in-up delay-3">

                {/* Booking Policy */}
                <div className="info-card rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4" style={{ color: "#c9a96e" }} />
                    <h3
                      className="text-sm font-bold"
                      style={{ color: "#081a4b" }}
                    >
                      سياسة الحجز
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        label: "وقت الوصول",
                        value: property.check_in?.slice(0, 5) || "—",
                      },
                      {
                        label: "وقت المغادرة",
                        value: property.check_out?.slice(0, 5) || "—",
                      },
                      {
                        label: "نوع الحجز",
                        value:
                          property.in_type === "nightly"
                            ? "ليلي"
                            : property.in_type || "—",
                      },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center py-2"
                        style={{ borderBottom: "1px solid rgba(201,169,110,0.1)" }}
                      >
                        <span className="text-xs" style={{ color: "#9ca3af" }}>
                          {label}
                        </span>
                        <span
                          className="text-xs font-bold"
                          style={{ color: "#081a4b" }}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meal Plans */}
                <div className="info-card rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <UtensilsCrossed
                      className="w-4 h-4"
                      style={{ color: "#c9a96e" }}
                    />
                    <h3
                      className="text-sm font-bold"
                      style={{ color: "#081a4b" }}
                    >
                      خطط الوجبات
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {property.meal_plans?.length > 0 ? (
                      property.meal_plans.map(
                        (plan: { id: number; name: string }) => (
                          <div
                            key={plan.id}
                            className="flex items-center gap-2.5 py-1.5"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: "#c9a96e" }}
                            />
                            <span
                              className="text-xs"
                              style={{ color: "#4b5563" }}
                            >
                              {plan.name}
                            </span>
                          </div>
                        )
                      )
                    ) : (
                      <p className="text-xs" style={{ color: "#9ca3af" }}>
                        لا توجد خطط وجبات
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Child Policy */}
              {property.child_policy && (
                <div
                  className="rounded-2xl p-6 fade-in-up delay-4"
                  style={{
                    background: "rgba(201,169,110,0.06)",
                    border: "1px solid rgba(201,169,110,0.2)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Baby className="w-4 h-4" style={{ color: "#c9a96e" }} />
                    <h3
                      className="text-sm font-bold"
                      style={{ color: "#081a4b" }}
                    >
                      سياسة الأطفال
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>
                    {property.child_policy}
                  </p>
                </div>
              )}

              {/* Address */}
              {property.address && (
                <div className="info-card rounded-2xl p-6 fade-in-up delay-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4" style={{ color: "#c9a96e" }} />
                    <h3
                      className="text-sm font-bold"
                      style={{ color: "#081a4b" }}
                    >
                      الموقع
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>
                    {property.address}
                  </p>
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <div className="lg:col-span-1">
              <div
                className="sticky-sidebar rounded-2xl overflow-hidden"
                style={{
                  background: "white",
                  border: "1px solid rgba(201,169,110,0.2)",
                }}
              >
                {/* Sidebar header */}
                <div
                  className="px-6 py-5"
                  style={{
                    background: "linear-gradient(135deg, #081a4b, #0d2460)",
                  }}
                >
                  <p
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{ color: "#c9a96e" }}
                  >
                    احجز الآن
                  </p>
                  <h3 className="text-lg font-bold text-white">
                    {property.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-current"
                        style={{ color: "#c9a96e" }}
                      />
                    ))}
                  </div>
                </div>

                {/* Sidebar body */}
                <div className="p-6 space-y-3">
                  <Link
                    href={`/book/${slug}`}
                    className="book-btn w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm text-white relative z-10"
                    style={{ boxShadow: "0 4px 20px rgba(8,26,75,0.25)" }}
                  >
                    <Calendar className="w-4 h-4" style={{ color: "#c9a96e" }} />
                    احجز الآن
                  </Link>

                  <Link
                    href="/contact"
                    className="contact-btn w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm text-white"
                    style={{ boxShadow: "0 4px 20px rgba(201,169,110,0.2)" }}
                  >
                    <Phone className="w-4 h-4" />
                    تواصل معنا
                  </Link>
                </div>

                {/* Quick info */}
                <div
                  className="mx-6 mb-6 rounded-xl p-4 space-y-3"
                  style={{
                    background: "#f7f5f0",
                    border: "1px solid rgba(201,169,110,0.15)",
                  }}
                >
                  {[
                    {
                      label: "وقت الوصول",
                      value: property.check_in?.slice(0, 5) || "—",
                    },
                    {
                      label: "وقت المغادرة",
                      value: property.check_out?.slice(0, 5) || "—",
                    },
                    { label: "المدينة", value: property.city.name },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-xs" style={{ color: "#9ca3af" }}>
                        {label}
                      </span>
                      <span
                        className="text-xs font-bold"
                        style={{ color: "#081a4b" }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className="px-6 pb-5 text-center text-xs"
                  style={{ color: "#9ca3af" }}
                >
                  فريقنا متاح على مدار الساعة لمساعدتك
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WAButton />
    </main>
  );
}