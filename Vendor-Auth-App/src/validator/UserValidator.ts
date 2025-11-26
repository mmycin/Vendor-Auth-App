import * as z from "zod";

export const UserSchema = z.object({
    id: z.number(),
    fullName: z.string(),
    email: z.string(),
    passwordHash: z.string(),
    address: z.string(),
    role: z.string(),
    isVendor: z.boolean().optional(),
    createdAt: z.string(),
});
