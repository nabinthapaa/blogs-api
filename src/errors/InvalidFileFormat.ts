import { StatusCodes } from "http-status-codes";
import { BaseError } from "./BaseError";

export class InvalidFileFormat extends BaseError {
  constructor(message = "Invalid file format") {
    super(message);
    this.statusCode = StatusCodes.UNSUPPORTED_MEDIA_TYPE;
  }
}
