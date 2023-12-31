import { Response } from "express";

export default function apiResponse(
    type: string,
    res: Response,
    message: string,
    // eslint-disable-next-line
    data: any,
) {
    if (type === "success") {
        return res.status(200).json({
            status: "success",
            message: "Login successful",
            data: data,
        });
    } else {
        res.status(404).json({
            status: "failed",
            message: message,
            data: data,
        });
    }
}
