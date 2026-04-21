"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

export function WAButton() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 2200); return () => clearTimeout(t); }, []);
  return (
    <a href="https://wa.me/201069451177" target="_blank" rel="noopener noreferrer"
      aria-label="WhatsApp"
      style={{
        position: "fixed", bottom: "28px", left: "28px", zIndex: 200,
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
        transition: "all .5s cubic-bezier(.25,.46,.45,.94)",
      }}>
      {/* Pulse rings */}
      {[0, 0.6].map(d => (
        <span key={d} style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "#25D366", opacity: .35,
          animation: `pulse-ring 2.2s ease-out ${d}s infinite`,
        }} />
      ))}
      <div className="relative w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", boxShadow: "0 8px 28px rgba(37,211,102,.55)" }}>
        <MessageCircle className="w-7 h-7 text-white fill-current" />
      </div>
    </a>
  );
}
