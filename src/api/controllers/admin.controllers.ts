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

    return { postNewBlog };
};

export { AdminControllers };
