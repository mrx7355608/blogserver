import { Router } from "express";
import { BlogControllers } from "../controllers/blog.controllers";

const blogRouter = Router();
const blogControllers = BlogControllers();

blogRouter.get("/", blogControllers.getAllBlogs);

export { blogRouter };
