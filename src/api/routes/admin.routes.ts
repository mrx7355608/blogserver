import { Router } from "express";
import AdminControllers from "../controllers/admin.controllers";

const adminRouter = Router();
const adminControllers = AdminControllers();

adminRouter.post("/create-new-blog", adminControllers.postNewBlog);
adminRouter.patch("/edit-blog/:id", adminControllers.patchBlog);
adminRouter.patch("/publish-blog/:id", adminControllers.patchPublishBlog);
adminRouter.patch("/unpublish-blog/:id", adminControllers.patchUnPublishBlog);
adminRouter.get("/blogs/published", adminControllers.getPublishedBlogs);
adminRouter.get("/blogs/un-published", adminControllers.getUnPublishedBlogs);

export { adminRouter };
