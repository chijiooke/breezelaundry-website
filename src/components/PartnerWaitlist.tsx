"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { Sora } from "next/font/google";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

/* ------------------------------------------------------------------ */
/* Types & constants                                                     */
/* ------------------------------------------------------------------ */

interface FormValues {
  shopName: string;
  city: string;
  staffCount: string;
  whatsapp: string;
}

const CITY_OPTIONS = [
  "Lagos (Island)",
  "Lagos (Mainland)",
  "Abuja (FCT)",
  "Port Harcourt",
];

const EQUIPMENT_OPTIONS = [
  { id: "Washing machine", icon: "lucide:washing-machine" },
  { id: "Dryer",           icon: "lucide:wind"            },
  { id: "Delivery bike",   icon: "lucide:bike"            },
  { id: "Generator",       icon: "lucide:zap"             },
  { id: "POS machine",     icon: "lucide:smartphone"      },
];

const BENEFITS = [
  {
    icon: "lucide:users",
    text: "New customers routed directly to your shop",
  },
  {
    icon: "lucide:route",
    text: "Real-time order tracking for every client",
  },
  {
    icon: "lucide:receipt-text",
    text: "Automated billing and payment collection",
  },
];

/* ------------------------------------------------------------------ */
/* Validation                                                            */
/* ------------------------------------------------------------------ */

const schema = Yup.object({
  shopName: Yup.string()
    .min(2, "Shop name is too short")
    .required("Shop name is required"),
  city: Yup.string().required("Location is required"),
  staffCount: Yup.number()
    .typeError("Enter a number")
    .min(1, "Enter at least 1")
    .max(500, "Double-check this number")
    .required("Staff count is required"),
  whatsapp: Yup.string()
    .matches(
      /^[0-9]{10,11}$/,
      "Enter a valid Nigerian number (10–11 digits)"
    )
    .required("WhatsApp number is required"),
});

/* ------------------------------------------------------------------ */
/* Shared helpers                                                        */
/* ------------------------------------------------------------------ */

function FieldError({ msg }: { msg: string | null }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-[#EF4444]">
      <Icon icon="lucide:circle-alert" width={13} />
      {msg}
    </p>
  );
}

