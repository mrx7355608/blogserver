import passport from "passport";
import apiResponse from "../../utils/apiResponse.util";
import AdminControllers from "../controllers/admin.controllers";
import { NextFunction, Request, Response, Router } from "express";
import isAdminMiddleware from "../../middlewares/isAdmin.middleware";
import {
    adminLoginLimiter,
    adminBlogActionsLimiter,
    adminReadOnlyLimiter,
} from "../../utils/rateLimiters";

const adminRouter = Router();
const adminControllers = AdminControllers();

/* eslint-disable @typescript-eslint/no-explicit-any */
adminRouter.post(
    "/signin",
    adminLoginLimiter,
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
adminRouter.post(
    "/create-new-blog",
    adminBlogActionsLimiter,
    adminControllers.postNewBlog,
);
adminRouter.patch(
    "/edit-blog/:id",
    adminBlogActionsLimiter,
    adminControllers.patchBlog,
);
adminRouter.patch(
    "/publish-blog/:id",
    adminBlogActionsLimiter,
    adminControllers.patchPublishBlog,
);
adminRouter.patch(
    "/unpublish-blog/:id",
    adminBlogActionsLimiter,
    adminControllers.patchUnPublishBlog,
);
adminRouter.get(
    "/blogs/published",
    adminReadOnlyLimiter,
    adminControllers.getPublishedBlogs,
);
adminRouter.get(
    "/blogs/un-published",
    adminReadOnlyLimiter,
    adminControllers.getUnPublishedBlogs,
);

export { adminRouter };
