import * as z from "zod";

export const CustomerRegisterRequestSchema = z.object({
    fullName: z.string(),
    email: z.string(),
    phone: z.string(),
    password: z.string(),
    address: z.string(),
    role: z.literal("Customer"),
});

export const CustomerRegisterResponseSchema = z.object({
    message: z.string(),
});