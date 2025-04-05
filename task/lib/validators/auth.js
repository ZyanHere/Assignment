// lib/validators/auth.js
import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 1 characters"),
  phone: z.string().regex(/^[0-9]{10}$/, "Invalid phone number (10 digits required)"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export const loginSchema = z.object({
  phone: z.string().regex(/^[0-9]{10}$/, "Invalid phone number (10 digits required)"),
  password: z.string().min(1, "Password is required")
});