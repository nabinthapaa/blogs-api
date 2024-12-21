import { StatusCodes } from "http-status-codes";
import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  constructor(message = "Not Found") {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
