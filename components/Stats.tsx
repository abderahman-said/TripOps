"use client";

import { useState, useEffect } from "react";
import { STATS } from "@/constants/landing";
import { useInView } from "@/hooks/useInView";
import { Plane, Star, Trophy, Globe } from "lucide-react";

function Counter({ target, inView }: { target: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  
  const numPart = target.replace(/[^0-9]/g, "");
  const suffix = target.replace(/[0-9,]/g, "");
  const numericTarget = parseInt(numPart, 10);

  useEffect(() => {
    if (!inView) return;
    
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // outCubic
      
      setCount(Math.floor(ease * numericTarget));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, numericTarget]);

  return <>{count.toLocaleString()}{suffix}</>;
}

export function Stats() {
  const [ref, inView] = useInView();
  
  return (
    <section ref={ref} className="pt-14 px-4" style={{ background: "#f8faff" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s, i) => {
          const iconMap: { [key: string]: React.FC<{ className?: string }> } = { 
            plane: Plane, 
            star: Star, 
            trophy: Trophy, 
            globe: Globe 
          };
          const Icon = iconMap[s.icon] || Globe;
          
          return (
            <div key={i} className="stat-card rounded-2xl p-6 text-center cursor-default"
              style={{
                background: "linear-gradient(135deg,#081a4b,#1565C0)",
                boxShadow: "0 8px 32px rgba(21,101,192,0.28)",
                animation: inView ? `floatUp .6s ease ${i * .1}s both` : "none",
                opacity: inView ? 1 : 0,
              }}>
              <Icon className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <p className="text-3xl font-black text-white mb-1">
                <Counter target={s.num} inView={inView} />
              </p>
              <p className="text-[13px] font-medium" style={{ color: "rgba(147,197,253,.8)" }}>{s.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

