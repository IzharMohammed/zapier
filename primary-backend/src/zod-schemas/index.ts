import { z } from "zod";

export const zapCreateSchema = z.object({
    userId: z.number(),
    triggerId: z.string().uuid(),
    triggerMetaData: z.any().optional(),
    actions: z.array(
        z.object(
            {
                actionId: z.string().uuid(),
                actionMetaData: z.any().optional()
            }))
})

export const userSchema = z.object({
    name: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Must be 6 or more characters long" }),
});

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Must be 6 or more characters long" }),
});
