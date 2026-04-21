"use client";

import { useFeaturedProperties } from "@/hooks/useFeaturedProperties";
import { useInView } from "@/hooks/useInView";
import { ChevronRight, MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { toSlug } from "@/lib/slug";
import Link from "next/link";

export function FeaturedProperties() {
  const [ref, inView] = useInView();
  const { data: properties = [], isLoading } = useFeaturedProperties();

  if (!isLoading && properties.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="py-20 px-4 overflow-hidden" style={{ background: "#f8faff" }}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-end justify-between px-4 mb-8" style={{
          animation: inView ? "floatUp .8s ease both" : "none",
          opacity: inView ? 1 : 0
        }}>
          <div className="text-right">
            <span className="tag-pill inline-flex mb-4" style={{ color: "#FBBF24", borderColor: "rgba(251,191,36,.3)", background: "rgba(251,191,36,.1)" }}>
              ✦ العروض المميزة ✦
            </span>
            <h2 className="font-black mb-4" style={{ color: "#081a4b", fontSize: "clamp(2rem,5vw,3.5rem)" }}>
              أفضل الاختيارات
            </h2>
          </div>

          <div className="flex gap-3 mb-4">
            <button className="swiper-prev-btn w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-[#081a4b] hover:bg-[#081a4b] hover:text-white transition-all duration-300 cursor-pointer shadow-sm">
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="swiper-next-btn w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-[#081a4b] hover:bg-[#081a4b] hover:text-white transition-all duration-300 cursor-pointer shadow-sm">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          className="px-4"
          style={{
            animation: inView ? "floatUp .8s ease .2s both" : "none",
            opacity: inView ? 1 : 0
          }}
        >
          {isLoading ? (
            <div className="flex gap-6">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-80 h-[300px] rounded-3xl bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                prevEl: ".swiper-prev-btn",
                nextEl: ".swiper-next-btn",
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="pb-12"
            >
              {properties.map((property, i) => (
                <SwiperSlide key={property.id}>
                  <Link
                    href={`/properties/${toSlug(property.id, property.name)}`}
                    className="block group relative h-[400px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                  >
                    <img
                      src={property.cover}
                      alt={property.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 text-white/70 text-xs mb-2">
                        <span>{property.city.name}</span>
                        <MapPin className="w-3 h-3" />
                        <span className="mx-1">•</span>
                        <span>{property.type.label}</span>

                      </div>

                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-black text-xl">{property.name}</h3>
                        <ChevronRight className="w-5 h-5 scale-x-[-1] text-white opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #081a4b !important;
        }
        .swiper-button-disabled {
          opacity: 0.5;
          cursor: not-allowed !important;
        }
      `}</style>
    </section>
  );
}
