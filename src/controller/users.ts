import { CustomRequest } from "@/types/interface";
import { Response } from "express";
import { UnauthorizedError } from "../errors";
import { UserService } from "@/services/index";
import { StatusCodes } from "http-status-codes";
import { IUser } from "../types";

export async function getUserInfo(req: CustomRequest, res: Response) {
  const { user } = req;
  if (!user) throw new UnauthorizedError();

  const userInfo = await UserService.getUserByEmail(user.email);
  return res.status(StatusCodes.OK).json({
    ...userInfo,
  });
}

export async function updateUser(
  req: CustomRequest<any, any, Partial<IUser>>,
  res: Response,
) {
  const { user, body } = req;
  if (!user) throw new UnauthorizedError();

  const userInfo = await UserService.updateUser(user.id, body);
  return res.status(StatusCodes.OK).json({
    ...userInfo,
  });
}
