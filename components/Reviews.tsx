"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { REVIEWS } from "@/constants/landing";
import { useInView } from "@/hooks/useInView";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export function Reviews() {
  const [ref, inView] = useInView();

  return (
    <section ref={ref} className="py-24 px-4 overflow-hidden" style={{ background: "#f8faff" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14"
          style={{ animation: inView ? "floatUp .7s ease both" : "none", opacity: inView ? 1 : 0 }}>
          <div className="flex justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <h2 className="font-black mb-3" style={{ color: "#081a4b", fontSize: "clamp(2rem,6vw,3.75rem)", letterSpacing: "-0.025em" }}>
            آراء <span className="gradient-text">عملائنا</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">نفخر بثقة آلاف المسافرين الذين شاركونا رحلاتهم، استكشف قصص نجاحنا وتجاربهم الحقيقية</p>
        </div>

        {/* Swiper Slider */}
        <div className="relative" style={{ animation: inView ? "scaleIn .7s ease .25s both" : "none", opacity: inView ? 1 : 0 }}>
          <Swiper
            dir="rtl"
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
            }}
            className="review-swiper pb-16"
          >
            {REVIEWS.map((r, i) => (
              <SwiperSlide key={i} className="py-8 md:py-12">
                <div className="review-card glass-dark group relative rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 transition-all duration-700 hover:-translate-y-4 border border-white/5 hover:border-yellow-400/20 shadow-2xl" 
                     style={{ minHeight: "340px", display: 'flex', flexDirection: 'column', 
             background: "radial-gradient(circle at 50% 50%, #0a2463 0%, #081a4b 100%)" 
                     
                     , backdropFilter: "blur(40px)" }}>
                  
                  {/* Decorative Quote Icons */}
                  <div className="absolute top-10 left-10 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                    <svg width="40" height="30" viewBox="0 0 75 60" fill="white">
                      <path d="M21.5 0C9.6 0 0 9.6 0 21.5V60h30V30H10c0-6 4.7-10.7 10.7-10.8V0zM66.5 0C54.6 0 45 9.6 45 21.5V60h30V30H55c0-6 4.7-10.7 10.7-10.8V0z"/>
                    </svg>
                  </div>

                  {/* Header: Identity */}
                  <div className="relative z-10 flex items-center gap-5 mb-8">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-white font-black text-xl shadow-2xl relative z-10 overflow-hidden border border-white/10"
                           style={{ background: "linear-gradient(135deg,#081a4b,#1565C0)" }}>
                        {r.av}
                        <div className="absolute inset-0 bg-white/10 animate-pulse" />
                      </div>
                      <div className="absolute -inset-1 rounded-[1.25rem] bg-yellow-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end mb-1">
                         <span className="text-[10px] font-black bg-[#25D366]/20 text-[#25D366] px-2 py-0.5 rounded-full flex items-center gap-1">
                           <span className="w-1 h-1 bg-[#25D366] rounded-full animate-pulse" />
                           Verified
                         </span>
                         <p className="font-black text-white text-xl leading-tight group-hover:text-yellow-400 transition-colors duration-300">{r.name}</p>
                      </div>
                      <div className="flex items-center gap-2 justify-end opacity-50">
                        <span className="text-white text-xs font-bold tracking-wider">📍 {r.dest}</span>
                        <span className="w-0.5 h-0.5 bg-white rounded-full" />
                        <span className="text-white text-[10px] uppercase font-bold">{r.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating with Glow */}
                  <div className="relative z-10 flex gap-1.5 mb-8 justify-end">
                    {[...Array(5)].map((_, k) => (
                      <svg key={k} className={`w-3.5 h-3.5 ${k < r.rating ? 'text-yellow-400' : 'text-white/10'}`} 
                           style={{ filter: k < r.rating ? "drop-shadow(0 0 8px rgba(245,158,11,0.6))" : "none" }}
                           fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Body Text */}
                  <div className="relative z-10 flex-1">
                    <p className="text-white/70 text-right text-[16px] leading-[1.8] italic group-hover:text-white/90 transition-colors duration-500">
                      " {r.text} "
                    </p>
                  </div>
                  
                  {/* Subtle Accent Glow Bottom */}
                  <div className="absolute bottom-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
