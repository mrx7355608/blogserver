import { NextFunction, Request, RequestHandler, Response } from "express";
import { ControllerFunc } from "../types/http.types";

function catchAsyncError(controller: ControllerFunc): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
        const reqObject = {
            body: req.body,
            params: req.params,
            query: req.query,
        };
        controller(reqObject)
            .then((resp) => {
                res.status(resp.code).json({
                    status: "success",
                    message: resp.message,
                    data: resp.data,
                });
            })
            .catch((err) => next(err));
    };
}

export { catchAsyncError };
