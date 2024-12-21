import { MethodNotAllowed } from "@/errors/MethodNotAllowed";
import { AuthService } from "@/services/index";
import { IUser } from "@/types/index";
import { CustomRequest } from "@/types/interface";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function login(
  req: CustomRequest<any, any, IUser>,
  res: Response,
) {
  const { username, password } = req.body;

  const userInfo = await AuthService.login({ username, password });
  return res.status(StatusCodes.OK).json({
    ...userInfo,
  });
}
