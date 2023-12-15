import blogValidator from "../../validators/blog.validator";
import { IRequestInput } from "../../types/http.types";
import { IBlog } from "../../types/blog.types";
import slugify from "slugify";
import { IBlogData } from "../../types/blogRepository.types";

export default function createBlog(blogsDB: IBlogData) {
    return async function (data: IRequestInput) {
        // Validate blog data
        blogValidator(data);

        // Create a new blog object
        const blogDataObject: IBlog = {
            title: data.title,
            blogBody: data.body,
            tags: data.tags,
            slug: slugify(data.title, { lower: true }),
            is_published: false,
            published_on: "",
        };

        // Save blog in database
        const newBlog = await blogsDB.create(blogDataObject);
        return newBlog;
    };
}
