import listBlogs from "./listBlogs";
import listBlogBySlug from "./listBlogBySlug";
import BlogData from "../../data/blog.data";

const blogsDB = BlogData();
const blogServices = {
    listAllBlogs: listBlogs(blogsDB),
    listOneBlogBySlug: listBlogBySlug(blogsDB),
};

export default blogServices;
