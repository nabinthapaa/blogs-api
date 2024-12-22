import { StatusCodes } from "http-status-codes";
import { BaseError } from "./BaseError";

export class InvalidStrategy extends BaseError {
  constructor(message = "Invalid authentication strategy") {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
