import { Request as ExpressRequest } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { IUser } from ".";

export interface CustomRequest<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = qs.ParsedQs,
  Locals extends Record<string, any> = Record<string, any>,
> extends ExpressRequest<P, ResBody, ReqBody, ReqQuery, Locals> {
  user?: Omit<IUser, "password">;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date | null;
  } & Omit<IUser, "password">;
}
