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

    return { postNewBlog, patchBlog };
};

export { AdminControllers };
