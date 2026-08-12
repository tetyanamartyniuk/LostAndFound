import { CustomError } from "./CustomError.js";
export class NotFoundError extends CustomError {
  statusCode: number = 404;
  name: string = "Not Found Error";
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class UnauthorizedError extends CustomError {
  statusCode: number = 401;
  name: string = "Unauthorized Error";
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ForbiddenError extends CustomError {
  statusCode: number = 403;
  name: string = "Forbidden Error";
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
