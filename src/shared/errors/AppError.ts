export class AppError {
  readonly message: string;
  readonly status: number;
  readonly code?: string;

  constructor(message: string, statusCode = 400, code?: string) {
    this.message = message;
    this.status = statusCode;
    this.code = code;
  }
}
