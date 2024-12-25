import { StatusCodes } from "http-status-codes";
import { BaseError } from "./BaseError";

export class NoFileError extends BaseError {
  constructor(message = "Malformed data") {
    super(message);
    this.statusCode = StatusCodes.UNSUPPORTED_MEDIA_TYPE;
  }
}
