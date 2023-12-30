import blogValidator from "../../validators/blog.validator";
import { IRequestInput } from "../../types/http.types";
import { IBlog } from "../../types/blog.types";
import slugify from "slugify";
import { IBlogData } from "../../types/blogRepository.types";
import { ApiError } from "../../utils/ApiError";

export default function createBlog(blogsDB: IBlogData) {
    return async function (data: IRequestInput | null) {
        // Check if data is given or not
        if (data == null || data == undefined) {
            throw new ApiError("Blog cannot be created without any data", 400);
        }

        // Validate blog data
        blogValidator(data);

        // Create a new blog object
        const { title, blogBody, tags } = data;
        const blogDataObject: IBlog = {
            title,
            blogBody,
            tags,
            slug: slugify(title, { lower: true }),
            is_published: true,
            published_on: new Date().toDateString()
        };

        // Save blog in database
        const newBlog = await blogsDB.create(blogDataObject);
        return newBlog;
    };
}
