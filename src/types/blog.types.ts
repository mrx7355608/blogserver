export interface IBlog {
    title: string;
    blogBody: string;
    tags: string[];
    slug: string;
    is_published: boolean;
    published_on: string;
}

export interface IBlogMongooseModel extends Document, IBlog {
    createdAt: Date;
    updatedAt: Date;
}
