import { BlogServices } from "../../services/blog.services";
import { catchAsyncError } from "../../utils/catchAsyncError";

const BlogControllers = () => {
    const blogServices = BlogServices();

    const getAllBlogs = catchAsyncError(async function () {
        const blogs = await blogServices.listAllBlogs(1);
        return {
            code: 200,
            data: blogs,
            message: "",
        };
    });

    return { getAllBlogs };
};

export { BlogControllers };
