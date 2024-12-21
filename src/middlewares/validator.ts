import { CustomRequest } from "@/types/interface";
import { NextFunction, Response } from "express";
import { ZodSchema } from "zod";

export function validateRequestBody(schema: ZodSchema) {
  return function (req: CustomRequest, _res: Response, next: NextFunction) {
    try {
      const body = schema.parse(req.body);
      req.body = body;
      next();
    } catch (e) {
      if (e instanceof Error) {
        next(e);
      }
    }
  };
}

export function validateRequestParams(schema: ZodSchema) {
  return function (req: CustomRequest, _res: Response, next: NextFunction) {
    try {
      const params = schema.parse(req.params);
      req.params = params;
      next();
    } catch (e) {
      if (e instanceof Error) {
        next(e);
      }
    }
  };
}

export function validateRequestQuery(schema: ZodSchema) {
  return function (req: CustomRequest, _res: Response, next: NextFunction) {
    try {
      const query = schema.parse(req.query);
      req.query = query;
      next();
    } catch (e) {
      if (e instanceof Error) {
        next(e);
      }
    }
  };
}
