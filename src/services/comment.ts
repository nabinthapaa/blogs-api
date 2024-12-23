import { UnauthorizedError, NotFoundError } from "@/errors/index";
import { CommentModel } from "@/models/comment";

export async function createComment(
  comment: string,
  userId: string,
  postId: string,
) {
  return await CommentModel.createComment(postId, userId, comment);
}

export async function updateComment(
  comment: string,
  userId: string,
  id: string,
) {
  const existingComment = await CommentModel.getCommentById(id);
  if (!existingComment) throw new NotFoundError("Comment not found");
  if (existingComment.userId !== userId) throw new UnauthorizedError();

  return await CommentModel.updateComment(id, comment);
}

export async function deleteComment(userId: string, id: string) {
  const existingComment = await CommentModel.getCommentById(id);
  if (!existingComment) throw new NotFoundError("Comment not found");
  if (existingComment.userId !== userId) throw new UnauthorizedError();

  return await CommentModel.deleteComment(id);
}

export async function getCommentById(id: string) {
  return await CommentModel.getCommentById(id);
}

export async function getCommentByPostId(postId: string) {
  return await CommentModel.getCommentByPostId(postId);
}

export async function getCommentByUserId(userId: string) {
  return await CommentModel.getCommentByUserId(userId);
}
