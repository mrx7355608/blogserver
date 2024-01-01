import { IBlogData } from "../../types/blogRepository.types";
import searchQueryValidator from "../../validators/search.validator"

export default function searchBlog(blogsDB: IBlogData) {
    return async function (query: string, page: number) {
        searchQueryValidator(query);
        const skipVal = (page - 1) * 10;
        const blogs = await blogsDB.findByTitle(query, skipVal);
        return blogs;
    };
}
