import { BlogServices } from "../../services/blog.services";
import { catchAsyncError } from "../../utils/catchAsyncError";

const BlogControllers = () => {
    const blogServices = BlogServices();

    const getAllBlogs = catchAsyncError(async function (reqObject) {
        const page = reqObject.query.page * 1 || 1;
        const blogs = await blogServices.listAllBlogs(page);
        return {
            code: 200,
            data: blogs,
            message: "",
        };
    });

    const getBlogBySlug = catchAsyncError(async function (reqObject) {
        const { slug } = reqObject.params;
        const blog = await blogServices.listOneBlogBySlug(slug);
        return {
            code: 200,
            data: blog,
            message: "",
        };
    });

    return { getAllBlogs, getBlogBySlug };
};

export { BlogControllers };
