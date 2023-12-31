import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export default function (req: Request, _res: Response, next: NextFunction) {
    if (!req.isAuthenticated()) {
        return next(new ApiError("Forbidden", 403));
    }
    return next();
}
