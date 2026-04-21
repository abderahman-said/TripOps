// BookingForm.tsx
import { useState } from "react";
import { useBookingRequest } from "@/hooks/useBookingRequest";
import {
  User,
  Phone,
  Calendar,
  Users,
  Car,
  MapPin,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Sparkles,
  Shield,
  Headphones,
} from "lucide-react";

interface BookingFormProps {
  id: string;
}

interface Child {
  age: number;
}

interface ErrorMsgProps {
  field: string;
  fieldErrors: { [key: string]: string[] };
}

const ErrorMsg = ({ field, fieldErrors }: ErrorMsgProps) =>
  fieldErrors[field] ? (
    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5 font-medium">
      <AlertCircle className="w-3 h-3 flex-shrink-0" />
      {fieldErrors[field][0]}
    </p>
  ) : null;

const FieldLabel = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5 mb-1.5">
    {icon}
    {children}
  </p>
);

function BookingForm({ id }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    check_in: "",
    check_out: "",
    adults: 1,
    children: [] as Child[],
    transport_seats: 0,
    pickup_location: "",
    note: "",
  });

  const [childrenAges, setChildrenAges] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string[] }>(
    {},
  );
  const bookingRequest = useBookingRequest();

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleChildrenAgeChange = (index: number, age: string) => {
    const newAges = [...childrenAges];
    newAges[index] = age;
    setChildrenAges(newAges);
    const children = newAges
      .filter((a) => a && parseInt(a) >= 0)
      .map((a) => ({ age: parseInt(a) }));
    setFormData((prev) => ({ ...prev, children }));
  };

  const addChildAgeField = () => setChildrenAges((prev) => [...prev, ""]);

  const removeChildAgeField = (index: number) => {
    const newAges = childrenAges.filter((_, i) => i !== index);
    setChildrenAges(newAges);
    const children = newAges
      .filter((a) => a && parseInt(a) >= 0)
      .map((a) => ({ age: parseInt(a) }));
    setFormData((prev) => ({ ...prev, children }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    const bookingData = {
      property_id: parseInt(id),
      check_in: formData.check_in,
      check_out: formData.check_out,
      adults: formData.adults,
      children: formData.children,
      transport_seats: formData.transport_seats,
      name: formData.name,
      phone: formData.phone,
      pickup_location: formData.pickup_location,
      note: formData.note,
    };
    bookingRequest.mutate(bookingData, {
      onError: (error: Error) => {
        try {
          const parsed = JSON.parse(error.message);
          if (parsed?.errors) setFieldErrors(parsed.errors);
        } catch {}
      },
    });
  };

  const inputClass = (field: string) =>
    `w-full bg-white border-2 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 text-gray-800 placeholder:text-gray-400 ${
      fieldErrors[field]
        ? "border-red-300 focus:border-red-400 bg-red-50"
        : "border-gray-100 focus:border-blue-600 hover:border-gray-200"
    }`;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">
      <div className=" p-7 xl:p-10">
        <div className="flex items-center gap-3 mb-7">
          <div className="w-1 h-8 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-black text-slate-800">تفاصيل الحجز</h2>
            <p className="text-slate-400 text-xs mt-0.5">
              جميع الحقول المطلوبة مميزة بـ *
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FieldLabel icon={<User className="w-3 h-3" />}>
                الاسم الكامل *
              </FieldLabel>
              <input
                type="text"
                placeholder="محمد أحمد"
                required
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={inputClass("name")}
              />
              <ErrorMsg field="name" fieldErrors={fieldErrors} />
            </div>
            <div>
              <FieldLabel icon={<Phone className="w-3 h-3" />}>
                رقم الهاتف *
              </FieldLabel>
              <input
                type="tel"
                placeholder="010xxxxxxxx"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={inputClass("phone")}
              />
              <ErrorMsg field="phone" fieldErrors={fieldErrors} />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FieldLabel icon={<Calendar className="w-3 h-3" />}>
                تاريخ الوصول *
              </FieldLabel>
              <input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={formData.check_in}
                onChange={(e) => handleInputChange("check_in", e.target.value)}
                className={`${inputClass("check_in")} [color-scheme:light]`}
              />
              <ErrorMsg field="check_in" fieldErrors={fieldErrors} />
            </div>
            <div>
              <FieldLabel icon={<Calendar className="w-3 h-3" />}>
                تاريخ المغادرة *
              </FieldLabel>
              <input
                type="date"
                required
                min={
                  formData.check_in || new Date().toISOString().split("T")[0]
                }
                value={formData.check_out}
                onChange={(e) => handleInputChange("check_out", e.target.value)}
                className={`${inputClass("check_out")} [color-scheme:light]`}
              />
              <ErrorMsg field="check_out" fieldErrors={fieldErrors} />
            </div>
          </div>

          {/* Adults + Children */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FieldLabel icon={<Users className="w-3 h-3" />}>
                عدد الكبار *
              </FieldLabel>
              <input
                type="number"
                min="1"
                max="50"
                required
                value={formData.adults}
                onChange={(e) =>
                  handleInputChange("adults", parseInt(e.target.value))
                }
                className={inputClass("adults")}
              />
              <ErrorMsg field="adults" fieldErrors={fieldErrors} />
            </div>
            <div>
              <FieldLabel icon={<Users className="w-3 h-3" />}>
                عدد الأطفال
              </FieldLabel>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  value={childrenAges.length}
                  readOnly
                  className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-600 outline-none"
                />
                <button
                  type="button"
                  onClick={addChildAgeField}
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-indigo-50 text-indigo-600 border-2 border-indigo-100 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200"
                >
                  + أضف
                </button>
              </div>
              <ErrorMsg field="children" fieldErrors={fieldErrors} />
            </div>
          </div>

          {/* Children Ages */}
          {childrenAges.length > 0 && (
            <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-2xl p-4 border-2 border-indigo-100 space-y-2.5">
              <FieldLabel icon={null}>أعمار الأطفال (بالسنوات)</FieldLabel>
              {childrenAges.map((age, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="number"
                    min="0"
                    max="17"
                    placeholder={`عمر الطفل ${index + 1}`}
                    value={age}
                    onChange={(e) =>
                      handleChildrenAgeChange(index, e.target.value)
                    }
                    className="flex-1 bg-white border-2 border-indigo-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => removeChildAgeField(index)}
                    className="w-9 h-9 flex items-center justify-center bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Transport + Pickup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FieldLabel icon={<Car className="w-3 h-3" />}>
                مقاعد النقل
              </FieldLabel>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={formData.transport_seats}
                onChange={(e) =>
                  handleInputChange("transport_seats", parseInt(e.target.value))
                }
                className={inputClass("transport_seats")}
              />
              <ErrorMsg field="transport_seats" fieldErrors={fieldErrors} />
            </div>
            <div>
              <FieldLabel icon={<MapPin className="w-3 h-3" />}>
                موقع الاستلام
              </FieldLabel>
              <input
                type="text"
                placeholder="العنوان أو المنطقة"
                value={formData.pickup_location}
                onChange={(e) =>
                  handleInputChange("pickup_location", e.target.value)
                }
                className={inputClass("pickup_location")}
              />
              <ErrorMsg field="pickup_location" fieldErrors={fieldErrors} />
            </div>
          </div>

          {/* Notes */}
          <div>
            <FieldLabel icon={<FileText className="w-3 h-3" />}>
              ملاحظات إضافية
            </FieldLabel>
            <textarea
              placeholder="أي تفاصيل أو طلبات خاصة..."
              rows={3}
              value={formData.note}
              onChange={(e) => handleInputChange("note", e.target.value)}
              className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 hover:border-gray-200 transition-all resize-none text-gray-800 placeholder:text-gray-400"
            />
          </div>

          {/* General error */}
          {bookingRequest.isError && Object.keys(fieldErrors).length === 0 && (
            <div className="p-4 bg-red-50 border-2 border-red-100 rounded-xl text-red-600 text-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={bookingRequest.isPending}
            className={`w-full py-4 mt-1 rounded-2xl text-base font-black text-white transition-all duration-200 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 ${
              bookingRequest.isSuccess
                ? "bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-emerald-200"
                : "bg-gradient-to-r from-amber-400 to-amber-600 shadow-amber-200 hover:from-amber-500 hover:to-amber-700"
            }`}
          >
            {bookingRequest.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                جاري الإرسال...
              </span>
            ) : bookingRequest.isSuccess ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                تم إرسال الطلب بنجاح!
              </span>
            ) : (
              "احجز الآن ←"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
