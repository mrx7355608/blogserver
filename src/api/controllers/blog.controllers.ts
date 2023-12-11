import { Request, Response } from "express";
import { BlogServices } from "../../services/blog.services";

const BlogControllers = () => {
    const blogServices = BlogServices();

    async function getAllBlogs(req: Request, res: Response) {
        try {
            const { page } = req.query;
            const blogs = await blogServices.listAllBlogs(page);
            return res.status(200).json({
                status: "success",
                data: blogs,
            });
        } catch (err: unknown) {
            return res.status(500).json({
                status: "failed",
                error: "An error occured",
            });
        }
    }

    return { getAllBlogs };
};

export { BlogControllers };
