import listPublishedBlogs from "./listPublishedBlogs";
import listUnPublishedBlogs from "./listUnpublishedBlogs";
import createBlog from "./createBlog";
import editBlog from "./editBlog";
import publishBlog from "./publishBlog";
import unpublishBlog from "./unpublishBlog";
// Dependencies
import BlogData from "../../data/blog.data";

const blogsDB = BlogData();

const adminServices = {
    listPublishedBlogs: listPublishedBlogs(blogsDB),
    listUnPublishedBlogs: listUnPublishedBlogs(blogsDB),
    createNewBlog: createBlog(blogsDB),
    editBlog: editBlog(blogsDB),
    publishBlog: publishBlog(blogsDB),
    unpublishBlog: unpublishBlog(blogsDB),
};

export default adminServices;
