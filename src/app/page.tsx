// src/app/partner/page.tsx
import type { Metadata } from "next";
import PartnerWaitlist from "@/components/PartnerWaitlist";

export const metadata: Metadata = {
  title:       "Partner Waitlist — breezelaundry",
  description: "Join the breezelaundry partner network. Grow your laundry shop with tech — automated pickups, new clients, and real-time order tracking across Lagos & Abuja.",
  openGraph: {
    title:       "Partner Waitlist — breezelaundry",
    description: "More customers. Less stress. Join the breezelaundry partner network in Lagos & Abuja.",
    url:         "https://breezelaundry.ng/partner",
    siteName:    "breezelaundry",
    locale:      "en_NG",
    type:        "website",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Partner Waitlist — breezelaundry",
    description: "More customers. Less stress. Join the breezelaundry partner network.",
  },
};

export default function PartnerPage() {
  return <PartnerWaitlist />;
}