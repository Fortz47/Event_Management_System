import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(5, "Email too short")
  .max(255, "Email too long")
  .email("Invalid email format");

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: emailSchema,
  password: z.string().min(8),
  // role: z.enum(["user", "admin"]).default("user"),
});

export type createUserDto = z.infer<typeof createUserSchema>;
export type updateUserDto = z.infer<typeof updateUserSchema>;
export const updateUserSchema = createUserSchema.partial();
