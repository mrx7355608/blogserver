import { BlogData } from "../data/blog.data";
import { IBlog } from "../types/blog.types";
import slugify from "../utils/slugify";
import blogValidator from "../validators/blog.validator";

export type IRequestInput = {
    title: string;
    body: string;
    tags: string[];
};

const AdminServices = () => {
    const blogData = BlogData();

    async function createNewBlog(data: IRequestInput) {
        // Validate blog data
        blogValidator(data);

        // Create a new blog object
        const blogDataObject: IBlog = {
            title: data.title,
            blogBody: data.body,
            tags: data.tags,
            slug: slugify(data.title),
            is_published: false,
        };

        // Save blog in database
        const newBlog = await blogData.create(blogDataObject);
        return newBlog;
    }

    return { createNewBlog };
};

export { AdminServices };
