"use client";

import { useReviews } from "@/hooks/useReviews";
import { useInView } from "@/hooks/useInView";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useState } from "react";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export function Reviews() {
  const { data: reviews = [], isLoading } = useReviews();
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const toggleVideo = (id: number) => {
    const vid = document.getElementById(`review-video-${id}`) as HTMLVideoElement;
    if (vid) {
      if (vid.paused) {
        // Pause other clips if any (optional but good practice)
        reviews.forEach(r => {
          if (r.id !== id) {
            const other = document.getElementById(`review-video-${r.id}`) as HTMLVideoElement;
            if (other) other.pause();
          }
        });
        
        vid.muted = false;
        vid.play();
        setActiveVideo(id);
        if (swiperInstance && swiperInstance.autoplay) swiperInstance.autoplay.stop();
      } else {
        vid.pause();
        setActiveVideo(null);
        if (swiperInstance && swiperInstance.autoplay) swiperInstance.autoplay.start();
      }
    }
  };


  if (isLoading) {
    return (
      <div className="py-24 bg-[#f8faff] text-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  return (
    <section   className="pt-10 px-4 overflow-hidden" style={{ background: "#f8faff" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14"
           >
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
        <div className="relative"  >
          <Swiper
            onSwiper={setSwiperInstance}
            dir="rtl"

            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            loop={reviews.length > 2}
            autoplay={!activeVideo ? {
              delay: 5000,
              disableOnInteraction: false,
            } : false}
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
            {reviews.map((r) => (
              <SwiperSlide key={r.id} className="py-8 md:py-12">
                <div className="review-card glass-dark group relative rounded-[2rem] md:rounded-[3rem] p-5 md:p-8 transition-all duration-700 hover:-translate-y-4 border border-white/5 hover:border-yellow-400/20 shadow-2xl overflow-hidden" 
                     style={{ minHeight: "350px", mdMinHeight: "400px", display: 'flex', flexDirection: 'column', 
                     background: "radial-gradient(circle at 50% 50%, #0a2463 0%, #081a4b 100%)",
                     backdropFilter: "blur(40px)" } as any}>
                  
                  {/* Media Content Background */}
                  <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                    {r.type === 2 && r.media_url && (
                        <img src={r.media_url} alt={r.customer_name} className="w-full h-full object-cover" />
                    )}
                    {r.type === 3 && r.media_url && (
                        <video 
                          id={`review-video-${r.id}`}
                          src={r.media_url} 
                          className="w-full h-full object-cover" 
                          muted 
                          loop 
                          playsInline
                          onPlay={() => setActiveVideo(r.id)}
                          onPause={() => setActiveVideo(null)}
                          onEnded={() => setActiveVideo(null)}
                        />

                    )}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#081a4b] via-[#081a4b]/80 to-transparent z-[1]" />

                  {/* Header: Identity */}
                  <div className="relative z-10 flex items-center gap-4 mb-6 mt-auto">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-xl relative z-10 overflow-hidden border border-white/10"
                           style={{ background: "linear-gradient(135deg,#081a4b,#1565C0)" }}>
                        {r.customer_name ? r.customer_name.charAt(0) : "ر"}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-[10px] font-black bg-[#25D366]/20 text-[#25D366] px-2 py-0.5 rounded-full flex items-center gap-1">
                           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                             <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                             <path d="m9 12 2 2 4-4" />
                           </svg>
                           Verified
                        </span>

                        <p className="font-black text-white text-lg group-hover:text-yellow-400 transition-colors duration-300">{r.customer_name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Body Text / Icon */}
                  <div className="relative z-10">
                    {r.text && (
                        <p className="text-white/80 text-right text-sm leading-relaxed italic line-clamp-4">
                        " {r.text} "
                        </p>
                    )}
                    
                    {r.type === 3 && !activeVideo && (
                        <div 
                          onClick={(e) => { e.stopPropagation(); toggleVideo(r.id); }}
                          className="flex justify-center mt-4 group-hover:scale-110 transition-transform cursor-pointer relative z-[20]"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-yellow-400 animate-pulse">
                              <circle cx="12" cy="12" r="10" />
                              <polygon points="10 8 16 12 10 16 10 8" />
                            </svg>
                        </div>
                    )}


                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
