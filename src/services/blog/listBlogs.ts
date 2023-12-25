import { IBlogMongooseModel } from "../../types/blog.types";
import { IBlogData } from "../../types/blogRepository.types";

export default function listBlogs(blogsDB: IBlogData) {
    return async function (page: number) {
        const skipVal = (page - 1) * 10;
        const blogs = await blogsDB.findAllPublishedBlogs(skipVal);
        const filteredBlogs = blogs.map((blog: IBlogMongooseModel) => {
            return {
                title: blog.title,
                blogBody: blog.blogBody,
                tags: blog.tags,
                slug: blog.slug,
                published_on: new Date(blog.createdAt).toDateString(),
            };
        });
        return filteredBlogs;
    };
}
