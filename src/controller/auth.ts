import { AuthService } from "@/services/index";
import { IUser } from "@/types/index";
import { CustomRequest } from "@/types/interface";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function login(
  req: CustomRequest<any, any, Pick<IUser, "username" | "password">>,
  res: Response,
) {
  const { username, password } = req.body;

  const userInfo = await AuthService.login({ username, password });
  return res.status(StatusCodes.OK).json({
    ...userInfo,
  });
}

export async function register(
  req: CustomRequest<any, any, IUser>,
  res: Response,
) {
  const userInfo = await AuthService.register(req.body);
  return res.status(StatusCodes.CREATED).json({
    ...userInfo,
  });
}
