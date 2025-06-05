import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(5, "Email too short")
  .max(255, "Email too long")
  .email("Invalid email format");

const createUserSchema = z.object({
  email: emailSchema,
  password: z.string().min(8),
  // role: z.enum(["user", "admin"]).default("user"),
});

const updateUserSchema = createUserSchema
  .extend({
    name: z.string().trim().min(1).max(100, "Name too long"),
  })
  .partial();

const loginUserSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email format"),
  password: z.string().min(8),
});

type createUserDto = z.infer<typeof createUserSchema>;
type updateUserDto = z.infer<typeof updateUserSchema>;
type loginUserDto = z.infer<typeof loginUserSchema>;

export {
  createUserDto,
  updateUserDto,
  loginUserDto,
  createUserSchema,
  updateUserSchema,
  loginUserSchema,
};
