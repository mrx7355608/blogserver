import { IBlogData } from "../../types/blogRepository.types";
import { ApiError } from "../../utils/ApiError";

export default function listBlogBySlug(blogsDB: IBlogData) {
    return async function (slug: string) {
        if (!slug) {
            throw new ApiError("Blog slug is missing", 400);
        }
        const blog = await blogsDB.findBySlug(slug);
        if (blog == null) {
            throw new ApiError("Blog not found", 404);
        }
        return blog;
    };
}
