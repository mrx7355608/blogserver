import { NextFunction, Request, RequestHandler, Response } from "express";

type IApiResponse = {
    message: string;
    // eslint-disable-next-line
    data: any;
    code: number;
};

type ControllerFunc = () => Promise<IApiResponse>;

function catchAsyncError(controller: ControllerFunc): RequestHandler {
    return function (_req: Request, res: Response, next: NextFunction) {
        controller()
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
