import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

function catch404(_req: Request, _res: Response, next: NextFunction) {
    return next(new ApiError("Page not found", 404));
}

function globalErrorHandler(
    err: ApiError,
    _req: Request,
    res: Response,
    // eslint-disable-next-line
    _next: NextFunction,
) {
    const msg = err.message;
    const code = err.code || 500;

    const nodeEnv = process.env.NODE_ENV as string;
    if (nodeEnv === "production") {
        return res.status(code).json({
            status: "failed",
            error: msg,
        });
    } else {
        return res.status(code).json({
            status: "failed",
            error: msg,
            stack: err.stack,
        });
    }
}

export { catch404, globalErrorHandler };
