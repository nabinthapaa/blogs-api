import { string, z } from "zod";

export const blogSchema = z
  .object({
    title: z
      .string({ message: "Post title must be provided" })
      .min(10, { message: "Post title must be at least 10 characters long" }),
    content: string({ message: "Post content must be provided" }).min(10, {
      message: "Blog content must be at least 50 characters long",
    }),
    author: z
      .string({ message: "Post author cannot be empty" })
      .uuid({ message: "Cannot pasrse post author" }),
  })
  .strip();
