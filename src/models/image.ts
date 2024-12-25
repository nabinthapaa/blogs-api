import { ImageTable } from "@/database/schemas";
import { FileMetadata } from "../types";
import { BaseModel } from "./BaseModel";
import { eq } from "drizzle-orm";

export class ImageModel extends BaseModel {
  static async saveImage(
    postId: string,
    data: Pick<FileMetadata, "size" | "filename">,
  ) {
    return (
      (
        await ImageModel.db()
          .insert(ImageTable)
          .values({ ...data, postId })
          .returning({
            id: ImageTable.id,
            filename: ImageTable.filename,
            size: ImageTable.size,
            createdAt: ImageTable.createdAt,
            updatedAt: ImageTable.updatedAt,
          })
      )?.[0] ?? null
    );
  }

  static async updateImage(
    postId: string,
    data: Pick<FileMetadata, "size" | "filename">,
  ) {
    return (
      (
        await ImageModel.db()
          .update(ImageTable)
          .set({ ...data })
          .where(eq(ImageTable.postId, postId))
          .returning({
            id: ImageTable.id,
            filename: ImageTable.filename,
            size: ImageTable.size,
            createdAt: ImageTable.createdAt,
            updatedAt: ImageTable.updatedAt,
          })
      )?.[0] ?? null
    );
  }

  static async getImageByPostId(postId: string) {
    return (
      (
        await ImageModel.db()
          .select({
            id: ImageTable.id,
            filename: ImageTable.filename,
            size: ImageTable.size,
            createdAt: ImageTable.createdAt,
            updatedAt: ImageTable.updatedAt,
          })
          .from(ImageTable)
          .where(eq(ImageTable.postId, postId))
      )?.[0] ?? null
    );
  }

  static async deleteImage(postId: string) {
    return (
      (
        await ImageModel.db()
          .delete(ImageTable)
          .where(eq(ImageTable.postId, postId))
          .returning({
            id: ImageTable.id,
            filename: ImageTable.filename,
            size: ImageTable.size,
            createdAt: ImageTable.createdAt,
            updatedAt: ImageTable.updatedAt,
          })
      )?.[0] ?? null
    );
  }
}
