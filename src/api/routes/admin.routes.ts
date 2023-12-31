import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import AdminControllers from "../controllers/admin.controllers";
import isAdminMiddleware from "../../middlewares/isAdmin.middleware";
import apiResponse from "../../utils/apiResponse.util";

const adminRouter = Router();
const adminControllers = AdminControllers();

/* eslint-disable @typescript-eslint/no-explicit-any */
adminRouter.post(
    "/signin",
    async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate(
            "local",
            function (err: any, user: any, info: { message: string }) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return apiResponse("error", res, info.message, null);
                }
                req.logIn(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    const adminData = {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        username: user.username,
                    };
                    return apiResponse("success", res, info.message, adminData);
                });
            },
        )(req, res, next);
    },
);

// Middeware to prevent unauthorized access
adminRouter.use(isAdminMiddleware);
adminRouter.post("/create-new-blog", adminControllers.postNewBlog);
adminRouter.patch("/edit-blog/:id", adminControllers.patchBlog);
adminRouter.patch("/publish-blog/:id", adminControllers.patchPublishBlog);
adminRouter.patch("/unpublish-blog/:id", adminControllers.patchUnPublishBlog);
adminRouter.get("/blogs/published", adminControllers.getPublishedBlogs);
adminRouter.get("/blogs/un-published", adminControllers.getUnPublishedBlogs);

export { adminRouter };
