"use client";

import { useParams } from "next/navigation";

import { useProperty } from "@/hooks/useProperty";
import { idFromSlug } from "@/lib/slug";
import { ArrowRight, MapPin, Building2, Clock, Utensils, Loader2 } from "lucide-react";
import BookingForm from "@/components/BookingForm";

export default function BookingPage() {
  const params = useParams();
  const slug = params.id as string;
  const propertyId = idFromSlug(slug);
  const { data: property, isLoading, error } = useProperty(propertyId);

  if (!slug) {
  if (!slug) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] px-4">
        <div className="text-center p-8 bg-white rounded-3xl shadow-lg max-w-sm w-full border border-slate-100">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🏠</span>
          </div>
          <h3 className="text-xl font-black text-slate-800 mb-2">لم يتم العثور على العقار</h3>
          <p className="text-slate-400 text-sm">معرف العقار مفقود أو غير صالح</p>
        </div>
      </div>
    );
  }

  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-400 text-sm font-medium">جاري تحميل تفاصيل العقار...</p>
        </div>
      </div>
    );
  }


  if (error || !property) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] px-4">
        <div className="text-center p-8 bg-white rounded-3xl shadow-lg max-w-sm w-full border border-slate-100">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h3 className="text-xl font-black text-slate-800 mb-2">خطأ في تحميل العقار</h3>
          <p className="text-slate-400 text-sm">{error?.message || "لم يتم العثور على العقار"}</p>
        </div>
      </div>
    );
  }


  return (
    <main className="min-h-screen " dir="rtl">


      <section className="pt-28 pb-16 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Back link */}
          <div className="mb-6">
            <a
              href={`/properties/${slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
            >
              <ArrowRight className="w-4 h-4" />
              العودة للعقار
            </a>
          </div>

          {/* Page heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-800 leading-tight">إتمام الحجز</h1>
            <p className="text-slate-400 text-sm mt-1">أكمل بياناتك لحجز هذا العقار</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* Property Summary */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="lg:sticky lg:top-28 space-y-4">

                {/* Property Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  {/* Top accent */}
                  <div className="h-1.5 bg-gradient-to-r from-amber-400 to-amber-600" />

                  <div className="p-5">
                    <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">
                      العقار المحجوز
                    </p>
                    <h2 className="text-lg font-black text-slate-800 mb-4 leading-snug">
                      {property.name}
                    </h2>

                    {/* Chips */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-100">
                        <MapPin className="w-3 h-3 text-blue-600" />
                        {property.city.name}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-100">
                        <Building2 className="w-3 h-3 text-blue-600" />
                        {property.type.label}
                      </span>
                    </div>

                    {/* Times */}
                    <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">
                      أوقات الدخول والخروج
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">وصول</p>
                        <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-100 text-amber-700 rounded-lg px-2.5 py-1 text-xs font-bold">
                          <Clock className="w-3 h-3" />
                          {property.check_in}
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">مغادرة</p>
                        <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-100 text-amber-700 rounded-lg px-2.5 py-1 text-xs font-bold">
                          <Clock className="w-3 h-3" />
                          {property.check_out}
                        </div>
                      </div>
                    </div>

                    {/* Meal Plans */}
                    {property.meal_plans && property.meal_plans.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2 flex items-center gap-1.5">
                          <Utensils className="w-3 h-3" />
                          خطط الوجبات
                        </p>
                        <div className="space-y-1.5">
                          {property.meal_plans.map((plan) => (
                            <div key={plan.id} className="flex items-center gap-2 text-sm text-slate-600 font-semibold">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                              {plan.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Help note */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                  <p className="text-xs text-blue-700 font-semibold leading-relaxed text-center">
                    💬 هل تحتاج مساعدة؟ تواصل معنا عبر واتساب وسنرد عليك فوراً
                  </p>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <BookingForm id={propertyId} />
            </div>

          </div>
        </div>
      </section>

    </>
  );
}