import { IBlogData } from "../../types/blogRepository.types";

export default function listPublishedBlogs(blogsDB: IBlogData) {
    return async function (sortBy: string, page: number) {
        // Get skip value for pagination
        const skipVal = (page - 1) * 10;

        // Select sorting method
        let sort = "-createdAt"; // returns newest blogs first
        if (sortBy === "oldest") sort = "createdAt"; // returns oldest blogs first

        const blogs = await blogsDB.findByFilter(true, sort, skipVal);
        return blogs;
    };
}
