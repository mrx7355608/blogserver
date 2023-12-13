import { NextFunction, Request, RequestHandler, Response } from "express";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type IRequestObject = {
    body: any;
    query: any;
    params: any;
};

type IApiResponse = {
    message: string;
    data: any;
    code: number;
};

type ControllerFunc = (reqObject: IRequestObject) => Promise<IApiResponse>;

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
