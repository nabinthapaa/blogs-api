import { CustomRequest } from "@/types/interface";
import { Response } from "express";
import { ImageService } from "@/services/index";
import { BaseError, NotFoundError } from "../errors";
import { IComment } from "../types";

export async function uploadImage(
  req: CustomRequest<Pick<IComment, "postId">>,
  res: Response,
) {
  const {
    file,
    user,
    params: { postId },
  } = req;
  if (!file) throw new BaseError();
  if (!user) throw new NotFoundError("User not found");
  const image = await ImageService.saveImage(user.id, postId, file);
  return res.status(200).json({
    ...image,
  });
}

export async function getImage(
  req: CustomRequest<Pick<IComment, "postId">>,
  res: Response,
) {
  const {
    user,
    params: { postId },
  } = req;
  if (!user) throw new NotFoundError("User not found");
  const image = await ImageService.getImage(postId);
  return res.status(200).json({
    ...image,
  });
}
