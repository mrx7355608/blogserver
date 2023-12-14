import { IBlog, IBlogMongooseModel } from "./blog.types";

export interface IBlogData {
    findByTitle: (
        title: string,
        skipVal: number,
    ) => Promise<IBlogMongooseModel[]>;

    findAllPublishedBlogs: (skipVal: number) => Promise<IBlogMongooseModel[]>;
    findBySlug: (slug: string) => Promise<IBlogMongooseModel | null>;
    findAll: (skipVal: number) => Promise<IBlogMongooseModel[]>;
    findByID: (id: string) => Promise<IBlogMongooseModel | null>;
    create: (data: IBlog) => Promise<IBlogMongooseModel>;
    deleteByID: (id: string) => Promise<null>;

    findByFilter: (
        is_published: boolean,
        sortBy: string,
        skipVal: number,
    ) => Promise<IBlogMongooseModel[]>;

    updateByID: (
        id: string,
        changes: Partial<IBlog>,
    ) => Promise<IBlogMongooseModel>;
}
