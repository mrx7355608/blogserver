export interface IBlog {
    title: string;
    blogBody: string;
    tags: string[];
    published_on: string;
    is_published: boolean;
}

export interface IBlogMongooseModel extends Document, IBlog {
    createdAt: Date;
    updatedAt: Date;
}
