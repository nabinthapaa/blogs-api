import { InvalidStrategy, UnauthorizedError } from "@/errors/index";
import { CustomRequest, IUserWithId } from "@/types/interface";
import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "src/config";

export function authenticate(
  req: CustomRequest,
  _res: Response,
  next: NextFunction,
) {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new UnauthorizedError();
    if (typeof authorization === "string") {
      const verificationToken = authorization.split(" ");
      if (verificationToken[0] !== "JWT") throw new InvalidStrategy();
      verify(verificationToken[1], config.jwt.secret, (error, data) => {
        if (error) {
          next(new UnauthorizedError(error.message));
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
}
