import { CustomRequest } from "@/types/interface";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CommentService } from "../services";
import { NotFoundError } from "../errors";
import { IComment } from "../types";

export async function createComment(
  req: CustomRequest<Pick<IComment, "postId">, any, Pick<IComment, "comment">>,
  res: Response,
) {
  const {
    user,
    body: { comment },
    params: { postId },
  } = req;

  if (!user) throw new NotFoundError("User not found");
  const newComment = await CommentService.createComment(
    comment,
    user.id,
    postId,
  );

  return res.status(StatusCodes.CREATED).json({ ...newComment });
}

export async function updateComment(
  req: CustomRequest<Pick<IComment, "postId">, any, Pick<IComment, "comment">>,
  res: Response,
) {
  const {
    user,
    body: { comment },
    params: { postId },
  } = req;

  if (!user) throw new NotFoundError("User not found");
  const updatedComment = await CommentService.updateComment(
    comment,
    user.id,
    postId,
  );

  return res.status(StatusCodes.OK).json({ ...updatedComment });
}

export async function getComments(
  req: CustomRequest<Pick<IComment, "postId">, any, Pick<IComment, "comment">>,
  res: Response,
) {
  const {
    user,
    params: { postId },
  } = req;

  if (!user) throw new NotFoundError("User not found");
  const updatedComment = await CommentService.getCommentByPostId(postId);

  return res.status(StatusCodes.OK).json(updatedComment);
}
