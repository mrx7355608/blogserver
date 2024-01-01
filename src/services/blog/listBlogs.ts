import { IBlogData } from "../../types/blogRepository.types";

export default function listBlogs(blogsDB: IBlogData) {
    return async function (page: number) {
        const skipVal = (page - 1) * 10;
        const blogs = await blogsDB.findAllPublishedBlogs(skipVal);
        return blogs;
    };
}
