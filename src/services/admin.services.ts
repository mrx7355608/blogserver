import BlogData from "../data/blog.data";
import { IBlog } from "../types/blog.types";
import { ApiError } from "../utils/ApiError";
import validator from "validator";
import slugify from "slugify";
import blogValidator, {
    blogChangesValidator,
} from "../validators/blog.validator";

export type IRequestInput = {
    title: string;
    body: string;
    tags: string[];
};

export default function AdminServices() {
    const blogData = BlogData();

    async function createNewBlog(data: IRequestInput) {
        // Validate blog data
        blogValidator(data);

        // Create a new blog object
        const blogDataObject: IBlog = {
            title: data.title,
            blogBody: data.body,
            tags: data.tags,
            slug: slugify(data.title, { lower: true }),
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

    async function publishBlog(id: string) {
        // Validate blog id
        if (validator.isMongoId(id) === false) {
            throw new ApiError("Invalid blog id", 400);
        }
        // Check if blog exists or not
        const blog = await blogData.findByID(id);
        if (blog === null) {
            throw new ApiError("Blog not found", 404);
        }
        // Check if blog has already been published or not
        if (blog.is_published === true) {
            throw new ApiError("Blog has been published already", 400);
        }
        // Save changes in database
        await blogData.updateByID(id, {
            is_published: true,
        });
        return null;
    }

    async function unpublishBlog(id: string) {
        // Validate blog id
        if (validator.isMongoId(id) === false) {
            throw new ApiError("Invalid blog id", 400);
        }
        // Check if blog exists or not
        const blog = await blogData.findByID(id);
        if (blog === null) {
            throw new ApiError("Blog not found", 404);
        }
        // Check if blog has already been published or not
        if (blog.is_published === false) {
            throw new ApiError("Blog is un-published already", 400);
        }
        // Save changes in database
        await blogData.updateByID(id, {
            is_published: false,
        });
        return null;
    }

    async function listPublishedBlogs(sortBy: string, page: number) {
        // Get skip value for pagination
        const skipVal = (page - 1) * 10;

        // Select sorting method
        let sort = "-createdAt"; // returns newest blogs first
        if (sortBy === "oldest") sort = "createdAt"; // returns oldest blogs first

        const blogs = await blogData.findByFilter(true, sort, skipVal);
        return blogs;
    }

    async function listUnPublishedBlogs(sortBy: string, page: number) {
        // Get skip value for pagination
        const skipVal = (page - 1) * 10;

        // Select sorting method
        let sort = "-createdAt"; // returns newest blogs first
        if (sortBy === "oldest") sort = "createdAt"; // returns oldest blogs first

        const blogs = await blogData.findByFilter(false, sort, skipVal);
        return blogs;
    }

    return {
        createNewBlog,
        editBlog,
        publishBlog,
        unpublishBlog,
        listPublishedBlogs,
        listUnPublishedBlogs,
    };
}
