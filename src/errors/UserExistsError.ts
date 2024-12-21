import { StatusCodes } from "http-status-codes";
import { BaseError } from "./BaseError";

export class UserExistsError extends BaseError {
  constructor(message = "User Exists") {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
  }
}
