import { BaseError } from "@/errors/index";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

export function routeNotFound(
  _req: Request,
  res: Response,
): Response<Record<string, string>> {
  return res.status(StatusCodes.NOT_FOUND).json({
    message: "Route not found",
  });
}

export function genericErrorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response<Record<string, string>> {
  if (error.stack) {
    console.error(error.stack);
  }

  switch (true) {
    case error instanceof ZodError:
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({
        errors: error.errors.flat().map((err) => {
          return {
            error: err.path[0],
            message: err.message,
          };
        }),
      });
    case error instanceof BaseError:
      return res.status(error.statusCode).json({
        message: error.message,
      });
    default:
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Errror",
      });
  }
}
