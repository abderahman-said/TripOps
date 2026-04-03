"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WAButton } from "@/components/WAButton";

import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Destinations } from "@/components/Destinations";
import { WhyUs } from "@/components/WhyUs";
import { Reviews } from "@/components/Reviews";
import { CTA } from "@/components/CTA";

/* ─────────────────────────────────────────────
   ROOT PAGE
───────────────────────────────────────────── */
export default function AlRahmaanPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Destinations />
      <WhyUs />
      <Reviews />
      <CTA />
      <Footer />
      <WAButton />
    </main>
  );
}
