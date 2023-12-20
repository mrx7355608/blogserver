import blogServices from "../../services/blog";
import { catchAsyncError } from "../../utils/catchAsyncError";

export default function BlogControllers() {
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
}
