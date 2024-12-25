import { CustomRequest } from "@/types/interface";
import { NextFunction, Response } from "express";
import { ZodSchema } from "zod";
import { FileMetadata } from "../types";
import { InvalidFileFormat } from "@/errors/InvalidFileFormat";
import fs from "node:fs/promises";
import { NoFileError } from "../errors";

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

export function validateImageFormat(allowedMimeType: string[]) {
  return async function (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const file = req.file as FileMetadata;
      console.log(file);
      if (!file) throw new NoFileError("Image is missing from data");
      if (!allowedMimeType.includes(file.mimetype)) {
        await fs.rm(file.path);
        throw new InvalidFileFormat(
          `Invalid image format. Allowed mimetype ${allowedMimeType.join(", ")}`,
        );
      }
      next();
    } catch (e) {
      next(e);
    }
  };
}
