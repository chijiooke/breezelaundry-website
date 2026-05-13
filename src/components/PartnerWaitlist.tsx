"use client";

import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { Sora } from "next/font/google";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { PartnerFormValues as FormValues } from "@/types/partner";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

const CITY_OPTIONS = ["Lagos (Island)", "Lagos (Mainland)", "Abuja (FCT)"];

const EQUIPMENT_OPTIONS = [
  { id: "Washing machine", icon: "lucide:washing-machine" },
  { id: "Dryer", icon: "lucide:wind" },
  { id: "Delivery bike", icon: "lucide:bike" },
  { id: "Generator", icon: "lucide:zap" },
  { id: "POS machine", icon: "lucide:smartphone" },
];

const BENEFITS = [
  {
    icon: "lucide:users",
    text: "We send new customer orders straight to your shop, no extra work for you",
  },
  {
    icon: "lucide:route",
    text: "Your customers can track their clothes from their phone",
  },
  {
    icon: "lucide:receipt-text",
    text: "Payments are collected for you — no stress",
  },
];

const VALUE_CARDS = [
  {
    icon: "lucide:monitor-smartphone",
    title: "Your shop, online in minutes",
    text: "No app to build. No website to pay for. We set up your shop page with your logo and details — your customers can find you, order, and pay right away (even from whatsapp).",
  },
  {
    icon: "lucide:clipboard-list",
    title: "Know your business, know your customers",
    text: "See every order, every personal customer, and every payment in one place. No more guessing how much came in or who owes you — your dashboard tracks it all.",
  },
  {
    icon: "lucide:truck",
    title: "No riders? No problem.",
    text: "Don't have a delivery system? We handle pickup and drop-off for you. Focus on cleaning the clothes — we'll worry about getting them there.",
  },
];

/* ------------------------------------------------------------------ */
/* Animation variants                                                    */
/* ------------------------------------------------------------------ */

// Shared easing — matches brand spec
const ease = [0.22, 1, 0.36, 1] as const;

// Staggered container — children animate in sequence
const stagger = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

// Fade up — used for most elements
const fadeUp = (delay = 0, distance = 18) => ({
  hidden: { opacity: 0, y: distance },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease, delay },
  },
});

// Fade in — used for subtle elements
const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease, delay },
  },
});

// Slide in from left — left panel hero
const slideLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease, delay },
  },
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
/* ValueCard — animates when scrolled into view                         */
/* ------------------------------------------------------------------ */

