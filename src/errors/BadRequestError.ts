import { StatusCodes } from "http-status-codes";
import { BaseError } from "./BaseError";

export class BadRequest extends BaseError {
  constructor(message = "Bad Request") {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
