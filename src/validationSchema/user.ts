import { z } from "zod";

export const userSchema = z
  .object({
    username: z
      .string()
      .min(5, "username must be at least 5 characters long")
      .max(32, "username can be be at max 32 characters long")
      .nonempty(),
    password: z
      .string()
      .min(8, "password must be at least 8 characters long")
      .max(15, "password can be be at max 15 characters long")
      .nonempty(),
    email: z.string().email("Invalid email format").nonempty(),
    fullName: z.string().nonempty(),
  })
  .strip();
