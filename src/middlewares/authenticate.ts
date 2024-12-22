import { InvalidStrategy } from "@/errors/InvalidStrategy";
import { CustomRequest, IUserWithId } from "@/types/interface";
import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "src/config";

export function authenticate() {
  return async function (
    req: CustomRequest,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const { token } = req.headers;
      if (typeof token === "string") {
        verify(token, config.jwt.secret, (error, data) => {
          if (error) {
            next(error);
          } else {
            if (typeof data !== "string" && data) {
              req.user = data as IUserWithId;
              next();
            }
          }
        });
      } else {
        throw new InvalidStrategy("Strategy JWT required");
      }
    } catch (e) {
      next(e);
    }
  };
}
