import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import AdminControllers from "../controllers/admin.controllers";

const adminRouter = Router();
const adminControllers = AdminControllers();

adminRouter.post("/create-new-blog", adminControllers.postNewBlog);
adminRouter.patch("/edit-blog/:id", adminControllers.patchBlog);
adminRouter.patch("/publish-blog/:id", adminControllers.patchPublishBlog);
adminRouter.patch("/unpublish-blog/:id", adminControllers.patchUnPublishBlog);
adminRouter.get("/blogs/published", adminControllers.getPublishedBlogs);
adminRouter.get("/blogs/un-published", adminControllers.getUnPublishedBlogs);
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
                    return res.status(404).json({
                        status: "failed",
                        message: info.message,
                        data: null,
                    });
                }
                req.logIn(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    const data = {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        username: user.username,
                    };
                    return res.status(200).json({
                        status: "success",
                        message: "Login successful",
                        data: data,
                    });
                });
            },
        )(req, res, next);
    },
);

export { adminRouter };
