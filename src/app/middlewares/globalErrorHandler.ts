/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { IErrorSources } from "../interfaces/error.Types";
import { handleDuplicateError } from "../helpers/handleDuplicateError";
import { handleCastError } from "../helpers/handleCastError";
import { handleZodError } from "../helpers/handleZodError";
import { handleValidationError } from "../helpers/handleValidationError";
import { envVars } from "../config/env";

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong!";
    let errorSources: IErrorSources[] = [];

    if (err.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    } else if (err.name === "CastError") {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    } else if (err.name === "ZodError") {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = (simplifiedError.errorSources as IErrorSources[]) || [];
    } else if (err.name === "ValidationError") {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError.statusCode;
        errorSources = (simplifiedError.errorSources as IErrorSources[]) || [];
        message = simplifiedError.message;
    } else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err instanceof Error) {
        message = err.message;
    }

    console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);

    res.status(statusCode).json({
        success: false,
        message,
        errorSources: errorSources.length > 0 ? errorSources : undefined,
        stack: envVars.NODE_ENV === "development" ? err.stack : undefined,
    });
};