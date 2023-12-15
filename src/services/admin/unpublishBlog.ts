import validator from "validator";
import { ApiError } from "../../utils/ApiError";
import { IBlogData } from "../../types/blogRepository.types";

export default function unpublishBlog(blogsDB: IBlogData) {
    return async function (id: string) {
        // Validate blog id
        if (validator.isMongoId(id) === false) {
            throw new ApiError("Invalid blog id", 400);
        }
        // Check if blog exists or not
        const blog = await blogsDB.findByID(id);
        if (blog === null) {
            throw new ApiError("Blog not found", 404);
        }
        // Check if blog has already been published or not
        if (blog.is_published === false) {
            throw new ApiError("Blog is un-published already", 400);
        }
        // Save changes in database
        await blogsDB.updateByID(id, {
            is_published: false,
        });
        return null;
    };
}
