import { CustomRequest } from "@/types/interface";
import { NextFunction, Response } from "express";

export function asyncHandler(callback: Function) {
  return async function (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      return await callback(req, res, next);
    } catch (e) {
      if (e instanceof Error) {
        next(e);
      }
    }
  };
}

export function multiAsyncHandler(callback: Function[]) {
  return async function (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      for (const cb of callback) {
        try {
          await cb(req, res, next);
        } catch (e) {
          throw e;
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        next(e);
      }
    }
  };
}
