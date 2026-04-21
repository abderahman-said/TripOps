import type { Metadata } from "next";
import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";
import 'react-calendar/dist/Calendar.css';
import { QueryProvider } from "@/providers/QueryProvider";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "600", "700", "900"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "TripOps | رحلات مصر",
  description: "TripOps - وجهتك الأولى للسفر والسياحة في مصر - رحلات داخلية ودينية وحجوزات طيران",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${tajawal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-cairo), var(--font-tajawal), sans-serif" }}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
