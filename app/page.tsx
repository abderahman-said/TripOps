"use client";

import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { WhyUs } from "@/components/WhyUs";
import { Reviews } from "@/components/Reviews";
import { CTA } from "@/components/CTA";

/* ─────────────────────────────────────────────
   ROOT PAGE
───────────────────────────────────────────── */
export default function AlRahmaanPage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Stats />
      <FeaturedProperties />
      <WhyUs />
      <Reviews />
      <CTA />
    </div>
  );
}
