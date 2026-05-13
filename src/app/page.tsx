// src/app/partner/page.tsx
import type { Metadata } from "next";
import PartnerWaitlist from "@/components/PartnerWaitlist";

export const metadata: Metadata = {
  title:       "Partner Waitlist",
  description: "Join the breezelaundry partner network. Grow your laundry shop with tech — automated pickups, new clients, and real-time order tracking across Lagos & Abuja.",
  alternates: {
    canonical: "https://breezelaundry.ng/partner",
  },
  openGraph: {
    title:       "Partner Waitlist — breezelaundry",
    description: "More customers. Less stress. Join the breezelaundry partner network in Lagos & Abuja.",
    url:         "https://breezelaundry.ng/partner",
    siteName:    "breezelaundry",
    locale:      "en_NG",
    type:        "website",
    images: [
      {
        url:    "/SEO-partner-meta.png",
        width:  1536,
        height: 1024,
        alt:    "Join the breezelaundry partner network — Lagos & Abuja",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Partner Waitlist — breezelaundry",
    description: "More customers. Less stress. Join the breezelaundry partner network.",
    images:      ["/SEO-partner-meta.png"],
  },
};

export default function PartnerPage() {
  return <PartnerWaitlist />;
}