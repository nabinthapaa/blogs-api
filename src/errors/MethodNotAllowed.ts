import { StatusCodes } from "http-status-codes";
import { BaseError } from "./BaseError";

export class MethodNotAllowed extends BaseError {
  constructor(message = "Not allowed") {
    super(message);
    this.statusCode = StatusCodes.METHOD_NOT_ALLOWED;
  }
}
