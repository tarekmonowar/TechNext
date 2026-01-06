import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import AppError from "../error/AppError";
import { envVars } from "../config/env";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (envVars.NODE_ENV === "development") {
    console.log(err);
  }

  let statusCode = 500;
  let message = "Internal Server Error";
  const errorSource: { path: string; message: string }[] = [];

  //Zod validation Error
  if (err.name === "ZodError" || err instanceof ZodError) {
    statusCode = 400;
    message = "Zod Validation  Error";
    err.issues.forEach((issue: ZodIssue) => {
      errorSource.push({
        path: String(issue.path[issue.path.length - 1]),
        message: issue.message,
      });
    });
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;

    //default express error
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    err: envVars.NODE_ENV === "development" ? err : null,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
