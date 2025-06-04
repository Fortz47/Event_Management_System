import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(5, "Email too short")
  .max(255, "Email too long")
  .email("Invalid email format");

export const createUserSchema = z.object({
  email: emailSchema,
  password: z.string().min(8),
  // role: z.enum(["user", "admin"]).default("user"),
});

export const loginUserSchema = z.object({
  email: emailSchema,
  password: z.string().min(8),
});

export type createUserDto = z.infer<typeof createUserSchema>;
export type updateUserDto = z.infer<typeof updateUserSchema>;
export type loginUserDto = z.infer<typeof loginUserSchema>;
export const updateUserSchema = createUserSchema.partial();
