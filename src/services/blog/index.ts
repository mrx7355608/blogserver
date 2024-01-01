import listBlogs from "./listBlogs";
import listBlogBySlug from "./listBlogBySlug";
import searchBlog from "./searchBlog";
import BlogData from "../../data/blog.data";

const blogsDB = BlogData();
const blogServices = {
    listAllBlogs: listBlogs(blogsDB),
    listOneBlogBySlug: listBlogBySlug(blogsDB),
    searchBlog: searchBlog(blogsDB)
};

export default blogServices;
