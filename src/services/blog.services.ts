import { BlogData } from "../data/blog.data";

const BlogServices = () => {
    const blogData = BlogData();

    async function listAllBlogs(page: number) {
        const skipVal = (page - 1) * 10;
        const blogs = await blogData.findAll(skipVal);
        return blogs;
    }

    return { listAllBlogs };
};

export { BlogServices };
