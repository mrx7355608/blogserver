import joi from "joi";
import { ILoginInput } from "../types/user.types";
import { ApiError } from "../utils/ApiError";

const loginDataValidationSchema = joi
    .object({
        username: joi.string().required().messages({
            "any.required": "Please enter your username",
            "string.empty": "Please enter your username",
            "string.base": "Invalid username",
        }),
        password: joi.string().required().messages({
            "any.required": "Please enter your password",
            "string.empty": "Please enter your password",
            "string.base": "Invalid password",
        }),
    })
    .messages({
        "object.unknown": "Unknown field detected, cannot login",
    });

export default function loginDataValidator(data: ILoginInput) {
    const { error } = loginDataValidationSchema.validate(data);
    if (error) {
        return error.message;
    } else {
        return null;
    }
}
