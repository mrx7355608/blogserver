import joi from "joi"
import { ApiError } from "../utils/ApiError";

const searchSchema = joi.string().required().messages({
    "any.required": "Please enter a blog to search",
    "string.empty": "Cannot search blog with an empty query",
    "string.base": "Query should be a string",
})

export default function searchQueryValidator(query: string) {
    const { error } = searchSchema.validate(query);
    if (error) {
        throw new ApiError(error.message, 400);
    }
}
