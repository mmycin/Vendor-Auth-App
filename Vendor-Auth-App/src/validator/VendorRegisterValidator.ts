import * as z from "zod";

export const VendorRegisterRequestSchema = z.object({
    userId: z.number(),
    businessName: z.string(),
    contactName: z.string(),
    businessPhone: z.string(),
    businessEmail: z.string(),
    businessAddress: z.string(),
    serviceArea: z.string(),
    serviceType: z.string(),
    description: z.string(),
    website: z.string(),
    instagram: z.string(),
    facebook: z.string(),
    linkedin: z.string(),
    ratingAverage: z.number(),
    reviewCount: z.number(),
});

export const VendorRegisterResponseSchema = z.object({
    id: z.number(),
    ...VendorRegisterRequestSchema.shape,
});