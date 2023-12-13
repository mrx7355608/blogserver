import { AdminServices } from "../../services/admin.services";
import { catchAsyncError } from "../../utils/catchAsyncError";

const AdminControllers = () => {
    const adminServices = AdminServices();

    const postNewBlog = catchAsyncError(async function (reqObject) {
        const blogData = reqObject.body;
        const newBlog = await adminServices.createNewBlog(blogData);
        return {
            message: "Blog created successfully",
            data: newBlog,
            code: 201,
        };
    });

    const patchBlog = catchAsyncError(async function (reqObject) {
        const blogChanges = reqObject.body;
        const blogId = reqObject.params.id;
        const updatedBlog = await adminServices.editBlog(blogId, blogChanges);
        return {
            message: "Blog updated successfully",
            data: updatedBlog,
            code: 200,
        };
    });

    const patchPublishBlog = catchAsyncError(async function (reqObject) {
        const blogId = reqObject.params.id;
        await adminServices.publishBlog(blogId);
        return {
            message: "Blog has been published",
            data: null,
            code: 200,
        };
    });

    const patchUnPublishBlog = catchAsyncError(async function (reqObject) {
        const blogId = reqObject.params.id;
        await adminServices.unpublishBlog(blogId);
        return {
            message: "Blog has been un-published",
            data: null,
            code: 200,
        };
    });

    const getPublishedBlogs = catchAsyncError(async function (reqObject) {
        const page = reqObject.query.page * 1 || 1;
        const { sort } = reqObject.query;
        const publishedBlogs = await adminServices.listPublishedBlogs(
            sort,
            page,
        );
        return {
            message: "",
            data: publishedBlogs,
            code: 200,
        };
    });

    const getUnPublishedBlogs = catchAsyncError(async function (reqObject) {
        const page = reqObject.query.page * 1 || 1;
        const { sort } = reqObject.query;
        const unpublishedBlogs = await adminServices.listUnPublishedBlogs(
            sort,
            page,
        );
        return {
            message: "",
            data: unpublishedBlogs,
            code: 200,
        };
    });

    // const getAllBlogs = catchAsyncError(async function (reqObject) {})

    return {
        postNewBlog,
        patchBlog,
        patchPublishBlog,
        patchUnPublishBlog,
        getPublishedBlogs,
        getUnPublishedBlogs,
    };
};

export { AdminControllers };
