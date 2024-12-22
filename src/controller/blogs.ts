import { UnauthorizedError } from "@/errors/UnauthorizedError";
import { BlogService } from "@/services/index";
import { IBlog } from "@/types/index";
import { CustomRequest } from "@/types/interface";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function createPost(
  req: CustomRequest<null, IBlog, IBlog>,
  res: Response,
) {
  const { user } = req;
  if (!user) throw new UnauthorizedError();
  const newPost = await BlogService.createPost(req.body, user.id);
  return res.status(StatusCodes.CREATED).json({
    ...newPost,
  });
}

export async function updatePost(
  req: CustomRequest<{ id: string }, IBlog, Partial<IBlog>>,
  res: Response,
) {
  const { id } = req.params;
  const { user } = req;
  if (!user) throw new UnauthorizedError();
  const post = await BlogService.updatePost(id, req.body, user.id);
  return res.status(StatusCodes.OK).json({
    ...post,
  });
}

export async function getPosts(
  req: CustomRequest<{ id: string }, IBlog, Partial<IBlog>>,
  res: Response,
) {
  const { user } = req;
  if (!user) throw new UnauthorizedError();
  const post = await BlogService.getPosts(user.id);
  return res.status(StatusCodes.OK).json({
    ...post,
  });
}

export async function getPostById(
  req: CustomRequest<{ id: string }>,
  res: Response,
) {
  const { id } = req.params;
  const post = await BlogService.getPostById(id);
  return res.status(StatusCodes.OK).json({
    ...post,
  });
}

export async function getPostByAuthor(
  req: CustomRequest<{ authorId: string }, IBlog[]>,
  res: Response,
) {
  const { authorId } = req.params;
  const post = await BlogService.getPosts(authorId);
  return res.status(StatusCodes.OK).json({
    ...post,
  });
}
