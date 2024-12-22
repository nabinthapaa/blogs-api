import { BlogTable, UserTable } from "@/database/schemas";
import { eq } from "drizzle-orm";
import { IBlog, IBlogDB } from "../types";
import { BaseModel } from "./BaseModel";

type IPostToWrite = IBlog & { slug: string };

export class BlogModel extends BaseModel {
  static async createPost(data: IPostToWrite) {
    return (
      (
        await BlogModel.db()
          .insert(BlogTable)
          .values({ ...data })
          .returning({
            id: BlogTable.id,
            title: BlogTable.title,
            content: BlogTable.content,
            author: BlogTable.author,
            slug: BlogTable.slug,
            createdAt: BlogTable.createdAt,
            updatedAt: BlogTable.updatedAt,
          })
      )?.[0] ?? null
    );
  }

  static async getPostById(id: string) {
    return (
      (
        await BlogModel.db()
          .select({
            id: BlogTable.id,
            title: BlogTable.title,
            content: BlogTable.content,
            author: BlogTable.author,
            slug: BlogTable.slug,
            createdAt: BlogTable.createdAt,
            updatedAt: BlogTable.updatedAt,
          })
          .from(BlogTable)
          .where(eq(BlogTable.id, id))
      )?.[0] ?? null
    );
  }

  static async getPostByAuthor(authorId: string) {
    return await BlogModel.db()
      .select({
        id: BlogTable.id,
        title: BlogTable.title,
        content: BlogTable.content,
        author: BlogTable.author,
        slug: BlogTable.slug,
        createdAt: BlogTable.createdAt,
        updatedAt: BlogTable.updatedAt,
      })
      .from(BlogTable)
      .where(eq(BlogTable.author, authorId));
  }

  static async updateBlog(id: string, data: Partial<IPostToWrite>) {
    return (
      (
        await BlogModel.db()
          .update(BlogTable)
          .set({ ...data })
          .where(eq(UserTable.id, id))
          .returning({
            id: BlogTable.id,
            title: BlogTable.title,
            content: BlogTable.content,
            slug: BlogTable.slug,
            author: BlogTable.author,
            createdAt: BlogTable.createdAt,
            updatedAt: BlogTable.updatedAt,
          })
      )?.[0] ?? null
    );
  }

  static async deleteBlog(id: string) {
    return (
      (
        await BlogModel.db().delete(BlogTable).where(eq(UserTable.id, id))
      )?.[0] ?? null
    );
  }
}
