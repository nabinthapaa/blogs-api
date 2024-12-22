import { z } from "zod";

export const validateIdSchema = z
  .object({
    id: z
      .string({ message: ":id is missing" })
      .uuid({ message: "Could not parse id" }),
  })
  .strip();
