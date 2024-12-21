import { z } from "zod";

export const userSchema = z
  .object({
    username: z
      .string({ message: "Username must be provided" })
      .min(5, "username must be at least 5 characters long")
      .max(32, "username can be be at max 32 characters long")
      .nonempty({ message: "Username cannot be empty" }),
    password: z
      .string({ message: "Password must be provided" })
      .min(8, "password must be at least 8 characters long")
      .max(15, "password can be be at max 15 characters long")
      .nonempty({ message: "Password cannot be empty" }),
    email: z
      .string({ message: "Email must be provided" })
      .email({ message: "Invalid email format" })
      .nonempty({ message: "Email cannot be empty" }),
    fullName: z
      .string({ message: "Full name must be provided" })
      .nonempty({ message: "Full name cannot be empty" }),
  })
  .strip();

export const loginSchema = z
  .object({
    username: z
      .string({ message: "Username must be provided" })
      .min(5, "username must be at least 5 characters long")
      .max(32, "username can be be at max 32 characters long")
      .nonempty({ message: "Username cannot be empty" }),
    password: z
      .string({ message: "Password must be provided" })
      .min(8, "password must be at least 8 characters long")
      .max(15, "password can be be at max 15 characters long")
      .nonempty({ message: "Password cannot be empty" }),
  })
  .strip();
