export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  context?: Record<string, unknown>;
}

export interface ValidationError extends AppError {
  code: "VALIDATION_ERROR";
  fields: Record<string, string>;
}

export class AuthError extends Error implements AppError {
  code: "AUTH_ERROR";
  statusCode: 401 | 403;
  context?: Record<string, unknown>;

  constructor({
    message,
    code,
    statusCode,
    context,
  }: {
    message: string;
    code: "AUTH_ERROR";
    statusCode: 401 | 403;
    context?: Record<string, unknown>;
  }) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.context = context;
  }
}

export interface ApiError extends AppError {
  code: "API_ERROR";
  statusCode: number;
  path?: string;
}

export interface DatabaseError extends AppError {
  code: "DB_ERROR";
  operation?: string;
  entity?: string;
}
