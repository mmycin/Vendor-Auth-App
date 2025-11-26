import * as z from "zod";
import {UserSchema} from "./UserValidator";

export const LoginRequestSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export const LoginResponseSchema = z.object({
    message: z.string(),
    token: z.string(),
    user: UserSchema,
});
