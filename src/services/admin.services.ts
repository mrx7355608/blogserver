import { BlogData } from "../data/blog.data";
import { IBlog } from "../types/blog.types";
import { ApiError } from "../utils/ApiError";
import slugify from "../utils/slugify";
import blogValidator, {
    blogChangesValidator,
} from "../validators/blog.validator";
import validator from "validator";

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

    async function editBlog(id: string, changes: IBlog) {
        // Validate blog id
        if (validator.isMongoId(id) === false) {
            throw new ApiError("Invalid blog id", 400);
        }
        // Check if blog exists or not
        const blog = await blogData.findByID(id);
        if (blog === null) {
            throw new ApiError("Blog not found", 404);
        }
        // Validate changes object
        blogChangesValidator(changes);
        // Save changes in database
        const updatedBlog = await blogData.updateByID(id, changes);
        return updatedBlog;
    }

    return { createNewBlog, editBlog };
};

export { AdminServices };
