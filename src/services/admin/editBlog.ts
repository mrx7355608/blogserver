import { IBlogData } from "../../types/blogRepository.types";
import validator from "validator";
import { ApiError } from "../../utils/ApiError";
import { blogChangesValidator } from "../../validators/blog.validator";
import { IBlog } from "../../types/blog.types";

export default function editBlog(blogsDB: IBlogData) {
    return async function (id: string, changes: IBlog) {
        // Validate blog id
        if (validator.isMongoId(id) === false) {
            throw new ApiError("Invalid blog id", 400);
        }
        // Check if blog exists or not
        const blog = await blogsDB.findByID(id);
        if (blog === null) {
            throw new ApiError("Blog not found", 404);
        }
        // Validate changes object
        blogChangesValidator(changes);
        // Save changes in database
        const updatedBlog = await blogsDB.updateByID(id, changes);
        return updatedBlog;
    };
}
