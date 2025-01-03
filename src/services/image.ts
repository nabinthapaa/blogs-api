import { ImageModel } from "@/models/image";
import { FileMetadata } from "../types";
import fs from "node:fs/promises";
import path from "node:path";
import { BlogService } from ".";
import { UnauthorizedError } from "../errors";

export async function saveImage(
  userId: string,
  postId: string,
  file: FileMetadata,
) {
  const post = await BlogService.getPostById(postId);
  if (userId !== post.author) {
    throw new UnauthorizedError();
  }
  await fs.copyFile(
    file.path,
    path.resolve(__dirname, "../../uploads/", file.filename),
  );
  const existingFile = await ImageModel.getImageByPostId(postId);
  if (existingFile) {
    await fs.rm(
      path.resolve(__dirname, "../../uploads/", existingFile.filename),
    );
    const updatedFile = await ImageModel.updateImage(postId, {
      filename: file.filename,
      size: file.size,
    });
    return {
      ...updatedFile,
      url: "/api/uploads/" + updatedFile.filename,
    };
  }
  await fs.rm(file.path);
  const newFile = await ImageModel.saveImage(postId, {
    filename: file.filename,
    size: file.size,
  });
  return {
    ...newFile,
    url: "/api/uploads/" + newFile.filename,
  };
}

export async function getImage(postId: string) {
  const existingFile = await ImageModel.getImageByPostId(postId);
  return {
    ...existingFile,
    url: "/uploads/" + existingFile.filename,
  };
}

export async function deleteImage(postId: string, userId: string) {
  const post = await BlogService.getPostById(postId);
  if (userId !== post.author) {
    throw new UnauthorizedError();
  }
  const file = await ImageModel.deleteImage(postId);
  await fs.rm(path.resolve(__dirname, "../../uploads/", file.filename));
}
