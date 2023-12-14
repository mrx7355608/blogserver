import { IBlog } from "./blog.types";

export interface IBlogData {
    findByTitle: (title: string, skipVal: number) => Promise<IBlog[]>;
    findAllPublishedBlogs: (skipVal: number) => Promise<IBlog[]>;
    findBySlug: (slug: string) => Promise<IBlog | null>;
    findAll: (skipVal: number) => Promise<IBlog[]>;
    findByID: (id: string) => Promise<IBlog | null>;
    create: (data: IBlog) => Promise<IBlog>;
    deleteByID: (id: string) => Promise<null>;
    updateByID: (id: string, changes: Partial<IBlog>) => Promise<IBlog>;
    findByFilter: (
        is_published: boolean,
        sortBy: string,
        skipVal: number,
    ) => Promise<IBlog[]>;
}
