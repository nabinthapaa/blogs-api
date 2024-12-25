import { blogSchema } from "@/validationSchema/blog";
import { commentSchema } from "@/validationSchema/comment";
import { userSchema } from "@/validationSchema/user";
import { z } from "zod";

export interface IUser extends z.infer<typeof userSchema> {}
export interface IBlog extends z.infer<typeof blogSchema> {}
export interface IComment extends z.infer<typeof commentSchema> {}

export interface IBlogDB extends IBlog {
  id: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface FileMetadata {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
