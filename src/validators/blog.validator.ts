import joi from "joi";
import { ApiError } from "../utils/ApiError";
import { IRequestInput } from "../types/http.types";
import { IBlog } from "../types/blog.types";

const blogValidationSchema = joi.object({
    title: joi.string().trim().min(10).max(200).required().messages({
        "any.required": "Blog title is required!",
        "string.empty": "Blog title cannot be empty",
        "string.min": "Blog title should be atleast 10 characters long",
        "string.max": "Blog title should not be longer than 200 characters",
        "string.base": "Blog title should be a string",
    }),
    body: joi.string().trim().min(400).max(6000).required().messages({
        "any.required": "Blog body is required!",
        "string.empty": "Blog body cannot be empty",
        "string.min": "Blog body should be atleast 400 characters long",
        "string.max": "Blog body should not be longer than 6000 characters",
        "string.base": "Blog body should be a string",
    }),
    tags: joi.array().items(joi.string()).min(1).max(5).required().messages({
        "any.required": "Blog tags are required!",
        "array.empty": "Blog tags cannot be empty",
        "array.min": "Add atleast one tag to your blog",
        "array.max": "There can only be 5 tags per blog",
        "array.base": "Blog tags should be in a list",
    }),
});

const blogChangesValidationSchema = joi.object({
    title: joi.string().trim().min(10).max(200).messages({
        "string.empty": "Blog title cannot be empty",
        "string.min": "Blog title should be atleast 10 characters long",
        "string.max": "Blog title should not be longer than 200 characters",
        "string.base": "Blog title should be a string",
    }),
    blogBody: joi.string().trim().min(400).max(6000).messages({
        "string.empty": "Blog body cannot be empty",
        "string.min": "Blog body should be atleast 400 characters long",
        "string.max": "Blog body should not be longer than 6000 characters",
        "string.base": "Blog body should be a string",
    }),
    tags: joi.array().items(joi.string()).min(1).max(5).messages({
        "array.empty": "Blog tags cannot be empty",
        "array.min": "Add atleast one tag to your blog",
        "array.max": "There can only be 5 tags per blog",
        "array.base": "Blog tags should be in a list",
    }),
});

export function blogChangesValidator(data: Partial<IBlog>) {
    const { error } = blogChangesValidationSchema.validate(data);
    if (error) {
        throw new ApiError(error.message, 400);
    }
}

export default function blogValidator(data: IRequestInput) {
    const { error } = blogValidationSchema.validate(data);
    if (error) {
        throw new ApiError(error.message, 400);
    }
}
