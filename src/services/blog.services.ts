import { IBlogData } from "../types/blogRepository.types";
import { ApiError } from "../utils/ApiError";

export default function BlogServices(blogData: IBlogData) {
    // RETURN ALL BLOGS (PAGINATED)
    async function listAllBlogs(page: number) {
        const skipVal = (page - 1) * 10;
        const blogs = await blogData.findAll(skipVal);
        return blogs;
    }

    // RETURN A BLOG BY IT'S SLUG
    async function listOneBlogBySlug(slug: string) {
        if (!slug) {
            throw new ApiError("Blog slug is missing", 400);
        }
        const blog = await blogData.findBySlug(slug);
        if (blog == null) {
            throw new ApiError("Blog not found", 404);
        }
        return blog;
    }

    return { listAllBlogs, listOneBlogBySlug };
}