function ValueCard({
  card,
  index,
}: {
  card: (typeof VALUE_CARDS)[number];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeUp(index * 0.12, 12)}
      className="flex items-start gap-3 rounded-[12px] bg-[#0F172A] border border-white/[0.08] px-4 py-3.5"
    >
      <motion.span
        variants={fadeIn(index * 0.12 + 0.15)}
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#22C55E]/15"
      >
        <Icon icon={card.icon} width={15} className="text-[#4ADE80]" />
      </motion.span>
      <div>
        <motion.p
          variants={fadeUp(index * 0.12 + 0.08, 6)}
          className="text-[13px] font-semibold text-white"
        >
          {card.title}
        </motion.p>
        <motion.p
          variants={fadeUp(index * 0.12 + 0.14, 6)}
          className="mt-0.5 text-[12px] leading-relaxed text-white/60"
        >
          {card.text}
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                             */
/* ------------------------------------------------------------------ */

export default function PartnerWaitlist() {
  const [equipment, setEquipment] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [showFloatingBtn, setShowFloatingBtn] = useState(true);

  const formRef = useRef<HTMLElement>(null);
  const asideRef = useRef<HTMLElement>(null);

  // Hide floating CTA when left panel is not in view (desktop)
  useEffect(() => {
    const el = asideRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowFloatingBtn(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const formik = useFormik<FormValues>({
    initialValues: {
      ownerName: "",
      shopName: "",
      city: "Lagos (Island)",
      address: "",
      staffCount: "",
      whatsapp: "",
    },
    validationSchema: Yup.object({
      ownerName: Yup.string()
        .min(2, "Name is too short")
        .required("Your name is required"),
      shopName: Yup.string()
        .min(2, "Shop name is too short")
        .required("Shop name is required"),
      city: Yup.string().required("Location is required"),
      address: Yup.string()
        .min(5, "Address is too short")
        .required("Shop address is required"),
      staffCount: Yup.number()
        .typeError("Enter a number")
        .min(1, "Enter at least 1")
        .max(500, "Double-check this number")
        .required("Please enter a number"),
      whatsapp: Yup.string()
        .matches(
          /^[0-9]{10,11}$/,
          "Enter a valid Nigerian number (10–11 digits)"
        )
        .required("WhatsApp/Phone Number number is required "),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await fetch("/api/partner", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ownerName: values.ownerName,
            shopName: values.shopName,
            city: values.city,
            address: values.address,
            staffCount: Number(values.staffCount),
            whatsapp: values.whatsapp.replace(/^0/, ""),
            equipment,
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.success)
          throw new Error(data.error ?? "Submission failed");

        setSubmitted(true);
      } catch (err) {
        console.error("[partner submit]", err);
        setSubmitError(true);
      } finally {
        setSubmitting(false);
      }
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
        {/* ══════════════ LEFT PANEL ══════════════ */}
        <aside
          ref={asideRef}
          className="relative overflow-hidden bg-[#4B93D1] lg:flex lg:flex-col"
        >
          <div className="flex h-full flex-col justify-between px-14 py-14">
            {/* Logo */}
            <motion.div initial="hidden" animate="show" variants={fadeIn(0.1)}>
              <img
                src="https://res.cloudinary.com/deolwnm9f/image/upload/v1778484409/breezelaundry-wordmark-white_1_rucum3.svg"
                alt="breezelaundry"
                className="w-[140px]"
              />
            </motion.div>

            {/* Headline block */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger(0.08, 0.2)}
              className="mt-20"
            >
              <motion.h1
                variants={slideLeft(0)}
                className="font-sora text-[54px] font-semibold leading-[0.95] tracking-[-0.05em] text-white"
              >
                <span className="text-green-200">More customers.</span>
                <br />
                Less stress.
              </motion.h1>

              <motion.p
                variants={fadeUp(0, 10)}
                className="mt-5 max-w-[320px] text-[16px] leading-relaxed text-white/75"
              >
                We help laundry shops in Lagos and Abuja get more orders, handle
                customers, and grow their business.
              </motion.p>

              {/* Benefits */}
              <motion.ul
                variants={stagger(0.09, 0.1)}
                className="mt-10 space-y-4"
              >
                {BENEFITS.map((b) => (
                  <motion.li
                    key={b.text}
                    variants={fadeUp(0, 8)}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15">
                      <Icon icon={b.icon} width={13} className="text-white" />
                    </span>
                    <span className="text-[15px] leading-snug text-white/85">
                      {b.text}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Value cards — animate on scroll into view */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeIn(0.6)}
              className="border-t border-white/15 pt-8 space-y-3"
            >
              {VALUE_CARDS.map((card, i) => (
                <ValueCard key={card.title} card={card} index={i} />
              ))}
            </motion.div>
          </div>

          {/* Decorative circles */}
          <div className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-white/5" />
        </aside>

        {/* ══════════════ RIGHT PANEL ══════════════ */}
        <main
          ref={formRef}
          className="flex items-start justify-center px-5 py-12 lg:px-16 lg:py-16"
        >
          <motion.div
            className="w-full max-w-[540px]"
            initial="hidden"
            animate="show"
            variants={stagger(0.08, 0.15)}
          >
            {/* Mobile brand mark */}
            <motion.div
              variants={fadeIn(0)}
              className="mb-8 flex items-center gap-2 lg:hidden"
            >
              <img
                src="https://res.cloudinary.com/deolwnm9f/image/upload/v1778484409/breezelaundry-wordmark-white_1_rucum3.svg"
                alt="breezelaundry"
                className="w-[140px]"
              />
            </motion.div>

            {/* Page header */}
            <motion.div variants={fadeUp(0)}>
              <p className="text-[13px] font-medium text-[#4B93D1]">
                Partner waitlist
              </p>
              <h2 className="mt-1.5 font-sora text-[34px] font-semibold leading-tight tracking-[-0.04em] text-[#0F172A]">
                Join the network
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#64748B]">
                Fill in a few details about your shop. We&apos;ll call you
                within 24 hours to get you started.
              </p>
            </motion.div>

            {/* Form card */}
            <motion.form
              variants={fadeUp(0, 14)}
              noValidate
              onSubmit={formik.handleSubmit}
              className="mt-8 rounded-[24px] border border-[#E8EFF5] bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.03),0_12px_40px_rgba(15,23,42,0.04)] lg:p-9"
            >
              {/* Owner name */}
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#0F172A]">
                  Your name
                </label>
                <input
                  name="ownerName"
                  placeholder="e.g. Tunde Adeyemi"
                  autoComplete="name"
                  className={inputCls(!!err("ownerName"))}
                  value={formik.values.ownerName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FieldError msg={err("ownerName")} />
              </div>

              {/* Section label */}
              <div className="mt-7 flex items-center gap-2 text-[#4B93D1]">
                <Icon icon="lucide:store" width={14} />
                <span className="text-[12px] font-medium tracking-wide">
                  Shop details
                </span>
              </div>

              {/* Shop name */}
              <div className="mt-4">
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

              {/* Address */}
              <div className="mt-4">
                <label className="mb-1.5 block text-[13px] font-medium text-[#0F172A]">
                  Shop address
                </label>
                <input
                  name="address"
                  placeholder="e.g. 14 Bode Thomas St, Surulere"
                  autoComplete="street-address"
                  className={inputCls(!!err("address"))}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FieldError msg={err("address")} />
              </div>

              {/* Location + Staff grid */}
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
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

                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#0F172A]">
                    Number of workers
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
              <div className="mt-5">
                <label className="mb-3 block text-[13px] font-medium text-[#0F172A]">
                  Available equipment{" "}
                  <span className="font-normal text-[#94A3B8]">(optional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {EQUIPMENT_OPTIONS.map((item) => {
                    const active = equipment.includes(item.id);
                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        onClick={() => toggleEquipment(item.id)}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.12, ease }}
                        className={clsx(
                          "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium transition-all duration-150",
                          active
                            ? "border-[#4B93D1]/20 bg-[#EAF4FC] text-[#4B93D1]"
                            : "border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#CBD5E1] hover:text-[#334155]"
                        )}
                      >
                        <Icon icon={item.icon} width={13} />
                        {item.id}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-[#F1F5F9]" />

              {/* WhatsApp */}
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#0F172A]">
                  Phone number (Preferably WhatsApp)
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
                    We&apos;ll reach out on this number to get you set up.
                  </p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={formik.isSubmitting}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.12, ease }}
                className={clsx(
                  "mt-8 h-14 w-full rounded-[14px] text-[15px] font-medium text-white",
                  "bg-[#4B93D1] transition-all duration-200",
                  "hover:enabled:bg-[#4388C5] hover:enabled:shadow-[0_8px_24px_rgba(75,147,209,0.30)]",
                  "disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                )}
              >
                {formik.isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Icon
                      icon="lucide:loader-circle"
                      width={16}
                      className="animate-spin"
                    />
                    Submitting…
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Icon icon="lucide:arrow-right" width={15} />
                    Join the network
                    <span className="flex items-center gap-1 rounded-full bg-[#22C55E] px-2.5 py-0.5 text-[11px] font-semibold">
                      ₦0 · Free
                    </span>
                  </span>
                )}
              </motion.button>
            </motion.form>

            {/* Footer note */}
            <motion.p
              variants={fadeIn(0.5)}
              className="mt-5 text-center text-[12px] text-[#94A3B8]"
            >
              No commitment. No fee. We&apos;ll call you within 24 hours.
            </motion.p>
          </motion.div>
        </main>
      </div>

      {/* ══════════════ MOBILE FLOATING CTA ══════════════ */}
      <AnimatePresence>
        {showFloatingBtn && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease }}
            className="fixed bottom-6 left-0 right-0 z-40 flex justify-center px-5 lg:hidden"
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.12, ease }}
              onClick={() =>
                formRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex h-14 items-center gap-2 rounded-[14px] bg-[#0F172A] px-8 text-[15px] font-medium text-white shadow-[0_8px_28px_rgba(15,23,42,0.30)]"
            >
              <Icon icon="lucide:pencil-line" width={16} />
              Get your free spot
              <span className="ml-1 flex items-center gap-1 rounded-full bg-[#22C55E] px-2.5 py-0.5 text-[12px] font-semibold tracking-wide text-white">
                ₦0 · Free
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════ SUCCESS OVERLAY ══════════════ */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-[#0F172A]/40 p-5 backdrop-blur-sm sm:items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.35, ease }}
              className="w-full max-w-[400px] rounded-[24px] bg-white p-9 shadow-[0_20px_60px_rgba(15,23,42,0.10)]"
            >
              {/* Check icon — bounces in */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.15,
                  duration: 0.4,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-[#22C55E]/10"
              >
                <Icon
                  icon="lucide:check"
                  width={24}
                  className="text-[#22C55E]"
                />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.4, ease }}
                className="mt-5 font-sora text-[26px] font-semibold tracking-[-0.03em] text-[#0F172A]"
              >
                You&apos;re on the list
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.4, ease }}
                className="mt-2 text-[15px] leading-relaxed text-[#64748B]"
              >
                Someone from our team will call you within 24 hours to walk you
                through everything.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.4, ease }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSubmitted(false)}
                className="mt-7 h-12 w-full rounded-[14px] border border-[#E2E8F0] text-[15px] font-medium text-[#0F172A] transition-all duration-150 hover:bg-[#F8FAFC]"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════ ERROR OVERLAY ══════════════ */}
      <AnimatePresence>
        {submitError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-[#0F172A]/40 p-5 backdrop-blur-sm sm:items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.35, ease }}
              className="w-full max-w-[400px] rounded-[24px] bg-white p-9 shadow-[0_20px_60px_rgba(15,23,42,0.10)]"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EF4444]/10"
              >
                <Icon icon="lucide:wifi-off" width={24} className="text-[#EF4444]" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.4, ease }}
                className="mt-5 font-sora text-[26px] font-semibold tracking-[-0.03em] text-[#0F172A]"
              >
                Something went wrong
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.4, ease }}
                className="mt-2 text-[15px] leading-relaxed text-[#64748B]"
              >
                We couldn&apos;t save your details. Please check your connection and try again. If it keeps happening, send us a message on WhatsApp.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.4, ease }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSubmitError(false)}
                className="mt-7 h-12 w-full rounded-[14px] border border-[#E2E8F0] text-[15px] font-medium text-[#0F172A] transition-all duration-150 hover:bg-[#F8FAFC]"
              >
                Try again
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
