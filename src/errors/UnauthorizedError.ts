import { StatusCodes } from "http-status-codes";
import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
  constructor(message = "Unauthorized") {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
