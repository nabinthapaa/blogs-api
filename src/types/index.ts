import { blogSchema } from "@/validationSchema/blog";
import { userSchema } from "@/validationSchema/user";
import { z } from "zod";

export interface IUser extends z.infer<typeof userSchema> {}
export interface IBlog extends z.infer<typeof blogSchema> {}

export interface IBlogDB extends IBlog {
  slug: string;
}
