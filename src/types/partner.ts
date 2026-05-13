// Payload sent from the form to the API
export interface PartnerPayload {
  ownerName: string;
  shopName: string;
  city: string;
  address: string;
  staffCount: number;
  equipment: string[];
  whatsapp: string;
}

// Formik binds inputs as strings; staffCount is coerced to number at submit time
export type PartnerFormValues = Omit<PartnerPayload, "staffCount" | "equipment"> & {
  staffCount: string;
};