function inputCls(hasError: boolean) {
  return clsx(
    "h-14 w-full rounded-[12px] border bg-white px-4 text-[15px] text-[#0F172A]",
    "outline-none transition-all duration-200",
    "placeholder:text-[#94A3B8]",
    hasError
      ? "border-[#EF4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.10)]"
      : "border-[#E2E8F0] focus:border-[#4B93D1] focus:shadow-[0_0_0_3px_rgba(75,147,209,0.12)]"
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                             */
/* ------------------------------------------------------------------ */

export default function PartnerWaitlist() {
  const [equipment, setEquipment] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      shopName:   "",
      city:       "Lagos (Island)",
      staffCount: "",
      whatsapp:   "",
    },
    validationSchema: schema,
    onSubmit: async (_, { setSubmitting }) => {
      await new Promise((r) => setTimeout(r, 1000));
      setSubmitted(true);
      setSubmitting(false);
    },
  });

  const toggleEquipment = (id: string) =>
    setEquipment((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const err = (name: keyof FormValues): string | null =>
    formik.touched[name] && formik.errors[name]
      ? String(formik.errors[name])
      : null;

  return (
    <div className={`${sora.variable} min-h-screen bg-[#F6F8FB]`}>
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* ── LEFT PANEL ── */}
        <aside className="relative hidden overflow-hidden bg-[#4B93D1] lg:flex lg:flex-col">
          <div className="flex h-full flex-col justify-between px-14 py-14">

            {/* Logo */}
            <div>
              <img
                src="https://res.cloudinary.com/deolwnm9f/image/upload/v1778484409/breezelaundry-wordmark-white_1_rucum3.svg"
                alt="breezelaundry"
                className="w-[140px]"
              />

              {/* Headline */}
              <div className="mt-20">
                <h1 className="font-sora text-[54px] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
                  More customers.
                  <br />
                  Less stress.
                </h1>

                <p className="mt-5 max-w-[320px] text-[16px] leading-relaxed text-white/75">
                  The operating system for modern laundry businesses in Lagos and Abuja.
                </p>
              </div>

              {/* Benefits */}
              <ul className="mt-10 space-y-4">
                {BENEFITS.map((b) => (
                  <li key={b.text} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15">
                      <Icon icon={b.icon} width={13} className="text-white" />
                    </span>
                    <span className="text-[15px] leading-snug text-white/85">
                      {b.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="border-t border-white/15 pt-8">
              <div className="flex gap-10">
                <div>
                  <p className="font-sora text-[32px] font-semibold text-white">400+</p>
                  <p className="mt-0.5 text-[13px] text-white/55">Partner shops</p>
                </div>
                <div>
                  <p className="font-sora text-[32px] font-semibold text-white">12,000+</p>
                  <p className="mt-0.5 text-[13px] text-white/55">Monthly orders</p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative circles */}
          <div className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-white/5" />
        </aside>

        {/* ── RIGHT PANEL ── */}
        <main className="flex items-start justify-center px-5 py-12 lg:px-16 lg:py-16">
          <div className="w-full max-w-[540px]">

            {/* Mobile brand mark */}
            <div className="mb-8 flex items-center gap-2 lg:hidden">
              <div className="h-7 w-7 rounded-lg bg-[#4B93D1]" />
              <span className="font-sora text-[17px] font-semibold text-[#0F172A]">
                breezelaundry
              </span>
            </div>

            {/* Page header */}
            <div>
              <p className="text-[13px] font-medium text-[#4B93D1]">
                Partner waitlist
              </p>
              <h2 className="mt-1.5 font-sora text-[34px] font-semibold leading-tight tracking-[-0.04em] text-[#0F172A]">
                Join the network
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#64748B]">
                Tell us about your shop. We&apos;ll reach out within 24 hours.
              </p>
            </div>

            {/* Form card */}
            <form
              noValidate
              onSubmit={formik.handleSubmit}
              className="mt-8 rounded-[24px] border border-[#E8EFF5] bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.03),0_12px_40px_rgba(15,23,42,0.04)] lg:p-9"
            >
              {/* Section label */}
              <div className="flex items-center gap-2 text-[#4B93D1]">
                <Icon icon="lucide:store" width={14} />
                <span className="text-[12px] font-medium tracking-wide">
                  Shop details
                </span>
              </div>

              {/* Shop name */}
              <div className="mt-6">
                <label className="mb-1.5 block text-[13px] font-medium text-[#0F172A]">
                  Shop name
                </label>
                <input
                  name="shopName"
                  placeholder="e.g. Sunny Dry Cleaners"
                  autoComplete="organization"
                  className={inputCls(!!err("shopName"))}
                  value={formik.values.shopName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FieldError msg={err("shopName")} />
              </div>

              {/* Location + Staff grid */}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {/* Location */}
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#0F172A]">
                    Location
                  </label>
                  <div className="relative">
                    <select
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={clsx(
                        inputCls(!!err("city")),
                        "cursor-pointer appearance-none pr-10"
                      )}
                    >
                      {CITY_OPTIONS.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <Icon
                      icon="lucide:chevron-down"
                      width={15}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                    />
                  </div>
                  <FieldError msg={err("city")} />
                </div>

                {/* Staff count */}
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#0F172A]">
                    Number of staff
                  </label>
                  <input
                    type="number"
                    name="staffCount"
                    placeholder="Washers, ironers..."
                    min={1}
                    className={inputCls(!!err("staffCount"))}
                    value={formik.values.staffCount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FieldError msg={err("staffCount")} />
                </div>
              </div>

              {/* Equipment */}
              <div className="mt-6">
                <label className="mb-3 block text-[13px] font-medium text-[#0F172A]">
                  Available equipment{" "}
                  <span className="font-normal text-[#94A3B8]">(optional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {EQUIPMENT_OPTIONS.map((item) => {
                    const active = equipment.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleEquipment(item.id)}
                        className={clsx(
                          "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium transition-all duration-150",
                          active
                            ? "border-[#4B93D1]/20 bg-[#EAF4FC] text-[#4B93D1]"
                            : "border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#CBD5E1] hover:text-[#334155]"
                        )}
                      >
                        <Icon icon={item.icon} width={13} />
                        {item.id}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="my-7 border-t border-[#F1F5F9]" />

              {/* WhatsApp */}
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#0F172A]">
                  WhatsApp number
                </label>
                <div
                  className={clsx(
                    "flex h-14 overflow-hidden rounded-[12px] border transition-all duration-200",
                    err("whatsapp")
                      ? "border-[#EF4444] focus-within:shadow-[0_0_0_3px_rgba(239,68,68,0.10)]"
                      : "border-[#E2E8F0] focus-within:border-[#4B93D1] focus-within:shadow-[0_0_0_3px_rgba(75,147,209,0.12)]"
                  )}
                >
                  <div className="flex shrink-0 items-center gap-1.5 border-r border-[#E2E8F0] bg-[#F8FAFC] px-4 text-[14px] text-[#64748B]">
                    <Icon icon="lucide:flag" width={13} />
                    +234
                  </div>
                  <input
                    type="tel"
                    name="whatsapp"
                    placeholder="801 234 5678"
                    autoComplete="tel"
                    className="min-w-0 flex-1 bg-transparent px-4 text-[15px] text-[#0F172A] outline-none placeholder:text-[#94A3B8]"
                    value={formik.values.whatsapp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {err("whatsapp") ? (
                  <FieldError msg={err("whatsapp")} />
                ) : (
                  <p className="mt-1.5 text-[13px] text-[#94A3B8]">
                    We&apos;ll use this to coordinate your onboarding.
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={clsx(
                  "mt-8 h-14 w-full rounded-[14px] text-[15px] font-medium text-white",
                  "bg-[#4B93D1] shadow-[0_6px_20px_rgba(75,147,209,0.22)]",
                  "transition-all duration-200",
                  "hover:bg-[#4388C5] hover:shadow-[0_8px_24px_rgba(75,147,209,0.30)]",
                  "disabled:cursor-not-allowed disabled:opacity-55 disabled:shadow-none"
                )}
              >
                {formik.isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Icon
                      icon="lucide:loader-circle"
                      width={16}
                      className="animate-spin"
                    />
                    Submitting...
                  </span>
                ) : (
                  "Join the network"
                )}
              </button>
            </form>

            {/* Footer */}
            <p className="mt-5 text-center text-[12px] text-[#94A3B8]">
              No commitment required. We&apos;ll be in touch within 24 hours.
            </p>
          </div>
        </main>
      </div>

      {/* ── SUCCESS OVERLAY ── */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#0F172A]/40 p-5 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-[400px] rounded-[24px] bg-white p-9 shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#22C55E]/10">
              <Icon icon="lucide:check" width={24} className="text-[#22C55E]" />
            </div>

            <h3 className="mt-5 font-sora text-[26px] font-semibold tracking-[-0.03em] text-[#0F172A]">
              You&apos;re on the list
            </h3>

            <p className="mt-2 text-[15px] leading-relaxed text-[#64748B]">
              A partner manager will reach out shortly to coordinate your
              onboarding.
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="mt-7 h-12 w-full rounded-[14px] border border-[#E2E8F0] text-[15px] font-medium text-[#0F172A] transition-all duration-150 hover:bg-[#F8FAFC]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
