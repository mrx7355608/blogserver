import { Router } from "express";
import { AdminControllers } from "../controllers/admin.controllers";

const adminRouter = Router();
const adminControllers = AdminControllers();

adminRouter.post("/create-new-blog", adminControllers.postNewBlog);
adminRouter.patch("/edit-blog/:id", adminControllers.patchBlog);

export { adminRouter };
