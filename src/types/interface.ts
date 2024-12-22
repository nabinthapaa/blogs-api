import { Request as ExpressRequest } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { IUser } from ".";

export interface IUserWithId extends Omit<IUser, "password"> {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface CustomRequest<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = qs.ParsedQs,
  Locals extends Record<string, any> = Record<string, any>,
> extends ExpressRequest<P, ResBody, ReqBody, ReqQuery, Locals> {
  user?: IUserWithId;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUserWithId;
}
