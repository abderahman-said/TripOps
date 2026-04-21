"use client";

import { STATS } from "@/constants/landing";
import { useInView } from "@/hooks/useInView";
import { Plane, Star, Trophy, Globe } from "lucide-react";

export function Stats() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className="py-14 px-4" style={{ background: "#f8faff" }}>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s, i) => {
          const iconMap: { [key: string]: React.FC<{ className?: string }> } = { plane: Plane, star: Star, trophy: Trophy, globe: Globe };
          const Icon = iconMap[s.icon];
          return (
            <div key={i} className="stat-card rounded-2xl p-6 text-center cursor-default"
              style={{
                background: "linear-gradient(135deg,#081a4b,#1565C0)",
                boxShadow: "0 8px 32px rgba(21,101,192,0.28)",
                animation: inView ? `floatUp .6s ease ${i * .1}s both` : "none",
                opacity: inView ? 1 : 0,
              }}>
              <Icon className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <p className="text-3xl font-black text-white mb-1">{s.num}</p>
              <p className="text-[13px] font-medium" style={{ color: "rgba(147,197,253,.8)" }}>{s.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
