import { CommentTable } from "@/database/schemas/comment";
import { eq } from "drizzle-orm";
import { BaseModel } from "./BaseModel";

export class CommentModel extends BaseModel {
  static async createComment(postId: string, userId: string, comment: string) {
    return (
      (
        await CommentModel.db()
          .insert(CommentTable)
          .values({ comment, postId, userId })
          .returning({
            id: CommentTable.id,
            comment: CommentTable.comment,
            postId: CommentTable.postId,
            userId: CommentTable.userId,
          })
      )?.[0] ?? null
    );
  }

  static async updateComment(id: string, comment: string) {
    return (
      (
        await CommentModel.db()
          .update(CommentTable)
          .set({ comment })
          .where(eq(CommentTable.id, id))
          .returning({
            id: CommentTable.id,
            comment: CommentTable.comment,
            postId: CommentTable.postId,
            userId: CommentTable.userId,
          })
      )?.[0] ?? null
    );
  }

  static async deleteComment(id: string) {
    return (
      (
        await CommentModel.db()
          .delete(CommentTable)
          .where(eq(CommentTable.id, id))
      )?.[0] ?? null
    );
  }

  static async getCommentById(id: string) {
    return (
      (
        await CommentModel.db()
          .select({
            id: CommentTable.id,
            comment: CommentTable.comment,
            postId: CommentTable.postId,
            userId: CommentTable.userId,
          })
          .from(CommentTable)
          .where(eq(CommentTable.id, id))
      )?.[0] ?? null
    );
  }

  static async getCommentsByPostId(postId: string) {
    return await CommentModel.db()
      .select({
        id: CommentTable.id,
        comment: CommentTable.comment,
        postId: CommentTable.postId,
        userId: CommentTable.userId,
      })
      .from(CommentTable)
      .where(eq(CommentTable.postId, postId));
  }

  static async getCommentsByUserId(userId: string) {
    return await CommentModel.db()
      .select({
        id: CommentTable.id,
        comment: CommentTable.comment,
        postId: CommentTable.postId,
        userId: CommentTable.userId,
      })
      .from(CommentTable)
      .where(eq(CommentTable.userId, userId));
  }
}
