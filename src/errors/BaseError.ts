import { StatusCodes } from "http-status-codes";

export class BaseError extends Error {
  statusCode: number;

  constructor(message = "Internal server Error") {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
