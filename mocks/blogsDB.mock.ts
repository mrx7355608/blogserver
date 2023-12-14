import { IBlog } from "../src/types/blog.types";
import { IBlogData } from "../src/types/blogRepository.types";

const mockDatabase: IBlog[] = [];

/* eslint-disable @typescript-eslint/no-unused-vars */
const mockBlogDB: IBlogData = {
    findAll: jest.fn().mockReturnValue(Promise.resolve(mockDatabase)),
    findByTitle: function (_title: string, _skipVal: number): Promise<IBlog[]> {
        throw new Error("Function not implemented.");
    },
    findAllPublishedBlogs: function (_skipVal: number): Promise<IBlog[]> {
        throw new Error("Function not implemented.");
    },
    findBySlug: jest
        .fn()
        .mockReturnValueOnce(Promise.resolve(null))
        .mockReturnValueOnce(
            Promise.resolve({
                title: "My blog",
                blogBody: "This is a mock blog db",
                slug: "my-blog",
                tags: ["testing"],
                published_on: "Wed Dec 02 2023",
                is_published: false,
            }),
        ),
    findByID: function (_id: string): Promise<IBlog | null> {
        throw new Error("Function not implemented.");
    },
    create: function (_data: IBlog): Promise<IBlog> {
        throw new Error("Function not implemented.");
    },
    deleteByID: function (_id: string): Promise<null> {
        throw new Error("Function not implemented.");
    },
    updateByID: function (
        _id: string,
        _changes: Partial<IBlog>,
    ): Promise<IBlog> {
        throw new Error("Function not implemented.");
    },
    findByFilter: function (
        _is_published: boolean,
        _sortBy: string,
        _skipVal: number,
    ): Promise<IBlog[]> {
        throw new Error("Function not implemented.");
    },
};

export default mockBlogDB;
