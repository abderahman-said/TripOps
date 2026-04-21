"use client";

import { useFeaturedProperties } from "@/hooks/useFeaturedProperties";
import { useInView } from "@/hooks/useInView";
import { ChevronRight, MapPin } from "lucide-react";

export function FeaturedProperties() {
  const [ref, inView] = useInView();
  const { data: properties = [], isLoading } = useFeaturedProperties();

  if (!isLoading && properties.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="py-20 px-4" style={{ background: "#f8faff" }}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-end justify-between mb-12 px-4" style={{ 
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
        </div>

        <div className="relative">
          <div 
            className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar"
            style={{ animation: inView ? "floatUp .8s ease .2s both" : "none", opacity: inView ? 1 : 0 }}
          >
            {isLoading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-80 h-52 rounded-3xl bg-gray-200 animate-pulse" />
              ))
            ) : (
              properties.map((property, i) => (
                <a
                  key={property.id}
                  href={`/properties/${property.id}`}
                  className="flex-shrink-0 w-80 h-52 rounded-3xl overflow-hidden group relative shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                  style={{ animation: inView ? `floatUp .6s ease ${.2 + i * .1}s both` : "none" }}
                >
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-white/70 text-xs mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{property.city.name}</span>
                      <span className="mx-1">•</span>
                      <span>{property.type.label}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-black text-xl">{property.name}</h3>
                      <ChevronRight className="w-5 h-5 text-white translate-x-0 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
